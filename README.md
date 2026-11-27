<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.png">
    <img src=".github/assets/banner.png" alt="Unraid Docker Templates: one feed to rule them all" width="100%">
  </picture>
</p>

<p align="center">
  <a href="https://github.com/junkerderprovinz/unraid-apps/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/unraid-apps/validate.yml?branch=main&label=Validate&style=for-the-badge&logo=githubactions&logoColor=white" alt="Validate" height="36"></a>&nbsp;
  <a href="#apps"><img src="https://img.shields.io/badge/Templates-51-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Templates" height="36"></a>&nbsp;
  <a href="https://github.com/junkerderprovinz/unraid-apps/commits/main"><img src="https://img.shields.io/github/last-commit/junkerderprovinz/unraid-apps?branch=main&style=for-the-badge&logo=git&logoColor=white&label=Updated" alt="Last commit" height="36"></a>&nbsp;
  <a href="https://unraid.net"><img src="https://img.shields.io/badge/Unraid-Templates-f15a2c?style=for-the-badge&logo=unraid&logoColor=white" alt="Unraid" height="36"></a>&nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" height="36"></a>
</p>

<p align="center">
Unraid <b>Community Applications</b> templates for junkerderprovinz's containers and most of the plugins, grouped like the profile: <b>Apps</b> (my own software), <b>Images</b> (my own image builds of third-party apps), <b>Wrappers</b> (thin templates over an upstream image) and <b>Plugins</b>. One repository, one CA feed; each app's image and full source live in its own per-app repository.
</p>


## Apps

*My own software, built and published by junkerderprovinz. Full docs live in each app's own repository.*

<img src=".github/readme-icons/bombvault.png" width="84" align="left" alt="BombVault">

