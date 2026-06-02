import Link from "next/link";
import { yamalDNA } from "@/data/mock-yamal";

const FEATURED = [
  { id: yamalDNA.meta.id, name: "Lamine Yamal", team: "Spanien", pos: "RW" },
  // Lägg till fler spelare här när football-data-anropet ger DNA-data
];

export default function Home() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-16 pt-6">
      <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
        <div className="font-display text-2xl tracking-[3px]">
          SPELAR<span className="text-accent">DNA</span>
        </div>
        <div className="font-mono text-[11px] tracking-wider text-muted">
          <span className="mr-1.5 text-accent-3">●</span>VM 2026 · 16 DAGAR KVAR
        </div>
      </div>

      <h1 className="mb-2 font-display text-5xl tracking-wide">UTVALDA SPELARE</h1>
      <p className="mb-8 text-muted">
        Klicka på en spelare för att se DNA-radar, momentum och xT-heatmap.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map((p) => (
          <Link
            key={p.id}
            href={`/player/${p.id}`}
            className="group rounded-2xl border border-line bg-card p-5 transition-colors hover:border-accent"
          >
            <div className="mb-3 font-mono text-[10px] tracking-widest text-muted">
              {p.team.toUpperCase()} · {p.pos}
            </div>
            <div className="font-display text-2xl tracking-wide group-hover:text-accent">
              {p.name.toUpperCase()}
            </div>
            <div className="mt-3 font-mono text-[10px] text-muted">
              SE PROFIL →
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
