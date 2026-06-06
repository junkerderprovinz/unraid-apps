# featherdrop — Unraid template

A sleek, modern, self-hosted **file sharer**: drop a file, set an expiry (plus optional password
or download limit), share a short link or QR code. Files are **encrypted at rest** (age), uploads
are resumable (tus), metadata is a single SQLite file — no accounts, no separate database. This
folder holds only the **Unraid Community Applications template** (`featherdrop.xml` + icon); the
image, source and full documentation live in the source repo.

- **Source & full README:** https://github.com/junkerderprovinz/featherdrop
- **Image:** `junkerderprovinz/featherdrop` (GHCR + Docker Hub) · amd64 + arm64
- **Support thread:** https://forums.unraid.net/topic/199203-support-junkerderprovinz-featherdrop/

## Install

On Unraid open **Apps** (Community Applications) and search **featherdrop**.
Manual: paste the raw template URL into **Add Container → Template**:

```
https://raw.githubusercontent.com/junkerderprovinz/unraid-docker-templates/main/featherdrop/featherdrop.xml
```
