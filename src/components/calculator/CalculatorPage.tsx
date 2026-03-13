import { useMemo, useState } from 'react'
import './calculator.css'

export const CalculatorPage = () => {
  const [totalDoughWeight, setTotalDoughWeight] = useState(900)
  const [targetHydration, setTargetHydration] = useState(75)
  const [freshMilledPercent, setFreshMilledPercent] = useState(30)

  const output = useMemo(() => {
    const saltPercent = 2
    const hydrationBoost = freshMilledPercent * 0.06
    const effectiveHydration = targetHydration + hydrationBoost

    const hydrationRatio = effectiveHydration / 100
    const saltRatio = saltPercent / 100
    const flour = totalDoughWeight / (1 + hydrationRatio + saltRatio)
    const water = flour * hydrationRatio
    const salt = flour * saltRatio

    return {
      hydrationBoost,
      effectiveHydration,
      flour,
      water,
      salt,
    }
  }, [freshMilledPercent, targetHydration, totalDoughWeight])

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#F5F0E8] px-6 py-12 md:px-12 md:py-20 lg:px-16">
      <section className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
        <article className="pr-0 lg:pr-5">
          <h1 className="text-[28px] leading-snug text-[#1C1A17]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Precise ratios for <em className="italic text-[#C4813A]">every flour,</em> every bake.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#6B6560]">
            Fresh milled whole wheat behaves differently than bread flour. This calculator accounts for flour type, absorption
            rates, and starter hydration — so your math is always right.
          </p>
        </article>

        <aside className="border border-[#C4813A33] bg-[#FAF7F2] p-6 md:p-10">
          <h2 className="mb-7 text-[26px] text-[#1C1A17]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Dough Calculator
          </h2>

          <div className="flex items-center justify-between border-b border-[#C4813A1F] py-3.5">
            <span className="text-[13px] tracking-tight text-[#6B6560]">Total dough weight</span>
            <span className="text-base font-medium text-[#8B5A2B]" style={{ fontFamily: 'DM Mono, monospace' }}>
              {totalDoughWeight}g
            </span>
          </div>
          <input
            aria-label="Total dough weight"
            type="range"
            min={400}
            max={2000}
            value={totalDoughWeight}
            onChange={(event) => setTotalDoughWeight(Number(event.target.value))}
            className="calc-slider mt-3"
          />

          <div className="mt-5 flex items-center justify-between border-b border-[#C4813A1F] py-3.5">
            <span className="text-[13px] tracking-tight text-[#6B6560]">Target hydration</span>
            <span className="text-base font-medium text-[#8B5A2B]" style={{ fontFamily: 'DM Mono, monospace' }}>
              {targetHydration}%
            </span>
          </div>
          <input
            aria-label="Target hydration"
            type="range"
            min={60}
            max={95}
            value={targetHydration}
            onChange={(event) => setTargetHydration(Number(event.target.value))}
            className="calc-slider mt-3"
          />

          <div className="mt-5 flex items-center justify-between border-b border-[#C4813A1F] py-3.5">
            <span className="text-[13px] tracking-tight text-[#6B6560]">Fresh milled %</span>
            <span className="text-base font-medium text-[#8B5A2B]" style={{ fontFamily: 'DM Mono, monospace' }}>
              {freshMilledPercent}%
            </span>
          </div>
          <input
            aria-label="Fresh milled percent"
            type="range"
            min={0}
            max={100}
            value={freshMilledPercent}
            onChange={(event) => setFreshMilledPercent(Number(event.target.value))}
            className="calc-slider mt-3"
          />

          <div className="mt-6 bg-[#1C1A17] p-5 text-[#F5F0E8]">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#E8C98A]" style={{ fontFamily: 'DM Mono, monospace' }}>
              Formula output
            </p>
            <p className="text-[36px] text-[#E8C98A]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Flour: {Math.round(output.flour)}g
            </p>

            <div className="mt-[2px] grid grid-cols-2 gap-[2px]">
              <div className="bg-[#1C1A17] px-5 py-3.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#E8C98A]" style={{ fontFamily: 'DM Mono, monospace' }}>
                  Water
                </p>
                <p className="text-[26px] text-[#E8C98A]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  {Math.round(output.water)}g
                </p>
              </div>
              <div className="bg-[#1C1A17] px-5 py-3.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#E8C98A]" style={{ fontFamily: 'DM Mono, monospace' }}>
                  Salt
                </p>
                <p className="text-[26px] text-[#E8C98A]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  {Math.round(output.salt)}g
                </p>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-[#F5F0E8CC]" style={{ fontFamily: 'DM Mono, monospace' }}>
              Effective hydration: {output.effectiveHydration.toFixed(1)}% (+{output.hydrationBoost.toFixed(1)}% absorption adjustment)
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}
