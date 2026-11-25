<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.png">
  <img src="assets/banner.png" alt="Pocket ID" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/junkerderprovinz/unraid-apps/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/unraid-apps/validate.yml?branch=main&label=Validate&style=for-the-badge&logo=githubactions&logoColor=white" alt="Validate" height="36"></a>&nbsp;
  <a href="https://github.com/pocket-id/pocket-id"><img src="https://img.shields.io/badge/Upstream-Pocket%20ID-1a1a1a?style=for-the-badge&logo=go&logoColor=white" alt="Upstream Pocket ID" height="36"></a>&nbsp;
  <a href="https://hub.docker.com/r/pocketid/pocket-id"><img src="https://img.shields.io/badge/Image-pocketid%2Fpocket--id-1d99f3?style=for-the-badge&logo=docker&logoColor=white" alt="Image" height="36"></a>&nbsp;
  <a href="https://unraid.net"><img src="https://img.shields.io/badge/Unraid-Template-f15a2c?style=for-the-badge&logo=unraid&logoColor=white" alt="Unraid" height="36"></a>&nbsp;
  <a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" height="36"></a>
</p>

<p align="center">
A plug-and-play Unraid Community Applications template for <b>Pocket ID</b>, the small OpenID
Connect provider that signs you in with passkeys, wrapping the <b>official</b>
<code>pocketid/pocket-id</code> image.
</p>

<p align="center">
Maintained solo, in whatever spare time there is. Questions, bugs, ideas and feature requests via <a href="https://github.com/junkerderprovinz/unraid-apps/issues">GitHub issues</a>. If it's useful to you, a coffee is always welcome.
</p>

<p align="center">
  <a href="https://buymeacoffee.com/junkerderprovinz"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(0,0,841.9,245.3))" alt="Buy me a coffee" width="160" height="46.62"></a>
  &nbsp;
  <a href="https://www.paypal.com/donate/?hosted_button_id=76FVV52TKXTUS"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(841.9,0,841.9,245.3))" alt="PayPal" width="160" height="46.62"></a>
  &nbsp;
  <a href="https://junkerderprovinz.github.io/junkerderprovinz/"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(1683.8,0,841.9,245.3))" alt="Donate with crypto" width="160" height="46.62"></a>
</p>

<br>

## Table of Contents

