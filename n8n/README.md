<h1 align="center">n8n for Unraid</h1>

<a href="https://n8n.io">
  <img src="assets/banner.svg" alt="n8n for Unraid" width="100%">
</a>

<p align="center">
  <a href="https://github.com/junkerderprovinz/unraid-docker-templates/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/unraid-docker-templates/validate.yml?branch=main&label=Validate&style=for-the-badge&logo=githubactions&logoColor=white" alt="Validate" height="36"></a>&nbsp;
  <a href="https://n8n.io"><img src="https://img.shields.io/badge/Upstream-n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white" alt="Upstream n8n" height="36"></a>&nbsp;
  <a href="https://hub.docker.com/r/n8nio/n8n"><img src="https://img.shields.io/badge/Image-n8nio%2Fn8n-1d99f3?style=for-the-badge&logo=docker&logoColor=white" alt="Image" height="36"></a>&nbsp;
  <a href="https://www.postgresql.org"><img src="https://img.shields.io/badge/DB-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" height="36"></a>&nbsp;
  <a href="https://unraid.net"><img src="https://img.shields.io/badge/Unraid-Template-f15a2c?style=for-the-badge&logo=unraid&logoColor=white" alt="Unraid" height="36"></a>&nbsp;
  <a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" height="36"></a>
</p>

