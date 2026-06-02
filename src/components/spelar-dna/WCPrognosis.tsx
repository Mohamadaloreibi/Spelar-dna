import type { PlayerDNA } from "@/lib/types";

interface Props {
  dna: PlayerDNA;
  prognosis?: string;
}

export function WCPrognosis({ dna, prognosis }: Props) {
  if (!dna.worldCup) return null;

  const fallback = `Går in i turneringen med ${dna.season.goals} mål och ${dna.season.assists} assists i ${dna.season.appearances} matcher — snittbetyg ${dna.season.avgRating}. ${dna.meta.name} är ett tydligt X-faktor-val för ${dna.worldCup.team} i grupp ${dna.worldCup.group}.`;

  return (
    <div className="mt-4 rounded-xl border border-line border-l-4 border-l-[#ffc400] bg-gradient-to-br from-card to-card-2 p-5">
      <h3 className="mb-2 font-mono text-[11px] tracking-widest text-[#ffc400]">
        ▸ VM-PROGNOS · {dna.worldCup.team.toUpperCase()}
      </h3>
      <p className="text-[13px] leading-relaxed text-text">{prognosis ?? fallback}</p>
    </div>
  );
}
