import loafPhoto from '../../assets/images/home-page-loaf.jpg';
import loafPhotoWebP from '../../assets/images/home-page-loaf.jpg?w=480;960;1440&format=webp&as=srcset';

export const HeroImage = () => {
  return (
    <section id="gallery" className="relative h-[50vh] lg:h-auto">
      <picture>
        <source srcSet={loafPhotoWebP} type="image/webp" sizes="(max-width: 1023px) 100vw, 50vw" />
        <img
          src={loafPhoto}
          alt="Fresh baked sourdough loaf"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={4032}
          height={3024}
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
      </picture>
    </section>
  );
};