<p align="center">
A plug-and-play Unraid Community Applications template for <b>n8n</b> — the open
workflow-automation tool. Wraps the official <code>n8nio/n8n</code> image with
<b>production-ready defaults</b>: PostgreSQL by default, task runners on,
execution-history pruning, binary data on disk, telemetry off, and LAN-friendly
login. Every option is exposed in the template form.
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
5. [Permissions (important)](#5-permissions-important)
6. [Configuration](#6-configuration)
7. [Reverse proxy & HTTPS](#7-reverse-proxy--https)
8. [Backup & restore](#8-backup--restore)
9. [Updating](#9-updating)
10. [Troubleshooting](#10-troubleshooting)
11. [License](#11-license)

<br>

## 1. What is this?

An **Unraid Community Applications template** for [n8n](https://n8n.io). It deploys the
official [`n8nio/n8n`](https://hub.docker.com/r/n8nio/n8n) image with sane, production-oriented
settings so you get a solid instance from the first Apply — PostgreSQL out of the box,
execution pruning so the database doesn't grow without bound, binary data on disk, telemetry
disabled, and the LAN login gotcha already handled.

<br>

## 2. Features

- **PostgreSQL by default** — the database n8n recommends for anything beyond a toy instance
  (SQLite is still one setting away).
- **Task runners enabled** (`N8N_RUNNERS_ENABLED=true`).
- **Execution-history pruning** — `EXECUTIONS_DATA_PRUNE` on, 14-day retention.
- **Binary data on disk** (`N8N_DEFAULT_BINARY_DATA_MODE=filesystem`).
- **Telemetry off** (`N8N_DIAGNOSTICS_ENABLED=false`).
- **LAN-friendly login** — `N8N_SECURE_COOKIE=false` (flip it for HTTPS).
- **Webhook / reverse-proxy fields** ready (`WEBHOOK_URL`, `N8N_HOST`, `N8N_PROTOCOL`).
- **Optional `/files` mount** for the Read/Write Files node.
- **Every option visible** in the template form — no hidden "advanced" settings.

<br>

## 3. PostgreSQL setup (do this first)

This template defaults to PostgreSQL, so n8n needs a database **before** its first start. Use
the official **PostgreSQL** Community Applications app (or any reachable Postgres server), then
create a database and user:

```sql
CREATE DATABASE n8n;
CREATE USER n8n WITH PASSWORD 'choose-a-strong-password';
GRANT ALL PRIVILEGES ON DATABASE n8n TO n8n;
-- PostgreSQL 15+ also needs schema rights:
\connect n8n
GRANT ALL ON SCHEMA public TO n8n;
```

One-liner from the Unraid console (adjust the container name `PostgreSQL`):

```bash
docker exec -i PostgreSQL psql -U postgres <<'SQL'
CREATE DATABASE n8n;
CREATE USER n8n WITH PASSWORD 'choose-a-strong-password';
GRANT ALL PRIVILEGES ON DATABASE n8n TO n8n;
\connect n8n
GRANT ALL ON SCHEMA public TO n8n;
SQL
```

Then fill the template's **Postgres Host / Port / Database / User / Password** fields. If
Postgres and n8n share a custom Docker network you can use the container name as the host;
otherwise use its IP.

> **Prefer SQLite?** Set **DB Type** to `sqlite` and leave the Postgres fields empty.

<br>

## 4. Quick Start on Unraid

1. **Apps** tab → search **n8n** (by junkerderprovinz) → **Install**.
2. Do the [PostgreSQL setup](#3-postgresql-setup-do-this-first) and fill the Postgres fields.
3. Fix the AppData [permissions](#5-permissions-important) (one command).
4. Set **Timezone** / **Generic Timezone**, optionally an **Encryption Key**.
5. **Apply**, wait for the pull, open the WebUI on port **5678**.

<br>

## 5. Permissions (important)

The official n8n image runs as **`node` (UID 1000)** and has **no `PUID`/`PGID`**. The AppData
folder must be writable by UID 1000, or n8n fails to start with `EACCES`. Run once on the
Unraid console:

```bash
chown -R 1000:1000 /mnt/user/appdata/n8n
chown -R 1000:1000 /mnt/user/appdata/n8n-files   # only if you use the /files mount
```

This is the single most common reason n8n won't start on Unraid.

<br>

## 6. Configuration

Every field is shown in the template (nothing hidden under "advanced").

| Field | Variable / path | Default | Notes |
|---|---|---|---|
| WebUI Port | `5678` | `5678` | n8n editor port |
| AppData | `/home/node/.n8n` | `/mnt/user/appdata/n8n` | encryption key, binary data, logs |
| Local Files | `/files` | `/mnt/user/appdata/n8n-files` | optional, Read/Write Files node |
| DB Type | `DB_TYPE` | `postgresdb` | `postgresdb` or `sqlite` |
| Postgres Host | `DB_POSTGRESDB_HOST` | — | your Postgres server |
| Postgres Port | `DB_POSTGRESDB_PORT` | `5432` | |
| Postgres Database | `DB_POSTGRESDB_DATABASE` | `n8n` | created in step 3 |
| Postgres User | `DB_POSTGRESDB_USER` | `n8n` | created in step 3 |
| Postgres Password | `DB_POSTGRESDB_PASSWORD` | — | masked |
| Encryption Key | `N8N_ENCRYPTION_KEY` | auto | set + back up a long random value |
| Secure Cookie | `N8N_SECURE_COOKIE` | `false` | `true` behind HTTPS |
| Timezone | `TZ` | `Europe/Vienna` | |
| Generic Timezone | `GENERIC_TIMEZONE` | `Europe/Vienna` | Schedule/Cron triggers |
| Task Runners | `N8N_RUNNERS_ENABLED` | `true` | |
| Prune Executions | `EXECUTIONS_DATA_PRUNE` | `true` | |
| Execution Max Age | `EXECUTIONS_DATA_MAX_AGE` | `336` | hours (14 days) |
| Binary Data Mode | `N8N_DEFAULT_BINARY_DATA_MODE` | `filesystem` | |
| Telemetry | `N8N_DIAGNOSTICS_ENABLED` | `false` | |
| Webhook URL | `WEBHOOK_URL` | — | public URL behind a proxy |
| Host | `N8N_HOST` | — | public hostname behind a proxy |
| Protocol | `N8N_PROTOCOL` | `http` | |

Need a variable that isn't listed (e.g. `N8N_PROXY_HOPS`, queue mode)? Use Unraid's
**Add another Path, Port, Variable…** to add any n8n environment variable.

<br>

## 7. Reverse proxy & HTTPS

Behind SWAG / Nginx Proxy Manager / Traefik:

- Set **Host** = `n8n.example.com`, **Webhook URL** = `https://n8n.example.com/`.
- Set **Secure Cookie** = `true` (you're on HTTPS now).
- Keep **Protocol** = `http` and let the proxy terminate TLS; forward the standard
  `X-Forwarded-*` headers. If n8n sees the wrong client IP, add `N8N_PROXY_HOPS=1`.

<br>

## 8. Backup & restore

Two things hold your state:

1. **The PostgreSQL database** — back it up with `pg_dump` (workflows, credentials metadata,
   executions).
2. **The AppData folder** (`/mnt/user/appdata/n8n`) — holds the **encryption key** and on-disk
   binary data. Without the encryption key, saved credentials in the DB can't be decrypted.
   Back up both together.

<br>

## 9. Updating

n8n updates by image: hit **Force Update** in the Unraid Docker tab. Your data lives in Postgres
+ AppData, so it survives updates. Pin a version by changing the `:latest` tag on the
**Repository** field if you prefer controlled upgrades.

<br>

## 10. Troubleshooting

<details><summary><b>"Your n8n server is configured to use a secure cookie…"</b></summary>

You're opening n8n over plain HTTP. Either set **Secure Cookie** = `false` (LAN), or put n8n
behind HTTPS and set it back to `true`.
</details>

<details><summary><b>Container won't start / EACCES / permission denied</b></summary>

The AppData folder isn't writable by UID 1000. Run
`chown -R 1000:1000 /mnt/user/appdata/n8n` (see [Permissions](#5-permissions-important)).
</details>

<details><summary><b>Database connection errors (ECONNREFUSED / authentication failed)</b></summary>

Check the Postgres Host/Port/User/Password, that the database exists, and that the Postgres
server is reachable from the n8n container. See [PostgreSQL setup](#3-postgresql-setup-do-this-first).
</details>

<details><summary><b>Webhooks return the wrong URL</b></summary>

Set **Webhook URL** to your public base URL (e.g. `https://n8n.example.com/`).
</details>

<br>

## 11. License

This template is MIT-licensed (see [LICENSE](../LICENSE)). n8n itself is developed by
[n8n GmbH](https://n8n.io) under its own
[Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md); this repo only
packages it for Unraid.
