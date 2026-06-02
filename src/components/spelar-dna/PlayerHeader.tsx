import type { PlayerDNA } from "@/lib/types";
import { formDelta } from "@/lib/stats";

interface Props {
  dna: PlayerDNA;
}

export function PlayerHeader({ dna }: Props) {
  const { meta, worldCup, season, ratings } = dna;
  const delta = formDelta(ratings);
  const recentAvg =
    ratings.slice(-5).reduce((s, r) => s + r.rating, 0) / 5;

  return (
    <>
      {worldCup && (
        <div className="mb-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-red-700 to-red-900 px-4 py-2.5 font-mono text-[11px] tracking-widest">
          <div className="flex items-center gap-2.5">
            <FlagPill colors={worldCup.flagColors} />
            <span>{worldCup.team.toUpperCase()} · VM 2026 TRUPP · GRUPP {worldCup.group}</span>
          </div>
          <div className="opacity-85">USA · MEXIKO · KANADA</div>
        </div>
      )}

      <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-6 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-card to-card-2 p-5 max-md:grid-cols-[auto_1fr]">
        <div className="pointer-events-none absolute -top-1/2 -right-[10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,196,0,0.10),transparent_60%)]" />

        {/* Avatar */}
        <div className="relative flex h-[84px] w-[84px] items-center justify-center rounded-full border-2 border-[#ffc400] bg-gradient-to-br from-[#2a3654] to-card font-display text-[28px] tracking-widest text-[#ffc400]">
          {meta.shortName}
          {meta.shirtNumber !== undefined && (
            <div className="absolute -bottom-1 -right-1 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-card bg-[#c60b1e] font-display text-sm text-white">
              {meta.shirtNumber}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="mb-2 font-display text-4xl leading-none tracking-widest">
            {meta.name.toUpperCase()}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-[13px] text-muted">
            <span className="rounded bg-[#ffc40020] px-2.5 py-0.5 font-mono text-[11px] tracking-wider text-[#ffc400]">
              {meta.position} · {positionLabel(meta.position)}
            </span>
            <Dot />
            <span>{meta.club.toUpperCase()}</span>
            <Dot />
            <span>
              {meta.age} ÅR
              {meta.height ? ` · ${meta.height}CM` : ""}
              {meta.preferredFoot ? ` · ${meta.preferredFoot.toUpperCase()}` : ""}
            </span>
          </div>
        </div>

        {/* Form pill */}
        <div className="relative z-10 rounded-xl border border-line bg-bg-2 px-4 py-3 text-center max-md:col-span-2">
          <div className="mb-1 font-mono text-[10px] tracking-widest text-muted">FORM</div>
          <div className="font-display text-3xl leading-none tracking-wide text-accent">
            {recentAvg.toFixed(1)}{" "}
            <span className="text-base">{delta >= 0 ? "▲" : "▼"}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function Dot() {
  return <span className="h-[3px] w-[3px] rounded-full bg-muted" />;
}

function FlagPill({ colors }: { colors: [string, string, string?] }) {
  const [a, b, c] = colors;
  const bg = c
    ? `linear-gradient(180deg, ${a} 0% 25%, ${b} 25% 75%, ${c} 75% 100%)`
    : `linear-gradient(180deg, ${a} 0% 50%, ${b} 50% 100%)`;
  return <span className="h-3.5 w-[22px] rounded-sm" style={{ background: bg }} />;
}

function positionLabel(p: string): string {
  const map: Record<string, string> = {
    RW: "YTTER",
    LW: "YTTER",
    ST: "ANFALLARE",
    CB: "MITTBACK",
    CM: "MITTFÄLTARE",
    CAM: "OFF. MITTFÄLT",
    CDM: "DEF. MITTFÄLT",
    GK: "MÅLVAKT",
  };
  return map[p] ?? p;
}
