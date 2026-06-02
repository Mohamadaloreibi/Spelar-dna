import { notFound } from "next/navigation";
import Link from "next/link";
import { PlayerHeader } from "@/components/spelar-dna/PlayerHeader";
import { SpiderRadar } from "@/components/spelar-dna/SpiderRadar";
import { MomentumChart } from "@/components/spelar-dna/MomentumChart";
import { HeatMap } from "@/components/spelar-dna/HeatMap";
import { StatsRow } from "@/components/spelar-dna/StatsRow";
import { WCPrognosis } from "@/components/spelar-dna/WCPrognosis";
import { Card } from "@/components/ui/Card";
import type { PlayerDNA } from "@/lib/types";

async function getDNA(id: string): Promise<PlayerDNA | null> {
  // Server-side fetch mot vår egen API-route.
  // I prod borde detta importera funktionen direkt för att undvika nätverksanrop.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/players/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dna = await getDNA(id);
  if (!dna) notFound();

  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-16 pt-6">
      {/* Topbar */}
      <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
        <Link href="/" className="font-display text-2xl tracking-[3px]">
          SPELAR<span className="text-accent">DNA</span>
        </Link>
        <div className="font-mono text-[11px] tracking-wider text-muted">
          <span className="mr-1.5 text-accent-3">●</span>FÖRE VM · 16 DAGAR KVAR
        </div>
      </div>

      <PlayerHeader dna={dna} />

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card eyebrow={`SPELARPROFIL · ${dna.season.competition}`} title="DNA-RADAR">
          <SpiderRadar layers={dna.radar} />
        </Card>

        <Card eyebrow="FORMKURVA" title="MOMENTUM">
          <MomentumChart ratings={dna.ratings} />
          <div className="mt-4">
            <h3 className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-muted">
              HEATMAP · xT-VIKTAD
            </h3>
            <HeatMap points={dna.heat} />
          </div>
        </Card>
      </div>

      <StatsRow stats={dna.season} />
      <WCPrognosis dna={dna} />

      <div className="mt-8 text-center font-mono text-[10px] tracking-widest text-muted">
        SPELARDNA · DATA: FOOTBALL-DATA.ORG / FOTMOB / FOOTYSTATS · KONCEPT AV MOHAMED
      </div>
    </main>
  );
}
