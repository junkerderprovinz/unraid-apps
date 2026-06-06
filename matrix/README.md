# Matrix — Unraid template

All-in-one **Matrix homeserver** for Unraid: Synapse + coturn + Element Web (`/element/`) +
Synapse-Admin (`/admin/`). Plug-and-play — fill in `SERVER_NAME` and the Postgres connection,
everything else is generated. This folder holds only the **Unraid Community Applications
template** (`matrix.xml` + icon); the image, Dockerfile and full setup guide live in the source repo.

- **Source & full README:** https://github.com/junkerderprovinz/matrix
- **Image:** `junkerderprovinz/matrix` (GHCR + Docker Hub) · amd64 + arm64
- **Support thread:** https://forums.unraid.net/topic/198818-support-junkerderprovinz-matrix-aio/

> Requires an external PostgreSQL database (UTF8, `LC_COLLATE=C`) and a reverse proxy — see the source README.

## Install

On Unraid open **Apps** (Community Applications) and search **Matrix**.
Manual: paste the raw template URL into **Add Container → Template**:

```
https://raw.githubusercontent.com/junkerderprovinz/unraid-docker-templates/main/matrix/matrix.xml
```
