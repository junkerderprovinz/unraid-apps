<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.png">
  <img src="assets/banner.png" alt="Euro Office" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/junkerderprovinz/unraid-apps/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/unraid-apps/validate.yml?branch=main&label=Validate&style=for-the-badge&logo=githubactions&logoColor=white" alt="Validate" height="36"></a>&nbsp;
  <a href="https://github.com/euro-office/documentserver"><img src="https://img.shields.io/badge/Upstream-Euro%20Office-0a2f6e?style=for-the-badge&logo=github&logoColor=white" alt="Upstream" height="36"></a>&nbsp;
  <a href="https://github.com/euro-office/documentserver/pkgs/container/documentserver"><img src="https://img.shields.io/badge/Image-ghcr.io%2Feuro--office-1d99f3?style=for-the-badge&logo=docker&logoColor=white" alt="Image" height="36"></a>&nbsp;
  <a href="https://github.com/junkerderprovinz/opencloud"><img src="https://img.shields.io/badge/Pairs%20with-OpenCloud-f2b705?style=for-the-badge&logo=owncloud&logoColor=black" alt="OpenCloud" height="36"></a>&nbsp;
  <a href="https://unraid.net"><img src="https://img.shields.io/badge/Unraid-Template-f15a2c?style=for-the-badge&logo=unraid&logoColor=white" alt="Unraid" height="36"></a>&nbsp;
  <a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" height="36"></a>
</p>

<p align="center">
A plug-and-play Unraid Community Applications template for <b>Euro Office</b>,
the sovereign European document server. It edits Word, Excel and PowerPoint
files (and their OpenDocument equivalents) in the browser and plugs straight
into <a href="https://github.com/junkerderprovinz/opencloud">OpenCloud</a> over
WOPI. Install from the Unraid <b>Apps</b> tab, set one shared secret, done.
</p>

<br>

<p align="center">
  <a href="https://buymeacoffee.com/junkerderprovinz">
    <img src="assets/button-buy-me-a-coffee.svg" alt="Buy me a coffee" width="220">
  </a>
</p>

<br>

## Table of Contents

