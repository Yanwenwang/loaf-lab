type ComingSoonPageProps = {
  title: string
}

export const ComingSoonPage = ({ title }: ComingSoonPageProps) => {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#F5F0E8] px-6 text-center">
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#C4813A]" style={{ fontFamily: 'DM Mono, monospace' }}>
          Coming soon
        </p>
        <h1 className="text-4xl text-[#1C1A17] md:text-5xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          {title}
        </h1>
      </div>
    </main>
  );
};
