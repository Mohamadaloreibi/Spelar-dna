import type { RadarLayer } from "@/lib/types";
import { radarPoints } from "@/lib/stats";

interface Props {
  layers: RadarLayer[];
}

const LAYER_STYLE = {
  season: { fill: "rgba(74,111,165,0.22)", stroke: "#4a6fa5", label: "SÄSONG" },
  last10: { fill: "rgba(255,204,0,0.14)", stroke: "#ffcc00", label: "SENASTE 10" },
  last5:  { fill: "rgba(0,255,148,0.18)", stroke: "#00ff94", label: "SENASTE 5 · FORM" },
} as const;

const CX = 200;
const CY = 200;
const R  = 160;

export function SpiderRadar({ layers }: Props) {
  // Axlar tas från första lagret (alla lager har samma axlar)
  const axes = layers[0]?.axes ?? [];

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 400 400" className="aspect-square w-full max-w-[440px]">
        {/* Hexagon-grid */}
        <g fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1">
          {[1, 0.75, 0.5, 0.25].map((scale) => (
            <polygon
              key={scale}
              points={hexPoints(CX, CY, R * scale)}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* Axlar */}
        <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
          {axes.map((_, i) => {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x2 = CX + Math.cos(angle) * R;
            const y2 = CY + Math.sin(angle) * R;
            return <line key={i} x1={CX} y1={CY} x2={x2} y2={y2} />;
          })}
        </g>

        {/* Lager — rita i ordning season → last10 → last5 */}
        {layers.map((layer) => {
          const style = LAYER_STYLE[layer.layer];
          return (
            <polygon
              key={layer.layer}
              points={radarPoints(CX, CY, R, layer.axes)}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={layer.layer === "last5" ? 2 : 1.5}
            />
          );
        })}

        {/* Labels */}
        <g
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="10"
          fill="#8b96b3"
          fontWeight="500"
          letterSpacing="1"
        >
          {axes.map((axis, i) => {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const labelR = R + 24;
            const x = CX + Math.cos(angle) * labelR;
            const y = CY + Math.sin(angle) * labelR;
            const anchor =
              Math.cos(angle) > 0.3
                ? "start"
                : Math.cos(angle) < -0.3
                  ? "end"
                  : "middle";
            return (
              <text key={axis.key} x={x} y={y} textAnchor={anchor}>
                {axis.label}
              </text>
            );
          })}
        </g>
      </svg>

      <div className="mt-3 flex flex-wrap justify-center gap-3.5 font-mono text-[10px] tracking-wider text-muted">
        {layers.map((l) => (
          <div key={l.layer} className="flex items-center gap-1.5">
            <div className="h-[3px] w-3.5 rounded-sm" style={{ background: LAYER_STYLE[l.layer].stroke }} />
            {LAYER_STYLE[l.layer].label}
          </div>
        ))}
      </div>
    </div>
  );
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
  }).join(" ");
}
