<p align="center">
  <img src=".github/assets/banner.svg" alt="Unraid Docker Templates" width="100%">
</p>

<p align="center">
  <a href="https://github.com/junkerderprovinz/unraid-docker-templates/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/unraid-docker-templates/validate.yml?branch=main&label=Validate&style=for-the-badge&logo=githubactions&logoColor=white" alt="Validate" height="36"></a>&nbsp;
  <a href="#templates"><img src="https://img.shields.io/badge/Templates-9-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Templates" height="36"></a>&nbsp;
  <a href="https://github.com/junkerderprovinz/unraid-docker-templates/commits/main"><img src="https://img.shields.io/github/last-commit/junkerderprovinz/unraid-docker-templates?branch=main&style=for-the-badge&logo=git&logoColor=white&label=Updated" alt="Last commit" height="36"></a>&nbsp;
  <a href="https://unraid.net"><img src="https://img.shields.io/badge/Unraid-Templates-f15a2c?style=for-the-badge&logo=unraid&logoColor=white" alt="Unraid" height="36"></a>&nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" height="36"></a>
</p>

<p align="center">
Unraid <b>Community Applications</b> templates for all of junkerderprovinz's containers — both <b>own-image</b> apps (Krusader, JDownloader, Matrix, featherdrop) and <b>upstream-image</b> wrappers (OpenHands, Standard Notes, n8n). One repository, one CA feed; each app's image and full source live in its own per-app repository.
</p>

## Templates

### Own-image apps

*Built and published by junkerderprovinz — each has its own image repository.*

<img src="krusader/icon.png" width="84" align="left" alt="Krusader">

#### Krusader

Twin-pane KDE file manager with a native dark theme, on a fast KasmVNC web desktop (Kate, krename, RAR).

**[→ Krusader README](krusader/README.md)**

<br clear="left">

<img src="jdownloader/icon.png" width="84" align="left" alt="JDownloader">

#### JDownloader

JDownloader 2 with a complete, sleek dark UI out of the box, on a KasmVNC web desktop.

**[→ JDownloader README](jdownloader/README.md)**

<br clear="left">

<img src="matrix/icon.png" width="84" align="left" alt="Matrix">

#### Matrix

All-in-one Matrix homeserver: Synapse + coturn + Element Web + Synapse-Admin in one container.

**[→ Matrix README](matrix/README.md)**

<br clear="left">

<img src="featherdrop/icon.png" width="84" align="left" alt="featherdrop">

#### featherdrop

A clean, login-free self-hosted file sharer — drop a file, set an expiry, share a link.

**[→ featherdrop README](featherdrop/README.md)**

<br clear="left">

### Upstream-image wrappers

*Templates for third-party images (no custom build).*

<img src="openhands/icon.png" width="84" align="left" alt="OpenHands">

#### OpenHands

Open-source AI software-development agent, pre-wired for a local Ollama model.

**[→ OpenHands README](openhands/README.md)**

<br clear="left">

<img src="standardnotes-server/icon.png" width="84" align="left" alt="Standard Notes Server">

#### Standard Notes Server

Self-hosted Standard Notes sync server (external MariaDB + Redis). Includes an optional **LocalStack** template for S3-compatible file storage.

**[→ Standard Notes Server README](standardnotes-server/README.md)**

<br clear="left">

<img src="standardnotes-webui/icon.png" width="84" align="left" alt="Standard Notes Web UI">

#### Standard Notes Web UI

The official Standard Notes web client.

**[→ Standard Notes Web UI README](standardnotes-webui/README.md)**

<br clear="left">

<img src="n8n/icon.png" width="84" align="left" alt="n8n">

#### n8n

Workflow automation — connect 400+ apps and APIs. PostgreSQL by default, every option exposed in the template form.

**[→ n8n README](n8n/README.md)**

<br clear="left">

> Each app's `icon.png` above is the icon shown in Community Applications.

## Install

On Unraid: open **Apps** (Community Applications) and search for the app name — these templates are published from this repository.

To add a single template by hand, paste its raw `*.xml` URL into **Add Container → Template**, e.g.
`https://raw.githubusercontent.com/junkerderprovinz/unraid-docker-templates/main/openhands/openhands.xml`

Each app folder has its own README with full details and a link to its Unraid support thread.

## License

[MIT](LICENSE)
