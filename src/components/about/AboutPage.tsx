import aboutPhoto from '../../assets/images/about_img.jpg';
import aboutPhotoWebP from '../../assets/images/about_img.jpg?w=480;960;1440&format=webp&as=srcset';

const ABOUT_PARAGRAPHS = [
  "I'm a software engineer who debugs bread.",
  'What started as a weekend sourdough hobby slowly turned into a mini science project — tracking dough temperature, hydration levels, fermentation timing, and crumb structure. Trying to figure out why some loaves turned out amazing and others... not so much.',
  'At some point I realized: small variables change everything, the best way to learn is through iteration, and I was basically doing engineering with flour and water.',
  'So I built Loaf Lab.',
  "When I'm not coding, I'm usually in the kitchen milling wheat berries, feeding my starter, or sharing loaves with neighbors and friends.",
];

export const AboutPage = () => {
  return (
    <main className="grid min-h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-2">
      <section className="relative flex flex-col justify-center bg-[#F5F0E8] px-6 py-12 md:px-12 md:py-20 lg:px-16">
        <h1 className="mb-8 font-display text-[40px] leading-tight tracking-tight text-[#1C1A17]">
          Hi, I&apos;m <em className="italic text-[#C4813A]">Yanwen.</em>
        </h1>

        <div className="space-y-5">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="max-w-[460px] text-[15px] leading-[1.9] text-[#6B6560]">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-8 max-w-[460px] border-t border-[#C4813A26] pt-6 text-[14px] text-[#6B6560B3]">
          Thanks for stopping by. Loaf Lab is a small window into how I like to think, build, and learn. ♡
        </p>
      </section>

      <section className="relative overflow-hidden bg-[#1C1A17]">
        <picture>
          <source srcSet={aboutPhotoWebP} type="image/webp" sizes="(max-width: 1023px) 100vw, 50vw" />
          <img src={aboutPhoto} alt="Cat inspecting a sourdough loaf" width={3024} height={3780} className="h-full w-full object-cover object-[center_30%]" loading="lazy" />
        </picture>
        <div className="gallery-overlay-gradient absolute bottom-0 left-0 right-0 px-8 py-6">
          <p className="font-mono text-[11px] tracking-wide text-[#E8C98ACC]">Official loaf inspector</p>
        </div>
      </section>
    </main>
  );
};
