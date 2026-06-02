import type { MatchRating } from "@/lib/types";
import { formDelta, ratingColor } from "@/lib/stats";

interface Props {
  ratings: MatchRating[];
}

export function MomentumChart({ ratings }: Props) {
  const delta = formDelta(ratings);
  const trendUp = delta >= 0;

  return (
    <div className="rounded-xl bg-bg-2 p-3.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-mono text-[10px] tracking-widest text-muted">
          BETYG · SENASTE {ratings.length} MATCHER
        </div>
        <div className={`font-display text-xl tracking-wide ${trendUp ? "text-accent" : "text-accent-3"}`}>
          {delta >= 0 ? "+" : ""}{delta.toFixed(1)} {trendUp ? "▲" : "▼"}
        </div>
      </div>

      {/* Staplar */}
      <div className="mt-1.5 flex h-[70px] items-end gap-1">
        {ratings.map((r, i) => {
          const heightPct = (r.rating / 10) * 100;
          const color = ratingColor(r.rating);
          return (
            <div
              key={i}
              className="relative flex-1 rounded-t-[3px] transition-opacity hover:opacity-70"
              style={{
                height: `${Math.max(heightPct, 10)}%`,
                background: `linear-gradient(180deg, ${color.from}, ${color.to})`,
              }}
              title={`${r.opponent}: ${r.rating}`}
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted">
                {r.rating.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Etiketter */}
      <div className="mt-1.5 flex gap-1">
        {ratings.map((_, i) => (
          <span
            key={i}
            className="flex-1 text-center font-mono text-[9px] text-muted"
          >
            {i === ratings.length - 1 ? "SEN" : `-${ratings.length - i}`}
          </span>
        ))}
      </div>
    </div>
  );
}
