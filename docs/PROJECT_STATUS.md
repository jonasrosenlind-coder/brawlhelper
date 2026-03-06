# BrawlHelper — Projektstatus

**Senast uppdaterad:** 2026-03-04
**Status:** Aktiv utveckling — intro-animation klar, förberedd för deployment
**Git:** Ja — https://github.com/Jrosenlind/BrawlHelper (public, branch `master`, 2 commits)
**Mapp:** `H:\Ai\Vidar`

## Vad är detta?
Webbapp som hjälper spelare att bli bättre på Brawl Stars. Brawler-guider med tips & strategi, spellägestips med aktiva kartor, spelstatistik, Brawl Stars Quiz (10 typer + Mega Mix med svårighetsgrader), Brawler Creator med AI-genererade bilder. Byggd för Vidar.

## Åtkomst & Uppstart

### Starta lokalt
- **Snabbstart:** Dubbelklicka `start.bat` — startar server + öppnar webbläsaren
- **Enkel (utan server):** Öppna `H:\Ai\Vidar\index.html` i webbläsaren (allt utom statistik och klubb-sökning fungerar)
- **Med statistik/klubbar:** `cd H:\Ai\Vidar && node server.js` → http://localhost:3000
- **Kräver:** Node.js (installerat), Brawl Stars API-nyckel (för statistik + klubbar)

### Online (ej deployad ännu)
- **GitHub repo:** https://github.com/Jrosenlind/BrawlHelper
- **Vercel-setup:** `api/[...path].js` + `vercel.json` förberett — behöver Vercel-konto + login
- **Alternativ:** GitHub Pages (statiska filer, Stats/Leaderboard/Clubs fungerar inte utan backend)

### Portar
| Port | Tjänst |
|------|--------|
| 3000 | Node.js proxy-server (statistik, klubbar + statiska filer) |

### API-nycklar & Konfiguration
- **Brawlify API:** Ingen nyckel krävs (brawlers, events, gamemodes)
- **Brawl Stars API:** Nyckel krävs för statistik + klubbar — skaffa på https://developer.brawlstars.com
- **Brawl Stars API-nyckel:** Sparad i `config.env` (läses automatiskt av server.js). Fallback: `BRAWL_API_KEY` miljövariabel
- **Pollinations.ai:** Ingen nyckel krävs (gratis AI-bildgenerering för Brawler Creator)
- **Standard spelare:** `#2LU8UJ98VU` (förifyllt i Stats-sidan)

## Arkitektur

**Teknik:** HTML + CSS + vanilla JavaScript (inga ramverk)
**Design:** Mörkt tema inspirerat av Brawl Stars (svart/mörkgrå), slumpmässigt färgtema vid laddning (13 teman)
**Typsnitt:** Bungee (rubriker) + Nunito (brödtext) via Google Fonts
**Lagring:** localStorage (favoriter, custom brawlers)

```
H:\Ai\Vidar\
├── index.html          ← Huvudsida med alla sektioner (11 sidor)
├── server.js           ← Node.js proxy för Brawl Stars API (PORT dynamisk)
├── package.json        ← npm-metadata (för deployment)
├── vercel.json         ← Vercel deployment-config
├── start.bat           ← Snabbstart (server + webbläsare)
├── config.env          ← Brawl Stars API-nyckel (EJ i git)
├── .gitignore          ← Exkluderar config.env, node_modules, .claude, *.bat
├── api/
│   └── [...path].js    ← Vercel serverless API-proxy (alla endpoints)
├── css/
│   └── style.css       ← All styling (~4050 rader)
├── js/
│   ├── app.js          ← Navigation, event-rotation, bakgrundsscener, 13 färgteman
│   ├── brawlers.js     ← Brawler-lista, detaljer, favoriter, tips (~89 brawlers), kategorier
│   ├── gamemodes.js    ← Spellägen och kartor med kategori-filter
│   ├── quiz.js         ← 10 quiz-typer + Mega Mix, 4 svårighetsgrader
│   ├── guide.js        ← Brawl Guide (~87 brawlers × 8 spellägen → tips)
│   ├── tierlist.js     ← Meta Tier List (89 brawlers × 9 modes, 3 anledningar per)
│   ├── voices.js       ← Brawler voicelines med ljuduppspelning
│   ├── leaderboard.js  ← Leaderboard (spelare, klubbar, per brawler, prestige)
│   ├── clubs.js        ← Klubb-sökare med filter + klubb-badge-bilder
│   ├── stats.js        ← Spelarstatistik med brawler-bilder (kräver backend)
│   ├── music.js        ← Musik/ljud
│   ├── creator.js      ← Brawler Creator (AI-bildgenerering via Pollinations.ai)
│   └── mybrawlers.js   ← Mitt bibliotek (visa/radera skapade brawlers)
└── docs/
    ├── PROJECT_STATUS.md
    └── SESSION_LOG.md
```

