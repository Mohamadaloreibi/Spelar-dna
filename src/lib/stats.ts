/**
 * Hjälpare för att normalisera spelarstats till radar-värden (0-100)
 * och beräkna momentum/trender.
 */
import type { MatchRating, RadarAxis } from "./types";

/**
 * Normaliserar ett värde mot ett rimligt max för positionen.
 * Klampar till 0-100.
 */
export function normalize(value: number, max: number): number {
  return Math.min(100, Math.max(0, (value / max) * 100));
}

/**
 * Beräknar formdelta — snittbetyg senaste 5 minus snittbetyg senaste 10.
 * Positivt = uppåt, negativt = nedåt.
 */
export function formDelta(ratings: MatchRating[]): number {
  if (ratings.length < 10) return 0;
  const last5 = ratings.slice(-5).reduce((s, r) => s + r.rating, 0) / 5;
  const prev5 = ratings.slice(-10, -5).reduce((s, r) => s + r.rating, 0) / 5;
  return Math.round((last5 - prev5) * 10) / 10;
}

/**
 * Konverterar ett betyg (0-10) till färg-gradient för momentum-staplar.
 */
export function ratingColor(rating: number): { from: string; to: string } {
  if (rating >= 7.5) return { from: "#00ff94", to: "#00b86b" };
  if (rating >= 7.0) return { from: "#ffcc00", to: "#c99c00" };
  if (rating >= 6.3) return { from: "#ff8a40", to: "#cc5e1a" };
  return { from: "#ff3860", to: "#c92847" };
}

/**
 * Bygger radar-axlar baserat på position.
 * För ytter prioriteras dribbling, för mittback dueller etc.
 */
export function radarAxesForPosition(
  position: string
): { key: string; label: string }[] {
  const p = position.toUpperCase();
  if (p.includes("WING") || p === "RW" || p === "LW") {
    return [
      { key: "goals", label: "MÅL" },
      { key: "assists", label: "ASSIST" },
      { key: "dribbling", label: "DRIBBLING" },
      { key: "pressing", label: "PRESSING" },
      { key: "duels", label: "DUELLER" },
      { key: "shots", label: "SKOTT" },
    ];
  }
  if (p.includes("BACK") || p === "CB") {
    return [
      { key: "tackles", label: "TACKLINGAR" },
      { key: "interceptions", label: "BRYTNINGAR" },
      { key: "aerial", label: "LUFTSPEL" },
      { key: "passing", label: "PASSNING" },
      { key: "clearances", label: "KLARERINGAR" },
      { key: "buildup", label: "UPPBYGGNAD" },
    ];
  }
  if (p === "ST" || p.includes("STRIKER") || p.includes("FORWARD")) {
    return [
      { key: "goals", label: "MÅL" },
      { key: "xG", label: "xG" },
      { key: "shots", label: "SKOTT" },
      { key: "holdup", label: "HÅLLA UPP" },
      { key: "pressing", label: "PRESSING" },
      { key: "aerial", label: "LUFTSPEL" },
    ];
  }
  // default mittfältare
  return [
    { key: "passing", label: "PASSNING" },
    { key: "assists", label: "ASSIST" },
    { key: "dribbling", label: "DRIBBLING" },
    { key: "tackles", label: "TACKLINGAR" },
    { key: "vision", label: "VISION" },
    { key: "shots", label: "SKOTT" },
  ];
}

/**
 * Räknar ut polygon-punkter på en SVG-hexagon radar.
 * cx, cy = center. r = max-radie. values = 6 värden 0-100.
 */
export function radarPoints(
  cx: number,
  cy: number,
  r: number,
  values: RadarAxis[]
): string {
  return values
    .map((v, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2; // start uppåt
      const dist = (v.value / 100) * r;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
