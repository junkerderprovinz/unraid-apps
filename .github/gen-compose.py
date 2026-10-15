"""Writes a compose.yaml for plain Docker hosts from an app's Unraid template.

The template stays the only place an app's container settings are edited. The
compose file goes into the app's own repository, next to its README.

    python .github/gen-compose.py ../ arrowloop jdownloader     write ../<app>/compose.yaml
    python .github/gen-compose.py ../ --check arrowloop          fail if one is stale
"""

import argparse
import re
import shlex
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

FEED = Path(__file__).resolve().parent.parent

HEADER = """\
# Built from the Unraid template in junkerderprovinz/unraid-apps by
# .github/gen-compose.py. Change the template there, not this file.
#
# Folders are created next to this file on the first start. Point the ones
# that hold your own files (downloads, storage and the like) at real folders
# first, and fill in every value marked "required".
"""

# Unraid's defaults: nobody:users with a share-wide umask. A plain Linux host
# has its first user at 1000 and expects the usual umask.
GENERIC_VALUES = {"PUID": "1000", "PGID": "1000", "UMASK": "022"}

# On Unraid these apps share a database container; a compose file has to run
# on its own, so it starts the one built into the image.
APP_VALUES = {
    "securo": {"BUILTIN_POSTGRES": "true", "BUILTIN_REDIS": "true"},
    "seafile": {"BUILTIN_MARIADB": "true", "BUILTIN_REDIS": "true"},
}

# Values the template fills with an example that has to be replaced.
PLACEHOLDERS = {
    "matrix": {"SERVER_NAME", "POSTGRES_HOST"},
    "opencloud": {"OC_URL"},
}


def quote(value):
    if value == "" or re.search(r"[:#{}\[\],&*?|<>=!%@`'\"\s]", value) or value.lower() in (
        "true", "false", "yes", "no", "on", "off", "null",
    ) or re.fullmatch(r"[\d.+-]+", value):
        return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'
    return value


def config_value(config):
    value = (config.text or "").strip()
    if value:
        return value
    default = config.get("Default", "")
    return default.split("|")[0] if default else ""


def host_dir(host, target, app):
    appdata = f"/mnt/user/appdata/{app}"
    if host == appdata or host.startswith(appdata + "/"):
        return "./appdata" + host[len(appdata):].rstrip("/")
    return "./" + target.rstrip("/").rsplit("/", 1)[-1]


def extra(params):
    """Turn Unraid's Extra Parameters into compose keys, and report the rest."""
    keys, unknown = {}, []
    args = shlex.split(params or "")
    i = 0
    while i < len(args):
        arg = args[i]
        name, _, value = arg.partition("=")
        if not value and name in ("--restart", "--shm-size", "--hostname", "--user", "--add-host", "--device") and i + 1 < len(args):
            value = args[i + 1]
            i += 1
        if name == "--restart":
            keys["restart"] = value
        elif name == "--shm-size":
            keys["shm_size"] = value
        elif name == "--hostname":
            keys["hostname"] = value
        elif name == "--add-host":
            keys.setdefault("extra_hosts", []).append(value)
        elif name == "--device":
            keys.setdefault("devices", []).append(value)
        elif name != "--user":
            unknown.append(arg)
        i += 1
    return keys, unknown


def compose(app):
    root = ET.parse(FEED / app / f"{app}.xml").getroot()
    keys, unknown = extra(root.findtext("ExtraParams"))
    lines = [HEADER, "services:", f"  {app}:", f"    image: {(root.findtext('Repository') or '').strip()}",
             f"    container_name: {app}", f"    restart: {keys.pop('restart', 'unless-stopped')}"]
    if (root.findtext("Network") or "bridge").strip() == "host":
        lines.append("    network_mode: host")
    if (root.findtext("Privileged") or "").strip() == "true":
        lines.append("    privileged: true")
    for key in ("hostname", "shm_size"):
        if key in keys:
            lines.append(f"    {key}: {keys[key]}")

    ports, volumes, env, devices = [], [], [], list(keys.get("devices", []))
    for config in root.iter("Config"):
        kind, target = config.get("Type"), config.get("Target", "")
        required = config.get("Required") == "true"
        value = config_value(config)
        if kind == "Port" and value:
            protocol = config.get("Mode") or "tcp"
            ports.append(f"{value}:{target}" + ("/udp" if protocol == "udp" else ""))
        elif kind == "Path" and (value or required):
            mode = config.get("Mode") or "rw"
            suffix = ":ro" if mode.split(",")[0] == "ro" else ""
            volumes.append(f"{host_dir(value, target, app)}:{target}{suffix}")
        elif kind == "Device" and value:
            devices.append(value)
        elif kind == "Variable":
            value = APP_VALUES.get(app, {}).get(target, GENERIC_VALUES.get(target, value))
            if value and target in PLACEHOLDERS.get(app, ()):
                env.append(f"      {target}: {quote(value)}  # required")
            elif value:
                env.append(f"      {target}: {quote(value)}")
            elif required:
                env.append(f'      {target}: ""  # required')

    if ports:
        lines += ["    ports:"] + [f'      - "{p}"' for p in ports]
    if volumes:
        lines += ["    volumes:"] + [f"      - {quote(v)}" for v in volumes]
    if env:
        lines += ["    environment:"] + env
    if devices:
        lines += ["    devices:"] + [f"      - {quote(d)}" for d in devices]
    if keys.get("extra_hosts"):
        lines += ["    extra_hosts:"] + [f'      - "{h}"' for h in keys["extra_hosts"]]
    post = (root.findtext("PostArgs") or "").strip()
    if post:
        lines.append(f"    command: {quote(post)}")
    return "\n".join(lines) + "\n", unknown


def main():
    parser = argparse.ArgumentParser(description="Write compose.yaml files from the Unraid templates.")
    parser.add_argument("repos", type=Path, help="folder that holds the app repositories")
    parser.add_argument("apps", nargs="+")
    parser.add_argument("--check", action="store_true", help="report stale files instead of writing")
    args = parser.parse_args()

    stale = []
    for app in args.apps:
        content, unknown = compose(app)
        for arg in unknown:
            print(f"{app}: extra parameter not carried over: {arg}", file=sys.stderr)
        target = args.repos / app / "compose.yaml"
        if not target.exists() or target.read_text(encoding="utf-8") != content:
            stale.append(app)
            if not args.check:
                target.write_text(content, encoding="utf-8", newline="\n")
                print(f"wrote {target}")
    if args.check and stale:
        print("out of date: " + ", ".join(stale), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