**API:er:**
- Brawlify (`api.brawlify.com/v1/`) — brawlers, events, gamemodes (gratis, ingen nyckel)
- Brawl Stars officiella (`api.brawlstars.com/v1/`) — spelardata, klubbar, rankings (kräver nyckel + proxy)
- Pollinations.ai (`image.pollinations.ai/prompt/`) — AI-bildgenerering (gratis, ingen nyckel)
- Brawlify CDN (`cdn.brawlify.com/club-badges/regular/`) — klubb-badge-bilder

**Server-endpoints (server.js + api/[...path].js):**
| Endpoint | Beskrivning |
|----------|-------------|
| `/api/player/TAG` | Hämta spelarstatistik |
| `/api/clubs/search?name=...` | Sök klubbar på namn |
| `/api/clubs/rankings` | Globala klubbrankings (top 200) |
| `/api/clubs/TAG` | Klubb-detaljer |
| `/api/rankings/players?country=` | Spelarranking per land |
| `/api/rankings/clubs?country=` | Klubbranking per land |
| `/api/rankings/brawlers?brawlerId=&country=` | Brawler-ranking |
| `/api/rankings/prestige?country=` | Prestige-ranking |

## Vad är klart
- [x] Responsiv layout med navigation (11 sidor)
- [x] Brawl Stars-inspirerad mörk design med 13 slumpmässiga färgteman
- [x] Startsida med event-rotation från Brawlify API
- [x] **Bakgrundsscener** — 5 miljöer (öken, arena, djungel, lava, snö) med CSS-objekt och väder
- [x] **Random brawler** — slumpmässig brawler med voiceline-pratbubbla
- [x] **Voicelines** — 100+ brawlers med engelska citat + ljuduppspelning (slumpmässig .ogg per brawler)
- [x] Brawler-lista med bilder, sök, kategorier, favoriter, tips (~89 brawlers, 4 tips var)
- [x] Spelläges-sida med alla game modes + kartor + kategori-filter
- [x] **Brawl Guide** — Välj brawler + spelläge → tips (~87 brawlers × 8 modes, 3 tips per)
- [x] **Meta Tier List** — 89 brawlers rankade S/A/B/C/D i 9 spellägen (Overall + 8 modes), klickbar popup med 3 anledningar per brawler per mode
- [x] **Brawl Stars Quiz** — 10 quiz-typer + Mega Mix:
  - Gissa Brawlern, Vem sa det?, Vilken Super?, Sant eller Falskt
  - Gadget Quiz, Star Power Quiz, Guess the Rarity, Emoji Quiz
  - Guess the Attack, Brawler Trivia
  - MEGA MIX (alla typer, valfritt antal alternativ)
- [x] **4 svårighetsgrader** per quiz (Easy/Medium/Hard/Extreme)
- [x] **Leaderboard** — Spelare, klubbar, per brawler, prestige (med landsfilter)
- [x] **Klubb-sökare** — filter på trophies, medlemmar, klubbtyp + klubb-badge-bilder
- [x] **Statistik-sida** — spelare-tag-sökning med brawler-bilder, default tag förifylld
- [x] Node.js proxy-server för Brawl Stars API med persistent API-nyckel (config.env)
- [x] **Brawler Creator** — Tvåstegs AI-skapare med Pollinations.ai
- [x] **My Brawlers** — Bibliotek med alla skapade brawlers, detalj-modal, radera
- [x] **Git + GitHub** — Publikt repo, package.json, .gitignore
- [x] **Vercel serverless API** — `api/[...path].js` förberedd för deployment
- [x] **Intro-animation** — Fullscreen intro med bomb-explosion (gult/lila), R-T flyby, Larry & Lawrie med biljett, Spike-firande, snurrande fly-in
- [x] **Idea Box** — "Share an Idea"-knapp (nere till vänster), modal med textarea, sparar idéer i localStorage, visa alla inskickade idéer. Engelsk text.

## Vad återstår
- [ ] **Deploya online** — Vercel-login eller GitHub Pages (auth-problem vid Vercel CLI-login)
- [ ] Fler quiz-frågor
- [ ] Brawl TV-bakgrund (väntar på att Vidar spelar in `img/brawltv.mp4`)

## Kända begränsningar
- YouTube är blockerat på datorn (Pi-hole) — YouTube-embeds fungerar inte
- Statistik + klubbar kräver API-nyckel + Node.js-server (fungerar inte från file://)
- Brawlify events-endpoint returnerar ibland tom data (mellan rotationer)
- Pollinations.ai kan ibland vara långsam eller nere — bildgenerering tar 5-15 sekunder
- Brawler-bilder sparas som URL (ej base64) — kräver internet för att visa
- Brawl Stars API-nyckel är IP-låst — vid deployment behövs ny nyckel med serverns IP
- Inga tester

## Relaterade projekt
Inget direkt beroende till andra projekt. Fristående webbapp.
