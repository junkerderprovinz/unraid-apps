<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.png">
  <img src="assets/banner.png" alt="Silo" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/junkerderprovinz/unraid-apps/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/unraid-apps/validate.yml?branch=main&label=Validate&style=for-the-badge&logo=githubactions&logoColor=white" alt="Validate" height="36"></a>&nbsp;
  <a href="https://github.com/pgsty/silo"><img src="https://img.shields.io/badge/Upstream-Silo-1d588c?style=for-the-badge&logo=go&logoColor=white" alt="Upstream Silo" height="36"></a>&nbsp;
  <a href="https://hub.docker.com/r/pgsty/silo"><img src="https://img.shields.io/badge/Image-pgsty%2Fsilo-1d99f3?style=for-the-badge&logo=docker&logoColor=white" alt="Image" height="36"></a>&nbsp;
  <a href="https://unraid.net"><img src="https://img.shields.io/badge/Unraid-Template-f15a2c?style=for-the-badge&logo=unraid&logoColor=white" alt="Unraid" height="36"></a>&nbsp;
  <a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" height="36"></a>
</p>

<p align="center">
An Unraid Community Applications template for <b>PGSTY Silo</b>, the maintained fork of the
open-source MinIO server, wrapping the <b>official</b> <code>pgsty/silo</code> image with the
settings it needs to start as a server on Unraid.
</p>

<br>

## Table of Contents

