# JDownloader — Unraid template

JDownloader 2 with a clean, **sleek, fully dark UI** out of the box — a complete monochrome
IBM Carbon (`#161616`) dark interface (download list, link grabber *and* settings) on a
hardware-accelerated **KasmVNC** web desktop, with full two-way browser clipboard over HTTPS.
This folder holds only the **Unraid Community Applications template** (`jdownloader.xml` + icon);
the image, Dockerfile and full documentation live in the source repo.

- **Source & full README:** https://github.com/junkerderprovinz/jdownloader
- **Image:** `junkerderprovinz/jdownloader` (GHCR + Docker Hub) · amd64 + arm64
- **Support thread:** https://forums.unraid.net/topic/199305-support-junkerderprovinz-jdownloader-2/

> First start: JDownloader installs and themes itself — wait for the `JDOWNLOADER IS READY`
> banner in the container log before opening the WebUI (HTTPS, port 3001).

## Install

On Unraid open **Apps** (Community Applications) and search **JDownloader**.
Manual: paste the raw template URL into **Add Container → Template**:

```
https://raw.githubusercontent.com/junkerderprovinz/unraid-docker-templates/main/jdownloader/jdownloader.xml
```
