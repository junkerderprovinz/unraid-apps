<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.png">
    <img src=".github/assets/banner.png" alt="Unraid Docker Templates — one feed to rule them all" width="100%">
  </picture>
</p>

<p align="center">
  <a href="https://github.com/junkerderprovinz/unraid-apps/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/unraid-apps/validate.yml?branch=main&label=Validate&style=for-the-badge&logo=githubactions&logoColor=white" alt="Validate" height="36"></a>&nbsp;
  <a href="#apps"><img src="https://img.shields.io/badge/Templates-15-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Templates" height="36"></a>&nbsp;
  <a href="https://github.com/junkerderprovinz/unraid-apps/commits/main"><img src="https://img.shields.io/github/last-commit/junkerderprovinz/unraid-apps?branch=main&style=for-the-badge&logo=git&logoColor=white&label=Updated" alt="Last commit" height="36"></a>&nbsp;
  <a href="https://unraid.net"><img src="https://img.shields.io/badge/Unraid-Templates-f15a2c?style=for-the-badge&logo=unraid&logoColor=white" alt="Unraid" height="36"></a>&nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" height="36"></a>
</p>

<p align="center">
Unraid <b>Community Applications</b> templates for all of junkerderprovinz's containers and plugins, grouped like the profile: <b>Apps</b> (my own software), <b>Images</b> (my own image builds of third-party apps), <b>Wrappers</b> (thin templates over an upstream image) and <b>Plugins</b>. One repository, one CA feed; each app's image and full source live in its own per-app repository.
</p>


## Apps

*My own software, built and published by junkerderprovinz — full docs live in each app's own repository.*

<img src=".github/readme-icons/bombvault.png" width="84" align="left" alt="BombVault">
<a href="https://github.com/junkerderprovinz/bombvault#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**BombVault**<br>
Backup and full disaster recovery for Docker containers, VMs, the flash USB and any folders you point it at, with
one-click backup, restore from another BombVault server and automatic re-install, all powered by restic.

<br clear="all">

<img src=".github/readme-icons/featherdrop.png" width="84" align="left" alt="featherdrop">
<a href="https://github.com/junkerderprovinz/featherdrop#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**featherdrop**<br>
Your own private WeTransfer: feather-light, login-free, end-to-end encrypted self-hosted file sharing where you
drop a file, set an expiry and share a link that quietly deletes itself once it is no longer needed.

<br clear="all">


## Images

*My own container images that package a third-party app on a ready-to-use web desktop — full docs in each app's own repository.*

<img src=".github/readme-icons/jdownloader.png" width="84" align="left" alt="JDownloader">
<a href="https://github.com/junkerderprovinz/jdownloader#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**JDownloader**<br>
JDownloader 2 with a complete, sleek dark UI out of the box, running on a fast Selkies web desktop straight in
your browser, so there is no VNC client to install and nothing to set up locally (amd64 + arm64).

<br clear="all">

<img src=".github/readme-icons/krusader.png" width="84" align="left" alt="Krusader">
<a href="https://github.com/junkerderprovinz/krusader#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**Krusader**<br>
The twin-pane KDE file manager with a native dark theme on a fast Selkies web desktop, with Kate, krename and
RAR support built in, all in your browser with no VNC client and nothing to install locally.

<br clear="all">

<img src=".github/readme-icons/prusaslicer.png" width="84" align="left" alt="PrusaSlicer">
<a href="https://github.com/junkerderprovinz/prusaslicer#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**PrusaSlicer**<br>
The PrusaSlicer 3D-printing slicer running in your browser on a fast Selkies web desktop, so you can slice,
preview and export G-code with no VNC client and no local install at all (amd64 + arm64).

<br clear="all">

<img src=".github/readme-icons/stellarium.png" width="84" align="left" alt="Stellarium">
<a href="https://github.com/junkerderprovinz/stellarium#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**Stellarium**<br>
The open-source Stellarium planetarium running in your browser on a fast Selkies web desktop, where you can pan
the sky, zoom into a nebula and scrub through time, with no VNC client and no local install (amd64 + arm64).

<br clear="all">


## Wrappers

*Thin templates over a third-party upstream image (no custom build) — full docs in each app's folder below.*

<img src=".github/readme-icons/euro-office.png" width="84" align="left" alt="Euro Office">
<a href="euro-office/README.md"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**Euro Office**<br>
Sovereign European document server (an OnlyOffice-compatible fork) for browser editing of Office and
OpenDocument files, which wires into OpenCloud over WOPI and sits happily behind a reverse proxy.

<br clear="all">

