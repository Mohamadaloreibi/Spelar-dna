/**
 * SpelarDNA — gemensamma typer
 */

export type Position = "GK" | "DEF" | "MID" | "FWD" | "RW" | "LW" | "ST" | "CB" | "FB" | "CM" | "CAM" | "CDM";

export interface PlayerMeta {
  id: number;
  name: string;
  shortName: string; // initialer för avatar, t.ex. "LY"
  shirtNumber?: number;
  position: Position;
  club: string;
  nationality: string;
  age: number;
  height?: number;
  preferredFoot?: "Vänster" | "Höger" | "Båda";
}

/**
 * Normaliserade radar-värden 0-100.
 * Axlarna är position-beroende; för en ytter använder vi t.ex. dribbling istället för dueller.
 */
export interface RadarAxis {
  key: string;
  label: string;
  value: number; // 0-100
}

export interface RadarLayer {
  layer: "season" | "last10" | "last5";
  axes: RadarAxis[];
}

export interface MatchRating {
  matchday: number;
  opponent: string;
  rating: number; // 0-10
  goals?: number;
  assists?: number;
  date?: string;
}

export interface SeasonStats {
  competition: string;
  appearances: number;
  goals: number;
  assists: number;
  minutes: number;
  avgRating: number;
  goalsPer90?: number;
  gaPer90?: number;
  shotsPer90?: number;
  xG?: number;
}

export interface HeatPoint {
  x: number; // 0-100 (procent av planlängd)
  y: number; // 0-100 (procent av planbredd)
  intensity: number; // 0-1
}

export interface PlayerDNA {
  meta: PlayerMeta;
  radar: RadarLayer[];
  ratings: MatchRating[]; // senaste 10
  season: SeasonStats;
  heat: HeatPoint[];
  worldCup?: {
    team: string;
    group: string;
    flagColors: [string, string, string?];
  };
}
