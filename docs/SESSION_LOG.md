# Sessionslogg — BrawlHelper (Vidar)

## 2026-03-04 — Intro-animation med bomb, R-T, Larry & Lawrie, Spike (session 7)

**Vad gjordes:**
- **Intro-animation** — Helt ny fullscreen intro-sekvens vid sidladdning:
  1. Svart skärm med pyro-eld i bakgrunden (18 flammor + 30 glödande gnistor i orange/guld/lila)
  2. Bomb-explosion i mitten — vit/gul/lila blixt med 3 expanderande ringar + 30 partiklar
  3. Texten "BRAWL HELPER" stiger upp ur explosionen (gul text + lila text, 10° lutning)
  4. R-T:s huvud flyger förbi från vänster till höger (emoji-bild från Brawlify)
  5. Texten skakar när R-T passerar
  6. Larry & Lawrie (båda synliga, huvuden, en speglad) dyker upp från botten med en biljett ("ADMIT ONE — BRAWLHELPER")
  7. Spike (full kropp) dyker upp glad med "THANKS TO BRAWLHELPER!" och gyllene stjärnor
  8. Snurrande fly-in (720° rotation + zoom) → sidan avslöjas
- **Färgschema:** Gult (#ffd700) och lila (#a855f7) genomgående i introt
- **Brawler-bilder:** R-T emoji (16000066), Larry & Lawrie emoji (16000077), Spike borderless (16000005) — alla från Brawlify CDN
- **Idea Box** — Ny "Share an Idea"-knapp (fixed, nere till vänster):
  - Modal med rubrik, beskrivning, textarea (max 500 tecken)
  - Submit sparar till localStorage, visar bekräftelse
  - "View all ideas"-knapp visar alla inskickade idéer med datum
  - Engelsk text (för global publik)

**Beslut tagna:**
- Gult och lila som intro-färger (Vidars val)
- Bomb-explosion som texteffekt (texten stiger upp ur bomben)
- Larry & Lawrie visar bara huvuden (emoji), en speglad för att se ut som två separata karaktärer
- Spike som glad karaktär som firar BrawlHelper
- Idéer sparas i localStorage (ingen backend behövs)

**Problem/blockerare:**
- Inga

**Nästa session:**
- Deploya appen (Vercel login eller GitHub Pages)
- Eventuellt: fler quiz-frågor, Brawl TV-bakgrund

---

## 2026-03-03 — Fler brawler-tips, guider för alla brawlers, Meta Tier List (session 6)

**Vad gjordes:**
- **Brawler-tips utökade** — `brawlers.js` fick 43 nya brawler-tips (4 tips var) + 27 nya entries i `manualClassMap`. Totalt ~89 brawlers har nu tips (tidigare ~35).
- **Brawl Guide utökad** — `guide.js` fick 56 nya BRAWL_GUIDES entries (8 spellägen × 3 tips per mode per brawler). `classMap` synkad. Filen växte från ~1 543 till ~3 944 rader. Totalt ~87 brawlers har guider.
- **Ny sida: Meta Tier List** — Helt ny funktion:
  - `js/tierlist.js` (ny fil, ~4 218 rader) med TIER_DATA (89 brawlers × 9 modes), TIER_REASONS (3 anledningar per brawler per mode), rendering + popup
  - 9 spellägen: Overall, Gem Grab, Brawl Ball, Showdown, Heist, Bounty, Hot Zone, Knockout, Duels
  - Tier-rader S/A/B/C/D med brawler-bilder från Brawlify API
  - Klickbar popup med brawlerbild, tier-badge och 3 strategiska anledningar
  - Mode-filter-knappar för att byta spelläge
  - Responsiv design (768px breakpoint)
- **index.html** — Nav-knapp "Tier List", ny page-section med mode-filter, script-tag, feature-link
- **app.js** — `loadTierList()` anrop i `navigateTo()`
- **style.css** — ~180 rader ny CSS (tier-rader, labels med färg, brawler-ikoner, popup, reason-lista, responsiv)

**Beslut tagna:**
- 3 anledningar per brawler per mode (inte bara 1) — ger mer djup
- Alla 89 brawlers i varje spelläge — ingen brawler saknas
- Tier-placeringar baserade på aktuell meta (mars 2026)

**Problem/blockerare:**
- Tier list-filen (~4 200 rader) var för stor för en enda agent — löstes med 4 parallella agenter som skrev temp-filer, sedan mergades med Node.js

**Nästa session:**
- Deploya appen (Vercel login eller GitHub Pages)
- Eventuellt: fler quiz-frågor

---

## 2026-03-02 — Star Park borttagen, GitHub + deployment-förberedelse (session 5)

**Vad gjordes:**
- **Star Park borttagen** — Hela funktionen raderad på Vidars begäran:
  - `js/starpark.js` raderad (~950 rader)
  - ~1100 rader CSS borttagna (entrance, karta, zoner, quests, partiklar, walkable world)
  - HTML-sektion, nav-knapp, features-länk, script-tag borttagna
  - `initStarPark()` anrop borttaget från app.js
- **Git + GitHub** — Publikt repo skapat:
  - `git init`, initial commit, push till https://github.com/Jrosenlind/BrawlHelper
  - `.gitignore` (exkluderar config.env, node_modules, .claude, *.bat)
  - `package.json` med `"start": "node server.js"`
- **Deployment-förberedelse:**
  - `server.js` PORT gjord dynamisk: `process.env.PORT || 3000` (för Render/Vercel)
  - `api/[...path].js` — Vercel serverless catch-all API-proxy (alla 8 endpoints)
  - `vercel.json` med rewrites
- **Deployment-försök:**
  - Vercel CLI installerades men login misslyckades 2x (device auth timeout)
  - GitHub Pages påbörjades men avbröts

**Beslut tagna:**
- Star Park helt borttagen (Vidars val)
- Valde Render först, bytte till Vercel (Render saknar CLI)
- GitHub repo publikt (appen ska vara gratis och öppen)

**Problem/blockerare:**
- Vercel CLI device auth timeout 2 gånger — användaren hann inte godkänna i webbläsaren
- Appen är INTE deployad ännu

**Nästa session:**
- Deploya appen (Vercel login eller GitHub Pages som alternativ)
- Eventuellt: fler brawler-tips, tier list

---

## 2026-03-01 — Star Park komplett, Stats-förbättringar, Quiz-expansion (session 4)

**Vad gjordes:**
- **Star Park komplett** — Hela den interaktiva temaparken implementerad:
  - HTML-sektion med 4 vyer (entrance, karta, zon, quest) + nav-knapp + features-panel
  - ~450 rader CSS: 3D-grind med gyllene pelare, isometrisk karta (perspective + rotateX), zontiles med hover-lift (translateZ), NPC-kort, quest-UI för alla 4 typer, matchningsspel, partikelsystem (snö/löv/sand/glöd/gnistor/eld), celebration-animation, responsiv design
  - JavaScript med all logik: 6 zoner, 24 quests, localStorage-progress, brawler-bilder från Brawlify API
- **Removed Stories page** — Tog bort nav-knapp, section, features-entry, script-tag, CSS, och js/stories.js
- **Fixad voiceline-audio** — Ändrade `playVoiceLine()` från `lineIndex % files.length` (fel ljud) till `Math.random()` (slumpmässigt klipp från rätt brawler)
- **start.bat** — Ny fil: startar server + öppnar localhost:3000
- **Persistent API-nyckel** — Skapade `config.env` + `loadApiKey()` i server.js (nyckeln försvann inte längre mellan sessioner)
- **Default spelare-tag** — `#2LU8UJ98VU` förifyllt i Stats
- **Brawler-bilder i Stats** — `ensureBrawlersLoaded()` hämtar från Brawlify om inte redan laddade
- **Klubb-badge-bilder** — CDN-URL: `cdn.brawlify.com/club-badges/regular/{badgeId}.png`
- **13 slumpmässiga färgteman** — Byte vid varje reload (borttog lila/rosa/liknande)
- **6 nya quiz-typer** — Totalt 10 + Mega Mix: Gadget, Star Power, Rarity, Emoji, Attack, Trivia

**Beslut tagna:**
- API-nyckel persistent i config.env istället för env-variabel (försvann mellan sessioner)
- Voiceline-ljud slumpmässigt per brawler (inte mappat till specifik textrad — stämmer sällan)
- Borttog lila/rosa/korall/salmon/magenta/lavendel-teman (Vidars preferens)

**Problem/blockerare:**
- Klubb-badge CDN: testade 3 URL-mönster innan rätt hittades (`cdn.brawlify.com/club-badges/regular/`)
- WebFetch rapporterade falsk 404 på .ogg-filer (binärdata tolkades fel)

**Nästa session:**
- Testa Star Park end-to-end (alla 24 quests)
- Eventuellt: fler brawler-tips, tier list

---

## 2026-03-01 — Brawler Creator (AI-bilder), My Brawlers, Star Park (session 3)

**Vad gjordes:**
- **Brawler Creator** — Helt ny tvåstegs-skapare:
  - Steg 1: Stor textarea för fri text-beskrivning av brawlern (utseende, färger, personlighet)
  - Steg 2: AI genererar porträttbild via Pollinations.ai, sedan formulär för namn, rarity (6 nivåer), och 5 abilities (attack, super, gadget, star power, hypercharge — namn + beskrivning)
  - Regenerera-knapp (ny bild med nytt seed), Tillbaka-knapp
  - Sparar allt inkl bild-URL till localStorage
- **My Brawlers** — Bibliotekssida med grid av alla skapade brawlers:
  - Kort med AI-genererad bild, namn, rarity (färgkodad)
  - Klick öppnar detalj-modal med bild, rarity, beskrivning, alla abilities
  - Radera-knapp
- **Bytte från Canvas till AI-bilder** — Tog bort `draw.js` (procedurellt canvas-ritad brawler) och ersatte med AI-genererade bilder via Pollinations.ai (gratis, ingen API-nyckel)
- **CSS** — Ny styling för creator (textarea, loading-spinner, step2-layout med bild + formulär), grid-kort med bilder, detalj-modal med bild
- **Nya quiz-typer** — 6 nya: Gadget Quiz, Star Power Quiz, Guess the Rarity, Emoji Quiz, Guess the Attack, Brawler Trivia (totalt 10 typer + Mega Mix)
- **Star Park** — Ny interaktiv temapark-sida med entrance-vy, karta, zoner, NPC:er och quests
- **Slumpmässiga färgteman** — 8 färgteman som byts vid sidladdning

**Beslut tagna:**
- Pollinations.ai istället för ChatGPT/DALL-E (användaren har ingen API-nyckel)
- Fri text-beskrivning istället för option-pickers (rund/kantig osv) — användaren vill beskriva sin brawler i fritext
- Bilder sparas som URL (inte base64) — enklare, men kräver internet
- `draw.js` borttagen från index.html — filen finns kvar men inkluderas ej

**Problem/blockerare:**
- Inga

**Nästa session:**
- Testa Creator end-to-end (generering + spara + visa i bibliotek)
- Eventuellt: konvertera bild till base64 vid sparande (för offline-visning)

---

## 2026-02-28 — Bakgrundsscener, quiz-system, klubb-sökare (session 2)

**Vad gjordes:**
- **Bakgrundsscener** — 5 detaljerade CSS-miljöer (öken, arena, djungel, lava, snö) med objekt (kaktus, träd, berg, granar, lavapoolar, stenar, buskar)
- **Brawl Stars-stil** — Ändrade bakgrunder till ljusblå himmel, puffiga moln, gräs, livfulla markfärger med rundad horisont
- **Väder per scen** — sandstorm (öken), snöfall (snö), stjärnfall + blinkande stjärnor (natt/arena), glödande gnistor (lava)
- **Brawler-position** — Slumpmässig placering (vänster/mitten/höger) på marken, mindre storlek (25vh), full kropp synlig
- **Voicelines** — 100+ brawlers med engelska citat, pratbubbla vid sidladdning, fallback för nya brawlers
- **Brawl Stars Quiz** — 4 quiz-typer (Gissa Brawlern, Vem sa det?, Vilken Super?, Sant eller Falskt)
- **4 svårighetsgrader** — Easy/Medium/Hard/Extreme med egna frågepooler, blur-nivåer, antal alternativ (3/4/5/6)
- **MEGA MIX** — 5:e quiz-typ: alla frågetyper blandade, välj antal alternativ (2/4/6/8)
- **Klubb-sökare** — Ny sida "Hitta Klubb" med filter (trophies, medlemmar, klubbtyp), visar top 200 globala klubbar
- **Server-endpoints** — 3 nya API-proxys i server.js (/api/clubs/search, /api/clubs/rankings, /api/clubs/TAG)
- **"Starta om"-knapp** — Fast i nedre högra hörnet

**Beslut tagna:**
- Voicelines på engelska (användarens val — "det ska bara prata engelska")
- Klubb-sökning via rankings-endpoint (top 200 globalt) med klientside-filtrering (inget namnfält)
- Quiz-frågor organiserade per svårighetsgrad med separata frågepooler
- CSS-only scener (inga bilder) — shapes byggda med borders, border-radius, gradienter

**Problem/blockerare:**
- Klubb-sökning + statistik kräver Brawl Stars API-nyckel (ej skaffad ännu)

**Nästa session:**
- Skaffa Brawl Stars API-nyckel
- Fler brawler-tips (täcker ~35 av 100+)
- Eventuellt: tier list, fler quiz-frågor

---

## 2026-02-28 — Första bygget + förbättringar

**Vad gjordes:**
- Byggde hela appen från scratch (index.html, style.css, app.js, brawlers.js, gamemodes.js, stats.js)
- Mörkt Brawl Stars-tema med Bungee + Nunito-typsnitt
- Brawler-sida: grid med alla brawlers, sökfunktion, detaljmodal med star powers, gadgets och tips
- Spelläges-sida: alla game modes från Brawlify API med klickbara sektioner
- Statistik-sida: spelare-tag-sökning (kräver Node.js proxy + API-nyckel)
- Skapade Node.js proxy-server (server.js) för Brawl Stars officiella API
- Animerad bakgrund med brawler-bilder som rör sig (4 rörelsemönster)
- Förberedde video-bakgrund (Brawl TV) — koden klar, väntar på videofil
- Lade till favoritlista med localStorage
- Förbättrade design: glow-hover, zoom-effekter, hero-animation, modal-transition
- Skrev tips för 35+ brawlers
- Lade till kategori-filter (Tank, Skadegörare, Assassin, Prickskytt, Artilleri, Kontroll, Support)

**Beslut tagna:**
- Vanilla JS utan ramverk (Vidar-projekt, enkelhet prioriteras)
- Brawlify API för allt utom spelardata (gratis, ingen nyckel)
- YouTube-embeds funkar inte (Pi-hole blockerar) → video-fil som bakgrund istället
- Kategorinamn på engelska (användarens val)

**Problem/blockerare:**
- YouTube blockerat av Pi-hole → kan inte använda YouTube-embeds
- Brawlify har ingen fungerande player-endpoint → kräver officiell API med nyckel
- Brawl Stars API kräver nyckel + CORS-proxy → löstes med Node.js server

**Nästa session:**
- Vidar spelar in Brawl TV-match → spara som img/brawltv.mp4
- Skaffa Brawl Stars API-nyckel för statistik
- Eventuellt: tier list, fler tips