1. [What is this?](#1-what-is-this)
2. [Quick Start on Unraid](#2-quick-start-on-unraid)
3. [Behind a reverse proxy](#3-behind-a-reverse-proxy)
4. [Connecting an app](#4-connecting-an-app)
5. [Configuration](#5-configuration)
6. [Backups and the encryption key](#6-backups-and-the-encryption-key)
7. [When something goes wrong](#7-when-something-goes-wrong)
8. [How AI is used here](#8-how-ai-is-used-here)
9. [Support this project](#9-support-this-project)

## 1. What is this?

Pocket ID is a login server for your other apps. Anything on your server that can sign in over
OpenID Connect (the photo library, the dashboards, the hypervisor's web interface, the media
server with an SSO plugin and plenty more) sends its users to Pocket ID, and Pocket ID asks for
a passkey: the fingerprint reader on a laptop, the face unlock on a phone, a security key. There
are no passwords in it at all, so there is nothing to reuse or phish.

It keeps users, groups and the list of apps that may sign in, and an audit log of every sign-in.
Where the big identity suites want a database, a cache and an afternoon, this is one container
with SQLite and around 20 MB of memory. It is BSD-2-Clause, written in Go and Svelte by
[Elias Schneider](https://github.com/stonith404) and contributors.

The template pins the image to `v2`, so updates follow every 2.x release but a future 3.0 does
not arrive overnight. When it ships, read its release notes and change the tag yourself.

## 2. Quick Start on Unraid

1. **Apps** and search for **Pocket ID**, then install.
2. Set **App URL** to the domain Pocket ID will live under, for example `https://id.example.com`.
   Passkeys are bound to this domain, so settle on it before anyone signs up.
3. Generate an **Encryption Key** in the Unraid terminal and paste it in:

   ```sh
   openssl rand -base64 32
   ```

   Keep a copy in your password manager. Section 6 explains why.
4. Leave **Data** on `/mnt/user/appdata/pocket-id` and the user on 99:100.
5. Start it, set up the reverse proxy (next section), then open `https://id.example.com/setup`.
   You create the first account there, which becomes the admin, and add its passkey right after.

Do the setup soon after the domain goes live. Until the first account exists, anyone who finds
the address can create it.

### Other Docker hosts

[compose.yaml](compose.yaml) runs Pocket ID on any Linux server with Docker. Put it in a folder of its own, fill in every value marked `required` and start it with `docker compose up -d`. The data folder is created next to the file.

- **Synology:** see [Synology](#synology) below.
- **QNAP:** see [QNAP](#qnap) below.
- **UGREEN:** see [UGREEN](#ugreen) below.
- **Proxmox:** run it in a VM or an LXC container that has Docker.

## 3. Behind a reverse proxy

Browsers only create passkeys over HTTPS, and only for the domain in **App URL**. Opening
`http://<tower-ip>:1411` shows the pages, but every passkey prompt fails there. So Pocket ID
needs a reverse proxy with a certificate in front of it.

**Nginx Proxy Manager:** a proxy host for your domain, scheme `http`, the container's IP and port
`1411`, your certificate with *Force SSL* on. Under *Advanced*, larger buffers keep big OIDC
responses from failing with "upstream sent too big header":

```nginx
proxy_busy_buffers_size 512k;
proxy_buffers 4 512k;
proxy_buffer_size 256k;
```

**Trust Proxy:** set it to `true`, or better to the proxy's own address. Without it, the audit
log and the rate limiter see every visitor as the proxy. If a second hop sits in front, such as a
Cloudflare tunnel container, list both addresses, separated by a comma.

**Cloudflare:** a tunnel route or an orange-cloud DNS record works without anything special.
Pocket ID can also take the sign-in location from Cloudflare's headers instead of a GeoLite
database (**Cloudflare Location Headers**), but only switch that on when every request comes
through Cloudflare. Otherwise anyone on your network could send those headers themselves.

## 4. Connecting an app

In Pocket ID, open **OIDC Clients**, add one per app and enter the app's callback URL. The app's
documentation names it; it usually ends in something like `/auth/callback` or
`/oauth2/callback`. Pocket ID then shows a client ID and a client secret.

In the app, choose OpenID Connect (sometimes listed as OAuth or SSO) and give it:

| Field in the app | Value |
|---|---|
| Issuer or discovery URL | `https://id.example.com` or `https://id.example.com/.well-known/openid-configuration` |
| Client ID | from Pocket ID |
| Client secret | from Pocket ID |
| Scopes | `openid profile email`, plus `groups` if the app maps roles from groups |

New clients are restricted to the user groups you allow on them, so add the right group to the
client or nobody gets in.

## 5. Configuration

| Setting | Default | What it does |
|---|---|---|
| **WebUI** | `1411` | Web interface and OIDC endpoints. The reverse proxy points here. |
| **Data** | `/mnt/user/appdata/pocket-id` | SQLite database, uploaded logos, GeoLite database. |
| **App URL** | `https://id.example.com` | Public address with `https://`, no path. Required. |
| **Encryption Key** | - | Encrypts the signing keys and secrets in the database. Required, masked. |
| **Trust Proxy** | `false` | `true` or the proxy addresses, so the real visitor address is logged. |
| **Database Connection String** | empty | Empty means SQLite. `postgres://USER:PASSWORD@HOST:5432/DBNAME` for PostgreSQL. |
| **MaxMind License Key** | empty | A free GeoLite2 key adds city and country to the audit log. |
| **PUID / PGID** | `99` / `100` | The user the app runs as, nobody:users on Unraid. |
| **Cloudflare Location Headers** | `false` | Location from Cloudflare's headers instead of GeoLite. |
| **Audit Log Retention Days** | `90` | How long sign-in events are kept. |
| **Disable UI Configuration** | `false` | `true` makes the settings page read-only and takes settings from environment variables. |
| **Disable Analytics** | `false` | `true` stops the daily heartbeat (version and a random instance ID) to analytics.pocket-id.org. |
| **Disable Version Check** | `false` | `true` stops asking GitHub for the latest release. |
| **Log Level** | `info` | `debug`, `info`, `warn` or `error`. |

Email for sign-up invitations and login codes (SMTP), the look of the login page, LDAP sync and
the rest live in Pocket ID's own settings page, not in the template. The upstream
[documentation](https://pocket-id.org/docs/configuration/environment-variables) lists every
variable if you want to set one by hand under **Add another Path, Port, Variable**.

## 6. Backups and the encryption key

Everything Pocket ID knows is in the **Data** folder. Back it up like any other appdata folder
with the container stopped, or let the built-in export write everything into one ZIP while it
keeps running:

```sh
docker exec Pocket-ID /app/pocket-id export --path /app/data/pocket-id-export.zip
```

The backup is only half of it. The token signing keys inside are encrypted with the
**Encryption Key**, so a restored database without the matching key is useless, and every app
would have to be connected again. Keep the key next to the backup, in your password manager.

To change the key, do not just edit the field. Let Pocket ID re-encrypt its data first, then put
the new key into the template and apply it:

```sh
docker exec -it Pocket-ID /app/pocket-id encryption-key-rotate --new-key <new key>
```

## 7. When something goes wrong

**Lost your only passkey.** Create a one-time sign-in link from the Unraid terminal, valid for an
hour, and add a new passkey once you are in:

```sh
docker exec Pocket-ID /app/pocket-id one-time-access-token <username or email>
```

**The log says "there's already one instance of Pocket ID running".** The container was killed
without a clean stop, and the previous run still holds its lock for about a minute. Wait a moment
and start it again. A normal stop, restart or update through the Docker tab never runs into this.

**"addgroup: gid '100' in use" at the top of the log** is harmless. The image tries to create its
own group, finds Unraid's `users` group already on 100 and runs with that one.

**The passkey prompt fails or never appears.** Check that the browser's address bar shows exactly
the domain in **App URL**, over HTTPS. A different subdomain, the bare IP or plain HTTP all fail.

## 8. How AI is used here

One knight builds this, and AI is one of the tools I work with, the same way I work with an editor or a compiler. It helps me write code and documentation and it checks my work, and that saves me a good many evenings. It does not make the decisions, though. I read and understand everything before it ships, and if something here breaks, that is on me and not on the tool.

You do not have to take my word for it. The code is open and every release note is written by hand. The issue tracker shows how problems actually get handled, including the ones I got wrong the first time. If you find something that is not right, open an issue and I will look at it.

### Synology

In Container Manager (DSM 7.2 or newer), open **Project** and click **Create**. Pick a folder for Pocket ID and upload [compose.yaml](compose.yaml). Container Manager does not create missing folders, so create the ones the file names under `volumes` in File Station first.

### QNAP

In Container Station, open **Applications** and click **Create**. Paste [compose.yaml](compose.yaml) and point the folders under `volumes` at a share, for example `/share/Container/pocket-id`.

### UGREEN

In the Docker app of UGOS Pro, open **Project** and click **Create**. Pick a folder for Pocket ID and paste [compose.yaml](compose.yaml).

<br>

## 9. Support this project

<p align="center">
  <a href="https://buymeacoffee.com/junkerderprovinz"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(0,0,841.9,245.3))" alt="Buy me a coffee" width="160" height="46.62"></a>
  &nbsp;
  <a href="https://www.paypal.com/donate/?hosted_button_id=76FVV52TKXTUS"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(841.9,0,841.9,245.3))" alt="PayPal" width="160" height="46.62"></a>
  &nbsp;
  <a href="https://junkerderprovinz.github.io/junkerderprovinz/"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(1683.8,0,841.9,245.3))" alt="Donate with crypto" width="160" height="46.62"></a>
</p>

<p align="center">
Pocket ID itself is <a href="https://github.com/pocket-id/pocket-id">Elias Schneider's and its contributors'</a> work,
BSD-2-Clause. What is maintained here is the Unraid template and this page.
</p>
