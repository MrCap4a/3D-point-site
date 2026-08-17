"use client";

import { useState } from "react";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PortfolioModal } from "@/components/portfolio/PortfolioModal";
import type { PortfolioCaseData } from "@/lib/portfolio";

export function PortfolioGrid({ items }: { items: PortfolioCaseData[] }) {
  const [selected, setSelected] = useState<PortfolioCaseData | null>(null);

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <PortfolioCard key={item.id} item={item} onOpen={setSelected} />
        ))}
      </div>

      {selected && <PortfolioModal item={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
