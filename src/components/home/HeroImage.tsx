type HeroImageProps = {
  loafPhoto: string
}

export const HeroImage = ({ loafPhoto }: HeroImageProps) => {
  return (
    <section id="gallery" className="relative h-[50vh] lg:h-auto">
      <img
        src={loafPhoto}
        alt="Fresh baked sourdough loaf"
        className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
      />
    </section>
  );
};

