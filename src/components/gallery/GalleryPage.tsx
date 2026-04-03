import photo01 from '../../assets/images/gallery_img_01.jpg';
import photo01WebP from '../../assets/images/gallery_img_01.jpg?w=480;960;1200&format=webp&as=srcset';
import photo02 from '../../assets/images/gallery_img_02.jpg';
import photo02WebP from '../../assets/images/gallery_img_02.jpg?w=480;960&format=webp&as=srcset';
import photo03 from '../../assets/images/gallery_img_03.jpg';
import photo03WebP from '../../assets/images/gallery_img_03.jpg?w=480;960&format=webp&as=srcset';
import photo04 from '../../assets/images/gallery_img_04.jpg';
import photo04WebP from '../../assets/images/gallery_img_04.jpg?w=480;960&format=webp&as=srcset';
import photo05 from '../../assets/images/gallery_img_05.jpg';
import photo05WebP from '../../assets/images/gallery_img_05.jpg?w=480;960&format=webp&as=srcset';

type GalleryItem = {
  title: string;
  meta: string;
  imageSrc: string;
  imageSrcSetWebP: string;
  width: number;
  height: number;
  featured?: boolean;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: 'Hard Red Wheat, 75% Hydration',
    meta: 'Feb 2026 · Open crumb · 18hr cold retard',
    imageSrc: photo01,
    imageSrcSetWebP: photo01WebP,
    width: 4032,
    height: 3024,
    featured: true,
  },
  {
    title: 'Einkorn Blend',
    meta: 'Jan 2026 · 65% hydration',
    imageSrc: photo02,
    imageSrcSetWebP: photo02WebP,
    width: 3108,
    height: 3885,
  },
  {
    title: '100% Whole Wheat',
    meta: 'Dec 2025 · 75% hydration',
    imageSrc: photo03,
    imageSrcSetWebP: photo03WebP,
    width: 3943,
    height: 5257,
  },
  {
    title: 'Hard White + Spelt',
    meta: 'Nov 2025 · 80% hydration',
    imageSrc: photo04,
    imageSrcSetWebP: photo04WebP,
    width: 2261,
    height: 2826,
  },
  {
    title: '40% whole wheat',
    meta: 'Nov 2025 · 80% hydration',
    imageSrc: photo05,
    imageSrcSetWebP: photo05WebP,
    width: 2978,
    height: 3723,
  },
];

export const GalleryPage = () => {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#1C1A17] px-6 py-12 md:px-12 md:py-20 lg:px-16">
      <section className="mx-auto w-full max-w-6xl">
        <p className="section-label-dark mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#E8C98A]">
          The Bake Log
        </p>

        <h1 className="mb-5 font-display text-[40px] leading-tight tracking-tight text-[#F5F0E8]">
          Baked with <em className="italic text-[#E8C98A]">love</em> by Yanwen
        </h1>
        <p className="mb-12 max-w-[520px] text-[15px] leading-loose text-[#F5F0E8A6]">
          A visual journal of my sourdough journey — flour blends, hydration experiments, and lessons learned from every bake.
        </p>

        <div className="grid grid-cols-1 gap-[3px] bg-[#3D342C] md:grid-cols-[2fr_1fr_1fr] md:grid-rows-[280px_280px]">
          {GALLERY_ITEMS.map((item) => {
            const isFeatured = item.featured === true;

            return (
              <article
                key={item.title}
                className={`group relative overflow-hidden bg-[#2A2620] ${isFeatured ? 'md:row-span-2' : ''}`}
                aria-label={item.title}
              >
                <picture>
                  <source srcSet={item.imageSrcSetWebP} type="image/webp" sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    className="h-full w-full object-cover"
                    loading={isFeatured ? 'eager' : 'lazy'}
                  />
                </picture>

                <div className="gallery-overlay-gradient absolute bottom-0 left-0 right-0 p-5 opacity-100 transition-opacity duration-200 group-hover:opacity-100 md:opacity-0">
                  <h2 className="font-display text-base text-[#F5F0E8]">{item.title}</h2>
                  <p className="font-mono text-[11px] text-[#E8C98A]">{item.meta}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};
