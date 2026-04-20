import { useMemo, useState } from 'react';
import './calculator.css';

const SALT_PERCENT = 2;
const FRESH_MILLED_HYDRATION_BOOST_PER_PERCENT = 0.06;

export const CalculatorPage = () => {
  const [totalDoughWeight, setTotalDoughWeight] = useState(900);
  const [targetHydration, setTargetHydration] = useState(75);
  const [freshMilledPercent, setFreshMilledPercent] = useState(30);

  const output = useMemo(() => {
    // House assumption: fixed 2% salt and hydration bump for fresh-milled flour absorption.
    const hydrationBoost = freshMilledPercent * FRESH_MILLED_HYDRATION_BOOST_PER_PERCENT;
    const effectiveHydration = targetHydration + hydrationBoost;

    const hydrationRatio = effectiveHydration / 100;
    const saltRatio = SALT_PERCENT / 100;
    const flour = totalDoughWeight / (1 + hydrationRatio + saltRatio);
    const water = flour * hydrationRatio;
    const salt = flour * saltRatio;

    return {
      hydrationBoost,
      effectiveHydration,
      flour,
      water,
      salt,
    };
  }, [freshMilledPercent, targetHydration, totalDoughWeight]);

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#F5F0E8] px-6 py-12 md:px-12 md:py-20 lg:px-16">
      <section className="mx-auto w-full max-w-6xl">
        <p className="calculator-section-label mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#C4813A]">
          Hydration Calculator
        </p>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <article className="pr-0 lg:pr-5">
            <h1 className="font-display text-[28px] leading-[1.4] text-[#1C1A17]">
              Precise ratios for <em className="italic text-[#C4813A]">every flour,</em> every bake.
            </h1>
            <p className="mt-4 font-sans text-[14px] leading-[1.7] text-[#6B6560]">
              Fresh milled whole wheat behaves differently than bread flour. This calculator accounts for flour type, absorption
              rates, and starter hydration — so your math is always right.
            </p>
          </article>

          <aside className="border border-[#C4813A33] bg-[#FAF7F2] p-6 md:p-10">
            <h2 className="mb-7 font-display text-[26px] text-[#1C1A17]">Dough Calculator</h2>

            <div className="group">
              <div className="flex items-center justify-between py-3.5">
                <span className="text-[13px] tracking-tight text-[#6B6560]">
                  Total dough weight
                  <span className="ml-1 font-mono text-[10px] text-[#6B6560B3] opacity-0 transition-opacity group-focus-within:opacity-100">(300 – 2500g)</span>
                </span>
                <span className="flex items-baseline">
                  <input
                    aria-label="Total dough weight"
                    type="number"
                    min={300}
                    max={2500}
                    step={1}
                    value={totalDoughWeight}
                    onChange={(e) => {
                      if (e.target.value.length > 4) return;
                      const v = Number(e.target.value);
                      if (!isNaN(v)) setTotalDoughWeight(v);
                    }}
                    onBlur={() => setTotalDoughWeight(Math.min(2500, Math.max(300, totalDoughWeight)))}
                    className="calc-number-input calc-number-input--weight"
                  />
                  <span className="ml-1 font-sans text-[11px] font-light text-[#6B6560]">g</span>
                </span>
              </div>
              <input
                aria-label="Total dough weight slider"
                type="range"
                min={300}
                max={2500}
                value={totalDoughWeight}
                onChange={(event) => setTotalDoughWeight(Number(event.target.value))}
                className="calc-slider"
              />
            </div>

            <div className="group mt-5">
              <div className="flex items-center justify-between py-3.5">
                <span className="text-[13px] tracking-tight text-[#6B6560]">
                  Target hydration
                  <span className="ml-1 font-mono text-[10px] text-[#6B6560B3] opacity-0 transition-opacity group-focus-within:opacity-100">(50 – 100%)</span>
                </span>
                <span className="flex items-baseline">
                  <input
                    aria-label="Target hydration"
                    type="number"
                    min={50}
                    max={100}
                    step={1}
                    value={targetHydration}
                    onChange={(e) => {
                      if (e.target.value.length > 3) return;
                      const v = Number(e.target.value);
                      if (!isNaN(v)) setTargetHydration(v);
                    }}
                    onBlur={() => setTargetHydration(Math.min(100, Math.max(50, targetHydration)))}
                    className="calc-number-input calc-number-input--percent"
                  />
                  <span className="ml-1 font-sans text-[11px] font-light text-[#6B6560]">%</span>
                </span>
              </div>
              <input
                aria-label="Target hydration slider"
                type="range"
                min={50}
                max={100}
                value={targetHydration}
                onChange={(event) => setTargetHydration(Number(event.target.value))}
                className="calc-slider"
              />
            </div>

            <div className="group mt-5">
              <div className="flex items-center justify-between py-3.5">
                <span className="text-[13px] tracking-tight text-[#6B6560]">
                  Fresh milled
                  <span className="ml-1 font-mono text-[10px] text-[#6B6560B3] opacity-0 transition-opacity group-focus-within:opacity-100">(0 – 100%)</span>
                </span>
                <span className="flex items-baseline">
                  <input
                    aria-label="Fresh milled percent"
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={freshMilledPercent}
                    onChange={(e) => {
                      if (e.target.value.length > 3) return;
                      const v = Number(e.target.value);
                      if (!isNaN(v)) setFreshMilledPercent(v);
                    }}
                    onBlur={() => setFreshMilledPercent(Math.min(100, Math.max(0, freshMilledPercent)))}
                    className="calc-number-input calc-number-input--percent"
                  />
                  <span className="ml-1 font-sans text-[11px] font-light text-[#6B6560]">%</span>
                </span>
              </div>
              <input
                aria-label="Fresh milled percent slider"
                type="range"
                min={0}
                max={100}
                value={freshMilledPercent}
                onChange={(event) => setFreshMilledPercent(Number(event.target.value))}
                className="calc-slider"
              />
            </div>

            <div data-testid="calculator-output" className="mt-6 overflow-hidden border-t border-[#C4813A33] pt-6">
              <div className="pb-5">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C4813A]">Flour</p>
                <p className="flex min-w-0 items-baseline text-[#1C1A17]">
                  <span className="truncate font-sans text-[44px] font-light tracking-tight">{Math.round(output.flour)}</span>
                  <span className="ml-1.5 shrink-0 font-mono text-sm font-light text-[#6B6560]">g</span>
                </p>
              </div>

              <div className="grid grid-cols-2 border-t border-[#C4813A33]">
                <div className="border-r border-[#C4813A33] py-4 pr-5">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C4813A]">Water</p>
                  <p className="flex min-w-0 items-baseline text-[#1C1A17]">
                    <span className="truncate font-sans text-[28px] font-light tracking-tight">{Math.round(output.water)}</span>
                    <span className="ml-1 shrink-0 font-mono text-xs font-light text-[#6B6560]">g</span>
                  </p>
                </div>
                <div className="py-4 pl-5">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C4813A]">Salt</p>
                  <p className="flex min-w-0 items-baseline text-[#1C1A17]">
                    <span className="truncate font-sans text-[28px] font-light tracking-tight">{Math.round(output.salt)}</span>
                    <span className="ml-1 shrink-0 font-mono text-xs font-light text-[#6B6560]">g</span>
                  </p>
                </div>
              </div>

              <p className="mt-4 border-t border-[#C4813A1A] pt-3 font-mono text-[10px] text-[#6B6560B3]">
                Effective hydration: {output.effectiveHydration.toFixed(1)}% (+{output.hydrationBoost.toFixed(1)}% absorption adjustment)
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};