<img src=".github/readme-icons/matrix.png" width="84" align="left" alt="Matrix">
<a href="https://github.com/junkerderprovinz/matrix#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**Matrix**<br>
An all-in-one Matrix homeserver in a single container: Synapse, coturn, Element Web and Synapse-Admin together,
with optional TURN over TLS, so federation and voice/video calls work out of the box.

<br clear="all">

<img src=".github/readme-icons/n8n.png" width="84" align="left" alt="n8n">
<a href="n8n/README.md"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**n8n**<br>
Workflow automation that connects 400+ apps and APIs, running on PostgreSQL by default, with every option
exposed directly in the Unraid template form so there is no compose file to edit by hand.

<br clear="all">

<img src=".github/readme-icons/opencloud.png" width="84" align="left" alt="OpenCloud">
<a href="https://github.com/junkerderprovinz/opencloud#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**OpenCloud**<br>
One-click OpenCloud file sync &amp; share: a thin wrapper over the official image that auto-runs init, heals
appdata permissions and honours PUID/PGID, with production and rolling channels (amd64 + arm64).

<br clear="all">

<img src=".github/readme-icons/openhands.png" width="84" align="left" alt="OpenHands">
<a href="openhands/README.md"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**OpenHands**<br>
Open-source AI software-development agent, pre-wired for a local Ollama model so it can read, write and run
code on your own box, with no cloud account and no API keys required to get started.

<br clear="all">

<img src=".github/readme-icons/standardnotes-server.png" width="84" align="left" alt="Standard Notes Server">
<a href="standardnotes-server/README.md"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**Standard Notes Server**<br>
Self-hosted Standard Notes sync server (external MariaDB + Redis) for end-to-end encrypted notes, including an
optional LocalStack template for S3-compatible file storage of your attachments.

<br clear="all">

<img src=".github/readme-icons/standardnotes-webui.png" width="84" align="left" alt="Standard Notes Web UI">
<a href="standardnotes-webui/README.md"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**Standard Notes Web UI**<br>
The official Standard Notes web client, self-hosted next to your own sync server, so your end-to-end encrypted
notes stay in your browser with no third-party servers ever involved.

<br clear="all">


## Plugins

*Unraid **plugins** (not containers) — listed on CA, installed from the Plugins tab via a `.plg` URL.*

<img src=".github/readme-icons/bombvaultwidget.png" width="84" align="left" alt="BombVault Widget">
<a href="https://github.com/junkerderprovinz/bombvault-widget#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**BombVault Widget**<br>
BombVault's activity log as a real, native tile on the Unraid dashboard, showing every backup, restore, verify,
prune, off-site run and drill live plus the next scheduled run. Read-only; requires BombVault 6.9.0+.

<br clear="all">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/readme-icons/shiplog-dark.png">
  <img src=".github/readme-icons/shiplog.png" width="84" align="left" alt="ShipLog">
</picture>
<a href="https://github.com/junkerderprovinz/shiplog#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**ShipLog**<br>
An update advisor in Unraid's Docker tab: a per-container bubble showing what changes and how risky it is before
you update, with optional SemVer-gated auto-update plus Ollama summaries and Matrix alerts.

<br clear="all">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/readme-icons/smokesignal-dark.png">
  <img src=".github/readme-icons/smokesignal.png" width="84" align="left" alt="SmokeSignal">
</picture>
<a href="https://github.com/junkerderprovinz/smokesignal#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" align="right" alt="Repository &amp; ReadMe"></a>

**SmokeSignal**<br>
A pre-reboot health check that returns one clear GO / CAUTION / NO-GO verdict before you reboot, so you never
reboot into a known landmine. Advisory only: it never changes anything on your server by itself.

<br clear="all">


## Install

On Unraid: open **Apps** (Community Applications) and search for the app name — these templates are published from this repository.

To add a single template by hand, paste its raw `*.xml` URL into **Add Container → Template**, e.g.
`https://raw.githubusercontent.com/junkerderprovinz/unraid-apps/main/openhands/openhands.xml`

Apps and Images link to their dedicated repository's README; Wrappers keep their README in their folder here.

**Plugins** (BombVault Widget, ShipLog, SmokeSignal) are published from this repository too — CA lists them the same way as containers (a template with `<Plugin>True</Plugin>` + `<PluginURL>`), so search for them in **Apps**. You can also install a plugin directly from **Plugins → Install Plugin** with its raw `.plg` URL, e.g.
`https://raw.githubusercontent.com/junkerderprovinz/smokesignal/main/plugin/smokesignal.plg`


## Support

Everything here is free and open-source. The own-image apps are self-hosted and private by design — no accounts, no telemetry, nothing leaves your server. None of it pays my server bill or the hours that go into it, so if one of these saves you time, money, or a headache, you can [buy me a coffee](https://buymeacoffee.com/junkerderprovinz). Thanks for stopping by.