1. [What is this?](#1-what-is-this)
2. [Features](#2-features)
3. [Quick Start on Unraid](#3-quick-start-on-unraid)
4. [Wiring it to OpenCloud](#4-wiring-it-to-opencloud)
5. [Configuration](#5-configuration)
6. [Updating](#6-updating)
7. [Troubleshooting](#7-troubleshooting)
8. [Contributing / License](#8-contributing--license)
9. [Support this project](#9-support-this-project)

<br>

## 1. What is this?

[Euro Office](https://github.com/euro-office/documentserver) is a sovereign,
European document server for browser-based editing of text documents,
spreadsheets and presentations. It is a maintained fork of the OnlyOffice
Document Server, so it speaks the same OnlyOffice and **WOPI** APIs and drops
straight into OpenCloud, Nextcloud or ownCloud.

This repository is **not a fork of Euro Office**. It only contains the Unraid
Community Applications metadata, an XML template, an icon and this README, that
tells Unraid how to deploy the upstream
[`ghcr.io/euro-office/documentserver`](https://github.com/euro-office/documentserver/pkgs/container/documentserver)
image in a sensible default configuration.

**This is not a standalone app.** It is the editor back-end for a file server.
On its own it only serves an internal welcome page. You point your cloud (the
[OpenCloud](https://github.com/junkerderprovinz/opencloud) container) at it, and
then edit files that live in that cloud.

<br>

## 2. Features

- ✅ Edits **.docx / .xlsx / .pptx** and **.odt / .ods / .odp** right in the browser
- ✅ **WOPI** protocol pre-enabled (`WOPI_ENABLED=true`), so OpenCloud can open and save documents
- ✅ One shared **JWT secret** signs every request between cloud and editor
- ✅ Sensible Unraid defaults: HTTP on a mapped port, optional persistence volumes, `--restart=unless-stopped`
- ✅ Reverse-proxy friendly, terminate TLS in front and hand the editor plain HTTP
- ✅ Bundles its own database and converter, no external services to run
- ✅ MIT-licensed wrapper, fork and adapt freely

<br>

## 3. Quick Start on Unraid

This is a plug-and-play Community Applications template. No SSH, no config-file editing.

### Step 1 — Install from Apps

In the Unraid Web UI:

1. Go to the **Apps** tab.
2. Search for **`Euro Office`**.
3. Click **Install**.

### Step 2 — Set the JWT secret

The template's one required field is the **JWT secret**. Pick a long random
string and remember it, you will paste the *same* value into OpenCloud in the
next section. Leave **Enable WOPI** on `true`.

Hit **Apply**. First start pulls the image and warms up the bundled database
and converter, this takes a minute or two on the very first boot.

### Step 3 — Wait for the server to be ready

Open a shell and confirm the WOPI discovery endpoint answers with XML:

```bash
curl -s http://<unraid-ip>:9900/hosting/discovery | head -c 200
```

Once that returns an `<wopi-discovery>` document, the editor is ready. Then wire
it to OpenCloud (next section).

### Manual install (pre-CA-listing)

Until this repo is accepted into the Community Applications index, you can load
the template by hand. Run this once on the Unraid console or via SSH:

```bash
mkdir -p /boot/config/plugins/dockerMan/templates-user && \
curl -fsSL -o /boot/config/plugins/dockerMan/templates-user/my-Euro-Office.xml \
  https://raw.githubusercontent.com/junkerderprovinz/unraid-apps/main/euro-office/euro-office.xml
```

Then in the Unraid Web UI: **Docker** → **Add Container** → in the **Template**
dropdown, pick **Euro-Office** under *User templates*.

### Plain Docker (no Unraid)

```bash
docker run -d \
  --name euro-office \
  --restart unless-stopped \
  -p 9900:80 \
  -e WOPI_ENABLED=true \
  -e JWT_ENABLED=true \
  -e JWT_SECRET=change-me-to-a-long-random-string \
  ghcr.io/euro-office/documentserver:latest
```

<br>

## 4. Wiring it to OpenCloud

Euro Office is the editor; [OpenCloud](https://github.com/junkerderprovinz/opencloud)
is the cloud that stores your files. Connect them in the OpenCloud template:

| OpenCloud field | Value |
|---|---|
| **Web office suite** | `euro-office` |
| **Office document server URL** | `http://<euro-office-ip>:9900` (or your reverse-proxy https URL) |
| **Office WOPI secret** | the **same** string you set as the **JWT secret** here |

The two secrets **must be identical**, that is what lets the cloud and the
editor trust each other. After applying both containers, open a document in
OpenCloud, it now opens in Euro Office. OpenCloud uses Euro Office for Microsoft
formats by default and Collabora for OpenDocument, but Euro Office edits both.

> [!TIP]
> Behind the internet, put Euro Office behind a reverse proxy that terminates
> TLS (e.g. `https://office.example.com`) and use that https URL in OpenCloud.
> If OpenCloud itself uses a self-signed certificate, set **Allow self-signed
> upstream** = `true` on this container so the editor can fetch documents from it.

<br>

## 5. Configuration

| Variable | Default | Description |
|---|---|---|
| `JWT_SECRET` | *(required)* | Shared secret that signs cloud ↔ editor traffic. Must equal OpenCloud's *Office WOPI secret*. |
| `WOPI_ENABLED` | `true` | Enables the WOPI protocol OpenCloud uses. Keep `true`. |
| `JWT_ENABLED` | `true` | Require the signed JWT on every request. Keep `true`; only disable for isolated LAN testing. |
| `USE_UNAUTHORIZED_STORAGE` | `false` | Set `true` when the cloud serves a self-signed certificate. |

### Ports & Volumes

| Port | Purpose |  | Volume (optional) | Purpose |
|---|---|---|---|---|
| `80` → `9900` | Document server HTTP / WOPI |  | `/var/www/onlyoffice/Data` | Keys, fonts cache, forgotten files |
|  |  |  | `/var/log/onlyoffice` | Server logs |
|  |  |  | `/var/lib/postgresql` | Bundled database |

The volumes are **optional**: for a pure WOPI back-end the editor is effectively
stateless (your documents live in OpenCloud). Mount them to persist the internal
cache and database across restarts and speed up subsequent boots.

<br>

## 6. Updating

On Unraid: **Docker** tab → click the container → **Force Update**. Euro Office
tracks the upstream `ghcr.io/euro-office/documentserver:latest` image. To pin a
specific version, set an explicit tag in the template's *Repository* field
(Advanced View).

<br>

## 7. Troubleshooting

<details>
<summary><b>Documents won't open in OpenCloud ("error finding app providers" / editor never loads)</b></summary>

- Confirm the discovery endpoint answers: `curl -s http://<ip>:9900/hosting/discovery | head` should return `<wopi-discovery>` XML. If it times out, the server is still starting, wait a minute after first boot.
- The **JWT secret** here and OpenCloud's **Office WOPI secret** must be byte-for-byte identical. A mismatch fails silently.
- Make sure OpenCloud's **Office document server URL** is reachable *from the OpenCloud container* (use the LAN IP or a resolvable proxy hostname, not `localhost`).
</details>

<details>
<summary><b>"Download failed" when saving, or the editor can't fetch the file</b></summary>

- If OpenCloud uses a self-signed certificate, set **Allow self-signed upstream** = `true` (`USE_UNAUTHORIZED_STORAGE=true`) on this container.
- If you front OpenCloud with a reverse proxy, make sure the URL you gave OpenCloud is the one the editor can actually reach.
</details>

<details>
<summary><b>First start is slow / high CPU right after boot</b></summary>

- Normal. The bundled database initialises and the converter warms up on the first start. It settles once `/hosting/discovery` returns XML. Mount the optional **Database** volume to skip the DB re-init on later restarts.
</details>

<br>

## 8. Contributing / License

Pull requests welcome. Issues:
<https://github.com/junkerderprovinz/unraid-apps/issues>.

**Licensing — dual:**

- This **wrapper** (Unraid template, README, banner/icon artwork) is licensed under the [MIT License](../LICENSE).
- **Euro Office itself** is developed by the Euro Office project and retains its upstream license, see <https://github.com/euro-office/documentserver>. When you run, redistribute or rebuild the resulting container image, you must comply with **all** upstream licenses, not only with this wrapper's MIT license.

### Credits

- [**Euro Office**](https://github.com/euro-office/documentserver) — the sovereign European document server
- [**OnlyOffice**](https://github.com/ONLYOFFICE/DocumentServer) — the document server Euro Office builds on
- [**OpenCloud**](https://github.com/junkerderprovinz/opencloud) — the cloud this editor pairs with
- [**Unraid Community Applications**](https://forums.unraid.net/forum/38-community-applications/) — the best app store in self-hosting

<br>

## 9. Support this project

If this template saves you a setup hassle, consider buying me a coffee:

<p align="center">
  <a href="https://buymeacoffee.com/junkerderprovinz">
    <img src="assets/button-buy-me-a-coffee.svg" alt="Buy me a coffee" width="220">
  </a>
</p>
