import type { HeatPoint } from "@/lib/types";

interface Props {
  points: HeatPoint[];
}

export function HeatMap({ points }: Props) {
  return (
    <div className="relative aspect-[1.5/1] overflow-hidden rounded-lg border border-[#1a4a2a] bg-gradient-to-b from-[#0d3b1f] to-[#0a2e18]">
      {/* Plankontur */}
      <div className="absolute inset-2 rounded-sm border-[1.5px] border-white/15" />
      <div className="absolute left-2 right-2 top-1/2 h-[1.5px] bg-white/15" />
      <div className="absolute left-1/2 top-1/2 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/15" />
      {/* Straffområden */}
      <div className="absolute left-1/4 top-2 h-[22%] w-1/2 border-[1.5px] border-t-0 border-white/15" />
      <div className="absolute bottom-2 left-1/4 h-[22%] w-1/2 border-[1.5px] border-b-0 border-white/15" />

      {/* Heat blobs */}
      {points.map((p, i) => {
        const size = 40 + p.intensity * 65;
        // Färg-rampning: låg = grön, medel = gul, hög = röd
        let color;
        if (p.intensity >= 0.7) color = `rgba(255,56,96,${0.4 + p.intensity * 0.4})`;
        else if (p.intensity >= 0.45) color = `rgba(255,204,0,${0.35 + p.intensity * 0.35})`;
        else color = `rgba(0,255,148,${0.25 + p.intensity * 0.3})`;

        return (
          <div
            key={i}
            className="pointer-events-none absolute rounded-full blur-[14px]"
            style={{
              top: `${p.y}%`,
              left: `${p.x}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
}
