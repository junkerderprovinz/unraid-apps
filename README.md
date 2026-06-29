<p align="center">
  <img src=".github/assets/banner.svg" alt="Unraid Docker Templates" width="100%">
</p>

<p align="center">
  <a href="https://github.com/junkerderprovinz/unraid-apps/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/unraid-apps/validate.yml?branch=main&label=Validate&style=for-the-badge&logo=githubactions&logoColor=white" alt="Validate" height="36"></a>&nbsp;
  <a href="#templates"><img src="https://img.shields.io/badge/Templates-11-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Templates" height="36"></a>&nbsp;
  <a href="https://github.com/junkerderprovinz/unraid-apps/commits/main"><img src="https://img.shields.io/github/last-commit/junkerderprovinz/unraid-apps?branch=main&style=for-the-badge&logo=git&logoColor=white&label=Updated" alt="Last commit" height="36"></a>&nbsp;
  <a href="https://unraid.net"><img src="https://img.shields.io/badge/Unraid-Templates-f15a2c?style=for-the-badge&logo=unraid&logoColor=white" alt="Unraid" height="36"></a>&nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" height="36"></a>
</p>

<p align="center">
Unraid <b>Community Applications</b> templates for all of junkerderprovinz's containers — both <b>own-image</b> apps (Krusader, JDownloader, Matrix, featherdrop, BombVault) and <b>upstream-image</b> wrappers (OpenHands, Standard Notes, n8n), plus <b>plugins</b> (ShipLog, SmokeSignal). One repository, one CA feed; each app's image and full source live in its own per-app repository.
</p>


## Templates

### Own-image apps

*Built and published by junkerderprovinz — full docs live in each app's own repository.*

<img src=".github/readme-icons/krusader.png" width="84" align="left" alt="Krusader">
<div align="right"><a href="https://github.com/junkerderprovinz/krusader#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### Krusader

Twin-pane KDE file manager with a native dark theme, on a fast KasmVNC web desktop (Kate, krename, RAR).

<br clear="all">

<img src=".github/readme-icons/jdownloader.png" width="84" align="left" alt="JDownloader">
<div align="right"><a href="https://github.com/junkerderprovinz/jdownloader#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### JDownloader

JDownloader 2 with a complete, sleek dark UI out of the box, on a KasmVNC web desktop.

<br clear="all">

<img src=".github/readme-icons/matrix.png" width="84" align="left" alt="Matrix">
<div align="right"><a href="https://github.com/junkerderprovinz/matrix#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### Matrix

All-in-one Matrix homeserver: Synapse + coturn + Element Web + Synapse-Admin in one container.

<br clear="all">

<img src=".github/readme-icons/featherdrop.png" width="84" align="left" alt="featherdrop">
<div align="right"><a href="https://github.com/junkerderprovinz/featherdrop#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### featherdrop

Your own private WeTransfer — feather-light, login-free, end-to-end encrypted self-hosted file sharing. Drop a file, set an expiry, share a link.

<br clear="all">

<img src=".github/readme-icons/bombvault.png" width="84" align="left" alt="BombVault">
<div align="right"><a href="https://github.com/junkerderprovinz/bombvault#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### BombVault

Backup & full disaster recovery for Docker containers, KVM/libvirt VMs and the Unraid flash — one-click backup and automatic re-install, powered by restic.

<br clear="all">

### Upstream-image wrappers

*Templates for third-party images (no custom build) — full docs in each app's folder below.*

<img src=".github/readme-icons/openhands.png" width="84" align="left" alt="OpenHands">
<div align="right"><a href="openhands/README.md"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### OpenHands

Open-source AI software-development agent, pre-wired for a local Ollama model.

<br clear="all">

<img src=".github/readme-icons/standardnotes-server.png" width="84" align="left" alt="Standard Notes Server">
<div align="right"><a href="standardnotes-server/README.md"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### Standard Notes Server

Self-hosted Standard Notes sync server (external MariaDB + Redis). Includes an optional **LocalStack** template for S3-compatible file storage.

<br clear="all">

<img src=".github/readme-icons/standardnotes-webui.png" width="84" align="left" alt="Standard Notes Web UI">
<div align="right"><a href="standardnotes-webui/README.md"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### Standard Notes Web UI

The official Standard Notes web client.

<br clear="all">

<img src=".github/readme-icons/n8n.png" width="84" align="left" alt="n8n">
<div align="right"><a href="n8n/README.md"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### n8n

Workflow automation — connect 400+ apps and APIs. PostgreSQL by default, every option exposed in the template form.

<br clear="all">


## Plugins

*Unraid **plugins** (not containers) — listed on CA, installed from the Plugins tab via a `.plg` URL.*

<img src=".github/readme-icons/shiplog.png" width="84" align="left" alt="ShipLog">
<div align="right"><a href="https://github.com/junkerderprovinz/shiplog#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### ShipLog

Read-only update advisor in Unraid's native Docker tab — a per-container changelog bubble: what changes between your running image and the newest, and how risky, before you press update. Remembers the running version (real "1.7 → 1.8"); optional Ollama summaries + Matrix alerts.

<br clear="all">

<img src=".github/readme-icons/smokesignal.png" width="84" align="left" alt="SmokeSignal">
<div align="right"><a href="https://github.com/junkerderprovinz/smokesignal#readme"><img src="https://img.shields.io/badge/Repository%20%26%20ReadMe-393939?style=for-the-badge&logo=github&logoColor=white" alt="Repository &amp; ReadMe"></a></div>

#### SmokeSignal

Pre-reboot health check — a single **GO / CAUTION / NO-GO** verdict before you reboot, so you never reboot into a known landmine. Advisory only.

<br clear="all">


## Install

On Unraid: open **Apps** (Community Applications) and search for the app name — these templates are published from this repository.

To add a single template by hand, paste its raw `*.xml` URL into **Add Container → Template**, e.g.
`https://raw.githubusercontent.com/junkerderprovinz/unraid-apps/main/openhands/openhands.xml`

Own-image apps link to their dedicated repository's README; wrapper apps keep their README in their folder here.

**Plugins** are not part of the CA template feed — install them from **Plugins → Install Plugin** using the plugin's raw `.plg` URL, e.g.
`https://raw.githubusercontent.com/junkerderprovinz/smokesignal/main/plugin/smokesignal.plg`