1. [Why this template exists](#1-why-this-template-exists)
2. [Quick start on Unraid](#2-quick-start-on-unraid)
3. [Connecting a client](#3-connecting-a-client)
4. [Coming from MinIO](#4-coming-from-minio)
5. [Configuration](#5-configuration)
6. [How it compares to the other object stores here](#6-how-it-compares-to-the-other-object-stores-here)
7. [How AI is used here](#7-how-ai-is-used-here)
8. [Support this project](#8-support-this-project)

<br>

## 1. Why this template exists

MinIO stopped shipping its community edition: the repository is in maintenance mode and there
are no more images or binaries, only source. [Pigsty](https://pigsty.io) took the last
open-source line and keeps it alive as Silo, with security fixes, multi-arch images and the
full web console that MinIO had cut out of its community build. The S3 API, the `MINIO_*`
settings and the on-disk format stay the same; only the product name changed.

Started as it comes, the image does nothing useful on Unraid. Its default command is the bare
binary, which prints its help text and exits. It has to be told to serve a folder, and without
a fixed console address it puts the web console on a random port. This template starts it as

```
server /data --console-address ":9001"
```

It also runs the container as `99:100`. The image runs as root by default, which works, but
every bucket and object it writes on your share then belongs to root. As `99:100` the files
belong to `nobody:users` like everything else on the array.

The third thing is the credentials. Left empty, Silo starts with the account
`minioadmin:minioadmin`, the one every MinIO tutorial prints, and only warns about it in the
log. Here the root user and password are required fields.

<br>

## 2. Quick start on Unraid

Install the template from Community Applications, set a **Root User** and a **Root Password**
of at least 8 characters, and start it. A shorter password stops the container with
`MINIO_ROOT_PASSWORD length at least 8 characters`.

A working start ends with these lines in the log:

```
API: http://<container-ip>:9000  http://127.0.0.1:9000
WebUI: http://<container-ip>:9001 http://127.0.0.1:9001
```

The WebUI button opens the console on port 9001. Log in with the root user and password.

<br>

## 3. Connecting a client

Point any S3 client at port 9000:

```
Endpoint:   http://<server>:9000
Access key: your Root User
Secret key: your Root Password
Region:     us-east-1        (any value works)
```

With rclone:

```ini
[silo]
type = s3
provider = Minio
endpoint = http://<server>:9000
access_key_id = <your root user>
secret_access_key = <your root password>
```

```bash
rclone mkdir silo:backups
rclone copy ./file.txt silo:backups/
```

The image ships the MinIO client as `mcli`, so you can also work from the container console:

```bash
mcli alias set local http://127.0.0.1:9000 <root user> <root password>
mcli mb local/backups
```

For anything beyond your own tools, create a separate user with its own keys in the console
instead of handing out the root account.

<br>

## 4. Coming from MinIO

Silo reads the data folder of a MinIO server as it is, `.minio.sys` included. Point **Data**
at the old folder, keep the old root user and password, and the buckets are there.

One thing to do first: a MinIO container that ran as root left every file owned by root, and
Silo running as `99:100` cannot write there. It stops at startup with

```
FATAL Unable to initialize backend: file access denied
```

Fix the ownership once, from the Unraid terminal, with the old container stopped:

```bash
chown -R nobody:users /mnt/user/appdata/minio/data
```

(use your own path). I tried this with data written by `pgsty/minio`, the same project under
its old name, and the bucket and a test file came through unchanged. For a jump from an older
upstream MinIO release, read the
[migration guide](https://silo.pgsty.com/compatibility/migration/) and keep a copy until you
have checked your data.

<br>

## 5. Configuration

| Setting | Default | What it does |
| --- | --- | --- |
| **Data** | `/mnt/user/appdata/silo/data` | Where the objects live. Must be writable by `99:100`. |
| **Root User** (`MINIO_ROOT_USER`) | none | The admin account and root access key. Required, at least 3 characters. |
| **Root Password** (`MINIO_ROOT_PASSWORD`) | none | The admin password and root secret key. Required, at least 8 characters. |
| **S3 API Port** | `9000` | The S3 endpoint. |
| **Console Port** | `9001` | The web console. |

The template sets `--user 99:100` as an extra parameter and `server /data --console-address ":9001"`
as post arguments. Leave both in place.

Every other `MINIO_*` variable from the MinIO documentation works unchanged, for example
`MINIO_SERVER_URL` and `MINIO_BROWSER_REDIRECT_URL` behind a reverse proxy. Add them as
variables in the template if you need them. The full list is in the
[Silo documentation](https://silo.pgsty.com/docs/).

<br>

## 6. How it compares to the other object stores here

There are six now, and they solve different problems:

**Silo** is MinIO, still maintained. If you ran MinIO and want to keep everything as it was,
data folder and client settings included, this is the one.

**[RustFS](../rustfs/README.md)** is a newer S3 object store in Rust, close to MinIO in
spirit, but every version so far is a release candidate.

**[Garage](https://github.com/junkerderprovinz/garage)** is a plain object store with a web
admin panel in the same container, built to replicate across several machines.

**[SeaweedFS](../seaweedfs/README.md)** is built for many small files and has a long track
record.

**[VersityGW](../versitygw/README.md)** is not a store at all, it is a gateway: it puts an
S3 API in front of a share you already have, and every file stays readable over SMB and NFS
at the same time.

**[JuiceFS](https://github.com/junkerderprovinz/juicefs)** splits files into chunks across
a database and an object store, in exchange for a file system that several machines can share.

<br>

## 7. How AI is used here

One knight builds this, and AI is one of the tools I work with, the same way I work with an editor or a compiler. It helps me write code and documentation and it checks my work, and that saves me a good many evenings. It does not make the decisions, though. I read and understand everything before it ships, and if something here breaks, that is on me and not on the tool.

You do not have to take my word for it. The code is open and every release note is written by hand. The issue tracker shows how problems actually get handled, including the ones I got wrong the first time. If you find something that is not right, open an issue and I will look at it.

<br>

## 8. Support this project

Questions? Check the [support thread](https://forums.unraid.net/topic/198811-support-junkerderprovinz-unraid-apps/). Bugs, ideas or feature requests? Please [open a GitHub issue](https://github.com/junkerderprovinz/unraid-apps/issues). Problems with Silo itself belong upstream at [pgsty/silo](https://github.com/pgsty/silo/issues).

A one-knight job: I build it, keep it running, work through the issues and add what people ask for, until nothing is missing. It is free, with no accounts, no telemetry, no ads and no paid tier. No asterisk anywhere. Nothing readable ever leaves your own walls. Forged on evenings and weekends, with heart and stubbornness.

If it has earned a place on your server or computer, toss a coin to your knight: it helps cover the costs and keeps the project alive. It also makes this knight's heart beat a little faster. Three ways below, whichever suits you.

<p align="center">
  <a href="https://buymeacoffee.com/junkerderprovinz"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(0,0,841.9,245.3))" alt="Buy me a coffee" width="160" height="46.62"></a>
  &nbsp;
  <a href="https://www.paypal.com/donate/?hosted_button_id=76FVV52TKXTUS"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(841.9,0,841.9,245.3))" alt="PayPal" width="160" height="46.62"></a>
  &nbsp;
  <a href="https://junkerderprovinz.github.io/junkerderprovinz/"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(1683.8,0,841.9,245.3))" alt="Donate with crypto" width="160" height="46.62"></a>
</p>

<p align="center">
Silo itself is <a href="https://github.com/pgsty/silo">PGSTY's</a> work on top of MinIO,
AGPL-3.0. What is maintained here is the Unraid template and this page.
</p>
