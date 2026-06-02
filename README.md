# SpelarDNA ⚽

> Visuell spelarprofil med tre-lagrad formradar, momentum-kurva och xT-viktad heatmap. Byggd för VM 2026.

![Stack](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## Konceptet

Traditionella fotbollsappar (Forza, FotMob, Sofascore) visar siffror i tabeller. **SpelarDNA** visar berättelsen: vem är spelaren, vart är hen på väg, och hur het är formen *just nu*?

**Tre tidslager i samma vy:**
- 🔵 **Säsong** — vem är spelaren? (baseline)
- 🟡 **Senaste 10** — vart är hen på väg? (trend)
- 🟢 **Senaste 5** — hur het är formen nu? (form)

När gröna lagret sticker ut utåt jämfört med blå = spelaren överpresterar sin baseline. När det krymper inåt = formdipp.

## Tech-stack

- **Next.js 15** med App Router + Server Components
- **TypeScript** för typsäkerhet
- **Tailwind CSS** för styling
- **football-data.org** som datakälla (gratis tier)
- **Server-side API-route** för att skydda API-nyckeln

## Komma igång

### 1. Klona och installera

```bash
git clone https://github.com/<ditt-username>/spelar-dna.git
cd spelar-dna
npm install
```

### 2. Skaffa API-nyckel

Registrera dig gratis på [football-data.org](https://www.football-data.org/client/register). Du får 10 anrop/minut på free tier, vilket räcker för utveckling.

### 3. Lägg in nyckeln

```bash
cp .env.example .env.local
# Öppna .env.local och lägg in din nyckel
```

### 4. Kör

```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000). Yamal-profilen funkar direkt med fallback-data — även utan API-nyckel.

## Projektstruktur

```
spelar-dna/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Hemsida med spelarlista
│   │   ├── globals.css             # Tailwind + fonts
│   │   ├── player/[id]/page.tsx    # SpelarDNA-profilvy
│   │   └── api/players/[id]/       # API-route som hämtar + normaliserar data
│   ├── components/
│   │   ├── spelar-dna/
│   │   │   ├── PlayerHeader.tsx    # Avatar, namn, position, form-pill
│   │   │   ├── SpiderRadar.tsx     # Tre-lagrad hexagon-radar
│   │   │   ├── MomentumChart.tsx   # Färgkodade staplar för senaste betyg
│   │   │   ├── HeatMap.tsx         # xT-viktad planhetmap
│   │   │   ├── StatsRow.tsx        # Mål, assist, snitt, G+A/90
│   │   │   └── WCPrognosis.tsx     # VM-prognos-card
│   │   └── ui/Card.tsx
│   ├── lib/
│   │   ├── football-data.ts        # API-klient
│   │   ├── stats.ts                # Normalisering, formDelta, radarPoints
│   │   └── types.ts                # PlayerDNA, RadarLayer, MatchRating osv
│   └── data/
│       └── mock-yamal.ts           # Fallback med La Liga 25/26-data
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## Roadmap

- [x] Tre-lagrad DNA-radar (säsong / senaste 10 / senaste 5)
- [x] Momentum-staplar med färgkodning
- [x] xT-viktad heatmap (mockad)
- [x] football-data.org-integration med fallback
- [x] Yamal som live-exempel inför VM 2026
- [ ] Jämför-vy (två spelare ovanpå varandra på samma radar)
- [ ] Position-aware axlar (mittback ≠ ytter ≠ anfallare)
- [ ] Toggle för att visa/dölja lager
- [ ] Spelar-sök
- [ ] Supabase-cache för att spara stats över tid
- [ ] Riktig xG/dribblings-data via StatsBomb open data eller Understat-skrapning
- [ ] Allsvenskan-versionen (där ingen konkurrent finns idag)

## Datakällor och begränsningar

football-data.org free tier ger basinfo: mål, assist, matcher, position. För **xG, dribblingar, riktig heatmap** behövs antingen:

1. **StatsBomb Open Data** — gratis men begränsad till specifika turneringar
2. **Opta/StatsBomb betald** — riktig data
3. **Understat-skrapning** — funkar för xG i top-5-ligor

För prototypen normaliserar vi enkla stats till radar-värden 0-100, och kompletterar med mockade lager där det behövs.

## Författare

Mohamed — utvecklare och fotbollscoach från Göteborg. Bygger i skärningen mellan fotboll och teknik.

## Licens

MIT
