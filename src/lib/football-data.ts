/**
 * football-data.org API-klient
 *
 * Free tier: 10 req/min, top 12 ligor + VM.
 * Free tier saknar avancerade stats (xG, dribblingar, heatmaps) — för det behövs en
 * betald källa som Opta/StatsBomb. Vi normaliserar det vi får och fyller ut med
 * derived stats för prototypen.
 *
 * Docs: https://www.football-data.org/documentation/quickstart
 */

const BASE_URL = "https://api.football-data.org/v4";

interface FetchOpts {
  revalidate?: number; // ISR cache i sekunder
}

async function fdFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) {
    throw new Error(
      "FOOTBALL_DATA_API_KEY saknas. Lägg till den i .env.local."
    );
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "X-Auth-Token": apiKey },
    next: { revalidate: opts.revalidate ?? 3600 }, // 1h cache default
  });

  if (!res.ok) {
    throw new Error(`football-data ${res.status}: ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}

export interface FDPlayer {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
  shirtNumber?: number;
  currentTeam?: { id: number; name: string; shortName?: string };
}

export interface FDMatch {
  id: number;
  utcDate: string;
  competition: { name: string };
  homeTeam: { name: string; shortName?: string };
  awayTeam: { name: string; shortName?: string };
  score: { fullTime: { home: number | null; away: number | null } };
}

export async function getPlayer(playerId: number): Promise<FDPlayer> {
  return fdFetch<FDPlayer>(`/persons/${playerId}`);
}

export async function getPlayerMatches(
  playerId: number,
  limit = 10
): Promise<FDMatch[]> {
  const data = await fdFetch<{ matches: FDMatch[] }>(
    `/persons/${playerId}/matches?limit=${limit}`
  );
  return data.matches;
}
