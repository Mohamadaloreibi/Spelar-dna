import type { SeasonStats } from "@/lib/types";

interface Props {
  stats: SeasonStats;
}

export function StatsRow({ stats }: Props) {
  return (
    <div className="mt-4 grid grid-cols-4 gap-2.5 max-sm:grid-cols-2">
      <StatBox num={stats.goals} label={`MÅL · ${stats.competition.split(" ")[0].toUpperCase()}`} delta={`${stats.appearances} MATCHER`} />
      <StatBox num={stats.assists} label="ASSIST" delta="▲ TOPP" />
      <StatBox num={stats.avgRating.toFixed(2)} label="SNITTBETYG" delta="FOTMOB" />
      <StatBox num={(stats.gaPer90 ?? 0).toFixed(2)} label="G+A / 90 MIN" delta="TOP 1%" />
    </div>
  );
}

function StatBox({ num, label, delta }: { num: number | string; label: string; delta: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-card p-3.5 text-center">
      <div className="font-display text-3xl leading-none tracking-wide">{num}</div>
      <div className="mt-1.5 font-mono text-[9px] tracking-widest text-muted">{label}</div>
      <div className="mt-0.5 font-mono text-[10px] text-accent">{delta}</div>
    </div>
  );
}
