import { NextResponse } from "next/server";
import { getPlayer, getPlayerMatches } from "@/lib/football-data";
import { yamalDNA } from "@/data/mock-yamal";
import type { PlayerDNA } from "@/lib/types";

/**
 * GET /api/players/[id]
 *
 * Försöker hämta riktig data från football-data.org.
 * Faller tillbaka på mock-data om API-nyckel saknas eller anropet misslyckas.
 *
 * OBS: free tier saknar avancerade stats (xG, dribblingar, heatmap),
 * så radar och heat är härledda/mockade för prototypen.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const playerId = Number(id);

  // Fallback för Yamal eller om API-nyckel saknas
  if (!process.env.FOOTBALL_DATA_API_KEY || playerId === yamalDNA.meta.id) {
    return NextResponse.json<PlayerDNA>(yamalDNA);
  }

  try {
    const [player, matches] = await Promise.all([
      getPlayer(playerId),
      getPlayerMatches(playerId, 10).catch(() => []),
    ]);

    const age = new Date().getFullYear() - new Date(player.dateOfBirth).getFullYear();

    const dna: PlayerDNA = {
      meta: {
        id: player.id,
        name: player.name,
        shortName: initials(player.name),
        shirtNumber: player.shirtNumber,
        position: (player.position as PlayerDNA["meta"]["position"]) ?? "MID",
        club: player.currentTeam?.name ?? "—",
        nationality: player.nationality,
        age,
      },
      // Free tier ger inte normaliserade stats — sätt placeholder för MVP
      radar: yamalDNA.radar,
      ratings: matches.slice(0, 10).map((m, i) => ({
        matchday: i + 1,
        opponent: m.homeTeam.shortName ?? m.homeTeam.name,
        rating: 6.5 + Math.random() * 2, // Placeholder
      })),
      season: yamalDNA.season,
      heat: yamalDNA.heat,
    };

    return NextResponse.json(dna);
  } catch (err) {
    console.error("API fel, faller tillbaka på mock:", err);
    return NextResponse.json<PlayerDNA>(yamalDNA);
  }
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
