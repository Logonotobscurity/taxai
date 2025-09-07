import Image from 'next/image';

const techLogos = [
  { name: 'Next.js', src: 'https://picsum.photos/100/40' },
  { name: 'React', src: 'https://picsum.photos/100/40' },
  { name: 'Tailwind CSS', src: 'https://picsum.photos/100/40' },
  { name: 'Firebase', src: 'https://picsum.photos/100/40' },
  { name: 'AWS', src: 'https://picsum.photos/100/40' },
  { name: 'Google Cloud', src: 'https://picsum.photos/100/40' },
  { name: 'Node.js', src: 'https://picsum.photos/100/40' },
  { name: 'TypeScript', src: 'https://picsum.photos/100/40' },
];

export function TechStackCarouselSection() {
  return (
    <section className="py-12">
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
        }}
      >
        <div className="flex w-max animate-infinite-scroll">
          {[...techLogos, ...techLogos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 w-40 flex justify-center items-center mx-4">
              <Image src={logo.src} width={100} height={40} alt={logo.name} data-ai-hint="logo tech" className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