**[BombVault](https://github.com/junkerderprovinz/bombvault#readme)** · [Docker compose](https://github.com/junkerderprovinz/bombvault/blob/main/deploy/docker-compose.generic.yml)<br>
Backup and full disaster recovery for containers, VMs and the flash, powered by restic, with one-click backup and cross-server restore.

<br clear="all">

<img src=".github/readme-icons/castleparcel.png" width="84" align="left" alt="CastleParcel">

**[CastleParcel](https://github.com/junkerderprovinz/castleparcel#readme)** · [Docker compose](https://github.com/junkerderprovinz/castleparcel/blob/main/compose.yaml)<br>
The big-file transfer site you know, on your own server and sealed: encrypted in your browser, with an optional owner sign-in, self-expiring share links, file requests and notes.

<br clear="all">

<img src=".github/readme-icons/trickwork.png" width="84" align="left" alt="TrickWork">

**[TrickWork](https://github.com/junkerderprovinz/trickwork#readme)** · [Docker compose](https://github.com/junkerderprovinz/trickwork/blob/main/compose.yaml)<br>
Turns images into proportional-font-aware ASCII art - a rebuild of ASCII Gen 2, picking characters by real ink coverage, not brightness.

<br clear="all">

<img src=".github/readme-icons/arrowloop.png" width="84" align="left" alt="ArrowLoop">

**[ArrowLoop](https://github.com/junkerderprovinz/arrowloop#readme)** · [Docker compose](https://github.com/junkerderprovinz/arrowloop/blob/main/compose.yaml)<br>
Two-way file sync that shows you the plan before it touches a file, sends deletions to a trash and stops a run that would delete too much.

<br clear="all">

<img src=".github/readme-icons/parleyport.png" width="84" align="left" alt="ParleyPort">

**[ParleyPort](https://github.com/junkerderprovinz/parleyport#readme)** · [Docker compose](https://github.com/junkerderprovinz/parleyport/blob/main/compose.yaml)<br>
Your own relay for apps that pair their instances: on different networks they meet there, and it passes on what it cannot read.

<br clear="all">

<img src=".github/readme-icons/knightloader.png" width="84" align="left" alt="KnightLoader">

**[KnightLoader](https://github.com/junkerderprovinz/knightloader#readme)** · [Docker compose](https://github.com/junkerderprovinz/knightloader/blob/main/compose.yaml)<br>
Self-hosted download manager for hosters, debrid, torrents, Usenet and video, with an Android app and a browser extension.

<br clear="all">

<img src=".github/readme-icons/cannoncommander.png" width="84" align="left" alt="CannonCommander">

**[CannonCommander](https://github.com/junkerderprovinz/cannoncommander#readme)** · [Docker compose](https://github.com/junkerderprovinz/cannoncommander/blob/main/compose.yaml)<br>
The most beautiful file manager you will ever run, and the only one you need: two panels, F5 to copy, jobs in the background and a trash for second thoughts.

<br clear="all">


## Images

*My own custom image builds of third-party apps. Full docs in each app's own repository.*

<img src=".github/readme-icons/filebot.png" width="84" align="left" alt="FileBot">

**[FileBot](https://github.com/junkerderprovinz/filebot#readme)** · [Docker compose](https://github.com/junkerderprovinz/filebot/blob/main/compose.yaml)<br>
The FileBot media renamer in your browser on a fast Selkies web desktop, dark from the first start. Bring your own FileBot license.

<br clear="all">

<img src=".github/readme-icons/jdownloader.png" width="84" align="left" alt="JDownloader">

**[JDownloader](https://github.com/junkerderprovinz/jdownloader#readme)** · [Docker compose](https://github.com/junkerderprovinz/jdownloader/blob/main/compose.yaml)<br>
JDownloader 2 with a complete, sleek dark UI out of the box, on a fast Selkies web desktop in your browser. No VNC client, no install.

<br clear="all">

<img src=".github/readme-icons/krusader.png" width="84" align="left" alt="Krusader">

**[Krusader](https://github.com/junkerderprovinz/krusader#readme)** · [Docker compose](https://github.com/junkerderprovinz/krusader/blob/main/compose.yaml)<br>
Twin-pane KDE file manager with a native dark theme on a fast Selkies web desktop, with Kate, krename and RAR built in.

<br clear="all">

<img src=".github/readme-icons/matrix.png" width="84" align="left" alt="Matrix">

**[Matrix](https://github.com/junkerderprovinz/matrix#readme)** · [Docker compose](https://github.com/junkerderprovinz/matrix/blob/main/compose.yaml)<br>
A complete Matrix homeserver in one container: Synapse, coturn, Element Web and the Ketesa admin UI, with optional TURN over TLS.

<br clear="all">

<img src=".github/readme-icons/opencloud.png" width="84" align="left" alt="OpenCloud">

**[OpenCloud](https://github.com/junkerderprovinz/opencloud#readme)** · [Docker compose](https://github.com/junkerderprovinz/opencloud/blob/main/compose.yaml)<br>
One-click OpenCloud file sync &amp; share: auto-runs init, heals appdata permissions and honours PUID/PGID.

<br clear="all">

<img src=".github/readme-icons/prusaslicer.png" width="84" align="left" alt="PrusaSlicer">

**[PrusaSlicer](https://github.com/junkerderprovinz/prusaslicer#readme)** · [Docker compose](https://github.com/junkerderprovinz/prusaslicer/blob/main/compose.yaml)<br>
The PrusaSlicer 3D-printing slicer in your browser on a fast Selkies web desktop: slice and export G-code, no VNC client (amd64 + arm64).

<br clear="all">

<img src=".github/readme-icons/stellarium.png" width="84" align="left" alt="Stellarium">

**[Stellarium](https://github.com/junkerderprovinz/stellarium#readme)** · [Docker compose](https://github.com/junkerderprovinz/stellarium/blob/main/compose.yaml)<br>
The Stellarium planetarium in your browser on a fast Selkies web desktop: pan the sky, zoom a nebula, scrub through time, no VNC client.

<br clear="all">

<img src=".github/readme-icons/garage.png" width="84" align="left" alt="Garage">

**[Garage](https://github.com/junkerderprovinz/garage#readme)** · [Docker compose](https://github.com/junkerderprovinz/garage/blob/main/compose.yaml)<br>
Garage's S3-compatible object store and its web admin panel in one container, with the single-node layout and S3 keys created automatically.

<br clear="all">

<img src=".github/readme-icons/juicefs.png" width="84" align="left" alt="JuiceFS">

**[JuiceFS](https://github.com/junkerderprovinz/juicefs#readme)** · [Docker compose](https://github.com/junkerderprovinz/juicefs/blob/main/compose.yaml)<br>
The JuiceFS S3 gateway, with the file system created on first boot. Metadata goes to a database, file contents to an object store.

<br clear="all">

<img src=".github/readme-icons/euro-office.png" width="84" align="left" alt="Euro Office">

**[Euro Office](https://github.com/junkerderprovinz/euro-office#readme)** · [Docker compose](https://github.com/junkerderprovinz/euro-office/blob/main/compose.yaml)<br>
Sovereign, OnlyOffice-compatible document server for browser editing of Office and OpenDocument files, wired into OpenCloud over WOPI.

<br clear="all">

<img src=".github/readme-icons/excalidraw.png" width="84" align="left" alt="Excalidraw">

**[Excalidraw](https://github.com/junkerderprovinz/excalidraw#readme)** · [Docker compose](https://github.com/junkerderprovinz/excalidraw/blob/main/compose.yaml)<br>
The hand-drawn whiteboard, built so it keeps to itself: shared links, live collaboration, the session scene and even the fonts all come from your own server.

<br clear="all">

<img src=".github/readme-icons/handbrake.png" width="84" align="left" alt="HandBrake">

**[HandBrake](https://github.com/junkerderprovinz/handbrake#readme)** · [Docker compose](https://github.com/junkerderprovinz/handbrake/blob/main/compose.yaml)<br>
HandBrake's full GUI on a fast Selkies web desktop, GPU-accelerated on NVIDIA, Intel and AMD, with a watch folder that converts on its own.

<br clear="all">

<img src=".github/readme-icons/strawdroid.png" width="84" align="left" alt="StrawDroid">

**[StrawDroid](https://github.com/junkerderprovinz/strawdroid#readme)**<br>
The real Android emulator on a Selkies web desktop, reached over adb like a phone on a cable, where Doze and background limits actually fire.

<br clear="all">

<img src=".github/readme-icons/seafile.png" width="84" align="left" alt="Seafile">

**[Seafile](https://github.com/junkerderprovinz/seafile#readme)** · [Docker compose](https://github.com/junkerderprovinz/seafile/blob/main/compose.yaml)<br>
The official Seafile server from one template, with its secrets generated on first start and MariaDB, Redis and the notification server built in on request.

<br clear="all">

<img src=".github/readme-icons/securo.png" width="84" align="left" alt="Securo">

**[Securo](https://github.com/junkerderprovinz/securo#readme)** · [Docker compose](https://github.com/junkerderprovinz/securo/blob/main/compose.yaml)<br>
The Securo finance manager with its worker and scheduler in one container, on your own PostgreSQL and Redis or on built-in ones.

<br clear="all">

<img src=".github/readme-icons/rustdesk.png" width="84" align="left" alt="RustDesk">

**[RustDesk](https://github.com/junkerderprovinz/rustdesk#readme)** · [Docker compose](https://github.com/junkerderprovinz/rustdesk/blob/main/compose.yaml)<br>
Your own RustDesk server with a web console, accounts, an address book on every client and devices that can change their ID.

<br clear="all">

<img src=".github/readme-icons/cadcraft.png" width="84" align="left" alt="CADCraft">

**[CADCraft](https://github.com/junkerderprovinz/artcraft-apps#cadcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/cadcraft.yaml)<br>
CADCraft on a Selkies web desktop: 2D drafting with layers, blocks and dimensions, and DXF and DWG files, all in the browser.

<br clear="all">

<img src=".github/readme-icons/deckcraft.png" width="84" align="left" alt="DeckCraft">

**[DeckCraft](https://github.com/junkerderprovinz/artcraft-apps#deckcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/deckcraft.yaml)<br>
DeckCraft on a Selkies web desktop, for building and presenting PowerPoint decks from any browser.

<br clear="all">

<img src=".github/readme-icons/designcraft.png" width="84" align="left" alt="DesignCraft">

**[DesignCraft](https://github.com/junkerderprovinz/artcraft-apps#designcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/designcraft.yaml)<br>
DesignCraft on a Selkies web desktop: lay out magazines and flyers in the browser and export print-ready PDFs.

<br clear="all">

<img src=".github/readme-icons/effectcraft.png" width="84" align="left" alt="EffectCraft">

**[EffectCraft](https://github.com/junkerderprovinz/artcraft-apps#effectcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/effectcraft.yaml)<br>
EffectCraft on a Selkies web desktop, for motion graphics with compositions, keyframes and effects in the browser.

<br clear="all">

<img src=".github/readme-icons/figcraft.png" width="84" align="left" alt="FigCraft">

**[FigCraft](https://github.com/junkerderprovinz/artcraft-apps#figcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/figcraft.yaml)<br>
FigCraft on a Selkies web desktop: design interfaces with frames and components and click through prototypes in the browser.

<br clear="all">

<img src=".github/readme-icons/filmcraft.png" width="84" align="left" alt="FilmCraft">

**[FilmCraft](https://github.com/junkerderprovinz/artcraft-apps#filmcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/filmcraft.yaml)<br>
FilmCraft on a Selkies web desktop, a nonlinear video editor that cuts the footage on your array from any browser.

<br clear="all">

<img src=".github/readme-icons/gridcraft.png" width="84" align="left" alt="GridCraft">

**[GridCraft](https://github.com/junkerderprovinz/artcraft-apps#gridcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/gridcraft.yaml)<br>
GridCraft on a Selkies web desktop: a spreadsheet with formulas and charts that opens and saves Excel workbooks.

<br clear="all">

<img src=".github/readme-icons/lightcraft.png" width="84" align="left" alt="LightCraft">

**[LightCraft](https://github.com/junkerderprovinz/artcraft-apps#lightcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/lightcraft.yaml)<br>
LightCraft on a Selkies web desktop, a photo library and raw developer that sits right next to the photos on your array.

<br clear="all">

<img src=".github/readme-icons/pdfcraft.png" width="84" align="left" alt="PdfCraft">

**[PdfCraft](https://github.com/junkerderprovinz/artcraft-apps#pdfcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/pdfcraft.yaml)<br>
PdfCraft on a Selkies web desktop, for reading, editing, signing and running OCR on PDFs in the browser.

<br clear="all">

<img src=".github/readme-icons/photocraft.png" width="84" align="left" alt="PhotoCraft">

**[PhotoCraft](https://github.com/junkerderprovinz/artcraft-apps#photocraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/photocraft.yaml)<br>
PhotoCraft on a Selkies web desktop: a layered photo editor in the browser that opens PSD, Krita and Affinity files.

<br clear="all">

<img src=".github/readme-icons/soundcraft.png" width="84" align="left" alt="SoundCraft">

**[SoundCraft](https://github.com/junkerderprovinz/artcraft-apps#soundcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/soundcraft.yaml)<br>
SoundCraft on a Selkies web desktop, a multitrack audio workstation whose sound plays in the browser.

<br clear="all">

<img src=".github/readme-icons/vectorcraft.png" width="84" align="left" alt="VectorCraft">

**[VectorCraft](https://github.com/junkerderprovinz/artcraft-apps#vectorcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/vectorcraft.yaml)<br>
VectorCraft on a Selkies web desktop: vector illustration with paths and type, SVG and PDF in and out.

<br clear="all">

<img src=".github/readme-icons/wordcraft.png" width="84" align="left" alt="WordCraft">

**[WordCraft](https://github.com/junkerderprovinz/artcraft-apps#wordcraft)** · [Docker compose](https://github.com/junkerderprovinz/artcraft-apps/blob/main/compose/wordcraft.yaml)<br>
WordCraft on a Selkies web desktop, a word processor in the browser that opens and saves Word documents.

<br clear="all">


## Wrappers

*Thin templates over a third-party upstream image (no custom build). Full docs in each app's folder below.*

<img src=".github/readme-icons/claper.png" width="84" align="left" alt="Claper">

**[Claper](claper/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/claper/compose.yaml)<br>
Open-source, self-hosted Mentimeter/Slido alternative: live polls, Q&amp;A and quizzes alongside your slides, audience joins from their own device, no app install.

<br clear="all">

<img src=".github/readme-icons/couchdb.png" width="84" align="left" alt="CouchDB">

**[CouchDB](couchdb/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/couchdb/compose.yaml)<br>
The HTTP/JSON document database behind Obsidian LiveSync, on the official 3.x image with data, config and CORS mapped so they survive a recreate or update.

<br clear="all">

<img src=".github/readme-icons/github-runner.png" width="84" align="left" alt="GitHub-Runner">

**[GitHub-Runner](https://github.com/junkerderprovinz/github-runner#readme)** · [Docker compose](https://github.com/junkerderprovinz/github-runner/blob/main/compose.yaml)<br>
Self-hosted GitHub Actions runners for several repositories of a personal account in one container, removed from GitHub again when it stops.

<br clear="all">

<img src=".github/readme-icons/n8n.png" width="84" align="left" alt="n8n">

**[n8n](n8n/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/n8n/compose.yaml)<br>
Workflow automation connecting 400+ apps and APIs, on PostgreSQL by default, with every option exposed in the Unraid template form.

<br clear="all">

<img src=".github/readme-icons/openhands.png" width="84" align="left" alt="OpenHands">

**[OpenHands](openhands/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/openhands/compose.yaml)<br>
Open-source AI software-development agent, pre-wired for a local Ollama model, so it reads, writes and runs code with no cloud account.

<br clear="all">

<img src=".github/readme-icons/pocket-id.png" width="84" align="left" alt="Pocket ID">

**[Pocket ID](pocket-id/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/pocket-id/compose.yaml)<br>
Passkey login for every app on your server that speaks OpenID Connect, with users, groups and an audit log, on SQLite or PostgreSQL.

<br clear="all">

<img src=".github/readme-icons/seaweedfs.png" width="84" align="left" alt="SeaweedFS">

**[SeaweedFS](seaweedfs/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/seaweedfs/compose.yaml)<br>
Fast, S3-API-compatible object store on the official image, the actively-maintained alternative now that MinIO's open edition is done.

<br clear="all">

<img src=".github/readme-icons/standardnotes-server.png" width="84" align="left" alt="Standard Notes Server">

**[Standard Notes Server](standardnotes-server/README.md)**<br>
Self-hosted Standard Notes sync server (external MariaDB + Redis), with an optional LocalStack template for S3-compatible storage.

<br clear="all">

<img src=".github/readme-icons/standardnotes-webui.png" width="84" align="left" alt="Standard Notes Web UI">

**[Standard Notes Web UI](standardnotes-webui/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/standardnotes-webui/compose.yaml)<br>
The official Standard Notes web client, self-hosted next to your own sync server for end-to-end encrypted notes in the browser.

<br clear="all">

<img src=".github/readme-icons/versitygw.png" width="84" align="left" alt="VersityGW">

**[VersityGW](versitygw/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/versitygw/compose.yaml)<br>
An S3 API in front of a share you already have: top-level folders become buckets, and every file stays readable over SMB and NFS at the same time.

<br clear="all">

<img src=".github/readme-icons/rustfs.png" width="84" align="left" alt="RustFS">

**[RustFS](rustfs/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/rustfs/compose.yaml)<br>
An S3 object store in Rust, with the two fixes it needs to run on Unraid at all. Pre-release: every version so far is a release candidate.

<br clear="all">

<img src=".github/readme-icons/silo.png" width="84" align="left" alt="Silo">

**[Silo](silo/README.md)** · [Docker compose](https://github.com/junkerderprovinz/unraid-apps/blob/main/silo/compose.yaml)<br>
MinIO, still maintained: PGSTY's fork of the open-source server, with the full web console. It reads an existing MinIO data folder as it is.

<br clear="all">


## Plugins

*Unraid **plugins** (not containers), listed on CA, installed from the Plugins tab via a `.plg` URL.*

<img src=".github/readme-icons/bombvaultwidget.png" width="84" align="left" alt="BombVault Widget">

**[BombVault Widget](https://github.com/junkerderprovinz/bombvault-widget#readme)**<br>
BombVault's activity log as a real, native tile on the Unraid dashboard: every backup, restore, prune and drill live. Requires 6.9.0+.

<br clear="all">

<img src=".github/readme-icons/shiplog.png" width="84" align="left" alt="ShipLog">

**[ShipLog](https://github.com/junkerderprovinz/shiplog#readme)**<br>
An update advisor in Unraid's Docker tab that shows what changes, how risky it is and which known vulnerabilities an update closes, with an optional auto-update that backs up first.

<br clear="all">

<img src=".github/readme-icons/firesquire.png" width="84" align="left" alt="FireSquire">

**[FireSquire](https://github.com/junkerderprovinz/firesquire#readme)**<br>
A pre-reboot health check returning one clear GO / CAUTION / NO-GO verdict before you reboot, so you never reboot into a landmine.

<br clear="all">

<img src=".github/readme-icons/towertorch.png" width="84" align="left" alt="TowerTorch">

**[TowerTorch](https://github.com/junkerderprovinz/towertorch#readme)**<br>
A fully revamped, modern interface for your whole Unraid server, plus containers that start in the right order once each is really ready.

<br clear="all">


## Install

On Unraid: open **Apps** (Community Applications) and search for the app name. These templates are published from this repository.

To add a single template by hand, paste its raw `*.xml` URL into **Add Container → Template**, e.g.
`https://raw.githubusercontent.com/junkerderprovinz/unraid-apps/main/openhands/openhands.xml`

Apps and Images link to their dedicated repository's README; Wrappers keep their README in their folder here.

**Plugins** (BombVault Widget, ShipLog, FireSquire, TowerTorch) are published from this repository too. CA lists them the same way as containers (a template with `<Plugin>True</Plugin>` + `<PluginURL>`), so search for them in **Apps**. You can also install a plugin directly from **Plugins → Install Plugin** with its raw `.plg` URL, e.g.
`https://raw.githubusercontent.com/junkerderprovinz/firesquire/main/plugin/firesquire.plg`


## How AI is used here

One knight builds this, and AI is one of the tools I work with, the same way I work with an editor or a compiler. It helps me write code and documentation and it checks my work, and that saves me a good many evenings. It does not make the decisions, though. I read and understand everything before it ships, and if something here breaks, that is on me and not on the tool.

You do not have to take my word for it. The code is open and every release note is written by hand. The issue tracker shows how problems actually get handled, including the ones I got wrong the first time. If you find something that is not right, open an issue and I will look at it.

## Support

A one-knight job: I build them, keep them running, work through the issues and add what people ask for, until nothing is missing. They are free, with no accounts, no telemetry, no ads and no paid tier. No asterisk anywhere. Nothing readable ever leaves your own walls. Forged on evenings and weekends, with heart and stubbornness.

If one of these has earned a place on your server or computer, toss a coin to your knight: it helps cover the costs and keeps the project alive. It also makes this knight's heart beat a little faster. Three ways below, whichever suits you.

<p align="center">
  <a href="https://buymeacoffee.com/junkerderprovinz"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(-23.082,-20.153,888.064,285.606))" alt="Buy me a coffee" width="168.773" height="54.278"></a>
  <a href="https://www.paypal.com/donate/?hosted_button_id=76FVV52TKXTUS"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(890.818,-20.153,888.064,285.606))" alt="PayPal" width="168.773" height="54.278"></a>
  <a href="https://junkerderprovinz.github.io/junkerderprovinz/"><img src="https://raw.githubusercontent.com/junkerderprovinz/junkerderprovinz/main/donate/buttons/give.svg#svgView(viewBox(1804.718,-20.153,888.064,285.606))" alt="Donate with crypto" width="168.773" height="54.278"></a>
</p>
