/**
 * Yamal-data baserad på La Liga 25/26.
 * Källor: FotMob, FootyStats, LaLiga.com.
 * Används som fallback när football-data.org saknar avancerade stats
 * (free tier ger ej xG, dribblingar, heatmap).
 */
import type { PlayerDNA } from "@/lib/types";

export const yamalDNA: PlayerDNA = {
  meta: {
    id: 1467236,
    name: "Lamine Yamal",
    shortName: "LY",
    shirtNumber: 10,
    position: "RW",
    club: "FC Barcelona",
    nationality: "Spanien",
    age: 18,
    height: 178,
    preferredFoot: "Vänster",
  },
  worldCup: {
    team: "Spanien",
    group: "B",
    flagColors: ["#c60b1e", "#ffc400", "#c60b1e"],
  },
  // Tre lager: säsong (baseline), senaste 10 (trend), senaste 5 (form).
  // Värden 0-100 normaliserade mot La Liga top-percentil för positionen.
  radar: [
    {
      layer: "season",
      axes: [
        { key: "goals", label: "MÅL", value: 82 },
        { key: "assists", label: "ASSIST", value: 95 },
        { key: "dribbling", label: "DRIBBLING", value: 98 },
        { key: "pressing", label: "PRESSING", value: 55 },
        { key: "duels", label: "DUELLER", value: 50 },
        { key: "shots", label: "SKOTT", value: 88 },
      ],
    },
    {
      layer: "last10",
      axes: [
        { key: "goals", label: "MÅL", value: 78 },
        { key: "assists", label: "ASSIST", value: 92 },
        { key: "dribbling", label: "DRIBBLING", value: 96 },
        { key: "pressing", label: "PRESSING", value: 60 },
        { key: "duels", label: "DUELLER", value: 52 },
        { key: "shots", label: "SKOTT", value: 85 },
      ],
    },
    {
      layer: "last5",
      axes: [
        { key: "goals", label: "MÅL", value: 92 },
        { key: "assists", label: "ASSIST", value: 98 },
        { key: "dribbling", label: "DRIBBLING", value: 99 },
        { key: "pressing", label: "PRESSING", value: 65 },
        { key: "duels", label: "DUELLER", value: 55 },
        { key: "shots", label: "SKOTT", value: 90 },
      ],
    },
  ],
  ratings: [
    { matchday: 19, opponent: "Espanyol", rating: 7.4 },
    { matchday: 20, opponent: "Atlético", rating: 7.8 },
    { matchday: 21, opponent: "Sevilla", rating: 7.1 },
    { matchday: 22, opponent: "Valencia", rating: 7.7 },
    { matchday: 23, opponent: "Girona", rating: 8.0 },
    { matchday: 24, opponent: "Mallorca", rating: 7.8 },
    { matchday: 25, opponent: "Villarreal", rating: 8.4 },
    { matchday: 26, opponent: "Real Madrid", rating: 9.2 },
    { matchday: 27, opponent: "Betis", rating: 8.5 },
    { matchday: 28, opponent: "Athletic", rating: 8.7 },
  ],
  season: {
    competition: "La Liga 25/26",
    appearances: 28,
    goals: 16,
    assists: 11,
    minutes: 2268,
    avgRating: 8.33,
    goalsPer90: 0.63,
    gaPer90: 1.07,
    shotsPer90: 4.51,
    xG: 15.14,
  },
  // Heatmap för högerytter — start brett höger, cuts inåt mot vänster fot
  heat: [
    { x: 62, y: 12, intensity: 0.9 },
    { x: 70, y: 28, intensity: 0.75 },
    { x: 65, y: 42, intensity: 0.65 },
    { x: 48, y: 22, intensity: 0.7 },
    { x: 62, y: 55, intensity: 0.45 },
    { x: 55, y: 38, intensity: 0.4 },
  ],
};
