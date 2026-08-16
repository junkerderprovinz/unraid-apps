<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.png">
  <img src="assets/banner.png" alt="Claper for Unraid" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/junkerderprovinz/unraid-apps/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/unraid-apps/validate.yml?branch=main&label=Validate&style=for-the-badge&logo=githubactions&logoColor=white" alt="Validate" height="36"></a>&nbsp;
  <a href="https://claper.co"><img src="https://img.shields.io/badge/Upstream-Claper-14bfdb?style=for-the-badge&logo=github&logoColor=white" alt="Upstream Claper" height="36"></a>&nbsp;
  <a href="https://github.com/ClaperCo/Claper/pkgs/container/claper"><img src="https://img.shields.io/badge/Image-claperco%2Fclaper-1d99f3?style=for-the-badge&logo=docker&logoColor=white" alt="Image" height="36"></a>&nbsp;
  <a href="https://www.postgresql.org"><img src="https://img.shields.io/badge/DB-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" height="36"></a>&nbsp;
  <a href="https://unraid.net"><img src="https://img.shields.io/badge/Unraid-Template-f15a2c?style=for-the-badge&logo=unraid&logoColor=white" alt="Unraid" height="36"></a>&nbsp;
  <a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" height="36"></a>
</p>

<p align="center">
A plug-and-play Unraid Community Applications template for <b>Claper</b> — the open-source,
self-hosted Mentimeter/Slido alternative. Wraps the official
<code>ghcr.io/claperco/claper</code> image: run live polls, Q&amp;A and quizzes alongside
your slides, your audience joins from their own phone or laptop, no app install. Every
option is exposed in the template form.
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
3. [PostgreSQL setup (do this first)](#3-postgresql-setup-do-this-first)
4. [Quick Start on Unraid](#4-quick-start-on-unraid)
5. [Configuration](#5-configuration)
6. [Reverse proxy & HTTPS](#6-reverse-proxy--https)
7. [Backup & restore](#7-backup--restore)
8. [Updating](#8-updating)
9. [Troubleshooting](#9-troubleshooting)
10. [License](#10-license)

<br>

## 1. What is this?

An **Unraid Community Applications template** for [Claper](https://claper.co)
([source](https://github.com/ClaperCo/Claper)). It deploys the official
[`ghcr.io/claperco/claper`](https://github.com/ClaperCo/Claper/pkgs/container/claper) image —
an open-source (AGPL-3.0) tool for running live polls, Q&A and quizzes alongside a
presentation. The audience joins from a link or QR code on their own device; no app to
install, no account required to participate.

<br>

## 2. Features

- **Live polls, quizzes and Q&A** during a presentation, results update in real time
- **Slide upload** (PDF/PPTX/images) with a join link and QR code generated per event
- **Self-hosted, AGPL-3.0** — your events and responses stay on your own server
- Optional self-registration for presenter accounts (toggle in the template)
- Multi-language UI (English, French, Spanish, Italian, German by default)
- Multi-arch upstream image — amd64 + arm64

<br>

## 3. PostgreSQL setup (do this first)

Claper needs a reachable PostgreSQL server and takes **one combined connection string**
(`DATABASE_URL`), not separate host/user/password fields. Create a database and user first,
for example via `docker exec -it <postgres-container> psql -U postgres`:

```sql
CREATE DATABASE claper;
CREATE USER claper WITH ENCRYPTED PASSWORD 'change-me';
GRANT ALL PRIVILEGES ON DATABASE claper TO claper;
```

Then build the **Database URL** field from those values:

```
postgres://claper:change-me@192.168.1.10:5432/claper
```

Migrations run automatically on container start — no manual step needed.

<br>

## 4. Quick Start on Unraid

1. Install from Community Applications, or add this template's URL directly:
   `https://raw.githubusercontent.com/junkerderprovinz/unraid-apps/main/claper/claper.xml`
2. Fill in **Database URL** (see section 3).
3. Set **Secret Key Base** — generate one on the Unraid console: `openssl rand -base64 48`.
4. Set **Base URL** to your server's real address or reverse-proxy domain.
5. Start the container, open the WebUI, log in with the seeded admin account
   `admin@claper.co` / `claper` — **change that password immediately.**

<br>

## 5. Configuration

| Setting | Container Variable | Default | Notes |
|---|---|---|---|
| WebUI Port | (port) | `4000` | Claper's web interface. |
| Uploads | (path) | `/mnt/user/appdata/claper/uploads` | Presentation files. Must be mapped. |
| Database URL | `DATABASE_URL` | *(empty)* | `postgres://USER:PASSWORD@HOST:PORT/DBNAME`. Required. |
| Secret Key Base | `SECRET_KEY_BASE` | *(empty)* | Session/cookie signing key, `openssl rand -base64 48`. Required, ≥32 bytes. |
| Base URL | `BASE_URL` | *(placeholder)* | Public URL used in join links and QR codes. |
| Enable Account Creation | `ENABLE_ACCOUNT_CREATION` | `true` | Advanced. Set `false` once your presenter accounts exist. |
| Max File Size (MB) | `MAX_FILE_SIZE_MB` | `15` | Advanced. Per-file upload cap. |
| Languages | `LANGUAGES` | `en,fr,es,it,de` | Advanced. UI languages to offer. |

Claper also supports SMTP/Postmark mail, OIDC login, and S3-compatible storage instead of
the local Uploads path — none of these are exposed as template fields (advanced, rarely
needed for a home install); set them as extra container variables if you need them. See
[Claper's own configuration docs](https://docs.claper.co/self-hosting/configuration.html)
for the full variable list.

<br>

## 6. Reverse proxy & HTTPS

Claper works fine on plain LAN HTTP. For access from outside your network, put it behind a
reverse proxy with HTTPS and set **Base URL** to the public `https://` address — this is
what gets embedded in join links and QR codes shown to your audience.

<br>

## 7. Backup & restore

Back up two things: the **Uploads** volume (presentation files) and the **PostgreSQL
database** (everything else — accounts, events, poll/quiz results). Restoring both
together restores a working instance; restoring only one leaves uploads and database
references out of sync.

<br>

## 8. Updating

Community Applications shows an update badge when a new image is available. Stop the
container, pull the new `:latest`, start it again — migrations run automatically.

<br>

## 9. Troubleshooting

- **Container won't start, log mentions `SECRET_KEY_BASE`** — the field is empty or under
  32 bytes. Generate a real one: `openssl rand -base64 48`.
- **Container won't start, log mentions `BASE_URL`** — the value must start with `http://`
  or `https://` (a bare hostname is rejected).
- **Can't reach the database** — check `DATABASE_URL`'s host/port are reachable from this
  container (same Docker network or a routable IP), and that the database/user from
  section 3 actually exist.
- **Forgot the admin password** — reset it directly in Postgres, or drop and let it reseed
  on a fresh database (loses all data).

<br>

## 10. License

This template is MIT-licensed (see [`../LICENSE`](../LICENSE)). Claper itself is licensed
AGPL-3.0 by [ClaperCo](https://github.com/ClaperCo/Claper) — this is an independent,
community-maintained Unraid packaging and is not affiliated with the Claper project.
