import { Link } from 'react-router-dom';

export const HeroContent = () => {
  return (
    <section id="advisor" className="relative flex min-h-[420px] flex-col justify-center px-[48px] py-10 md:px-[64px] md:py-12 lg:min-h-full">
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-px bg-gradient-to-b from-transparent via-[#c4813a4d] to-transparent lg:block" />

      <div className="md:-translate-y-8">
        <p
          className="mb-6 flex items-center gap-[10px] text-[11px] uppercase tracking-[0.2em] text-[#C4813A]"
          style={{ fontFamily: 'DM Mono, monospace', fontWeight: 400 }}
        >
          <span className="inline-block h-px w-6 bg-[#C4813A]" />
          AI-powered sourdough advisor
        </p>

        <h1
          className="max-w-[560px] leading-[1.1] tracking-[-1px] text-[#1C1A17]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, fontSize: 'clamp(44px, 5vw, 72px)' }}
        >
          Bake with
          <br />
          <em className="italic text-[#C4813A]" style={{ fontWeight: 400 }}>
            intention,
          </em>
          <br />
          not guesswork.
        </h1>

        <p className="mb-12 mt-6 max-w-[420px] text-[16px] leading-[1.7] text-[#6B6560]" style={{ fontWeight: 300 }}>
          A personal sourdough advisor trained on real baking knowledge — fresh milled flour, wild fermentation, and the craft behind every loaf.
        </p>

        <div className="flex w-full max-w-[360px] flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-center">
          <Link
            to="/advisor"
            className="w-full bg-[#8B5A2B] px-8 py-[14px] text-center text-[14px] font-normal tracking-[0.05em] text-[#F5F0E8] transition hover:bg-[#1C1A17] sm:w-auto"
          >
            Ask the Advisor →
          </Link>
          <Link
            to="/gallery"
            className="w-full border border-[#C4813A] bg-transparent px-7 py-[13px] text-center text-[14px] font-normal tracking-[0.05em] text-[#8B5A2B] transition hover:bg-[#EDE8DF] sm:w-auto"
          >
            See the Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

