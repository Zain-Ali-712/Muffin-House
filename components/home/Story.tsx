import Image from "next/image";
import { CookieIcon, DropIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollMarquee } from "@/components/motion/ScrollMarquee";
import { MENU } from "@/lib/menu";
import { SITE } from "@/lib/site";

// Copy below is from the Wix site's "About Us" and "Why Us" blocks.
const ADVANTAGES = [
  { icon: DropIcon, title: "Unique fillings", body: "We prioritize extraordinary fillings and exceptional flavors in every donut we create." },
  { icon: CookieIcon, title: "Irresistible flavors", body: "Explore a new realm of donut flavors with our inventive recipes." },
  { icon: SparkleIcon, title: "Sophisticated presentation", body: "Every donut is a piece of edible art designed to show off your status." },
];

const FLAVOURS = MENU[0].items.map((i) => i.name);

export function Story() {
  return (
    <>
      <div className="bg-ink py-6 text-pink">
        <ScrollMarquee label="Donut flavours" speed={40} className="[&_.btn]:hidden">
          {FLAVOURS.map((f) => (
            <span key={f} className="flex shrink-0 items-center gap-6 pr-6 font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium">
              {f}
              <span aria-hidden className="block h-2.5 w-6 rotate-[30deg] rounded-full bg-butter" />
            </span>
          ))}
        </ScrollMarquee>
      </div>

      <section id="story" aria-labelledby="story-h" className="relative py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-xl">
            <div className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-[1.75rem] bg-muted">
              <Image src="/img/photo/story-donuts.webp" alt="Sugar-dusted Muffin House donuts filled with Oreo cookie cream" fill quality={85} sizes="(min-width: 1024px) 500px, 82vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-2 w-[38%] rotate-[-5deg] overflow-hidden rounded-[1.25rem] border-[6px] border-surface bg-surface shadow-lift sm:-left-8">
              <div className="relative aspect-[464/644]">
                <Image src="/img/photo/chef.webp" alt="Arslan, owner and master chef of The Muffin House" fill sizes="220px" className="object-cover" />
              </div>
              <p className="px-1 pt-2 pb-1 text-center font-display text-sm">“The Muffin Man”</p>
            </div>
            <div className="absolute -top-6 -right-2 grid size-28 rotate-12 place-items-center rounded-full bg-butter text-center font-display text-sm leading-tight font-semibold shadow-soft sm:-right-6 sm:size-32">
              Trained in
              <br />
              Malaysia
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">Our story</p>
              <h2 id="story-h" className="display mt-4 text-[clamp(2.6rem,6vw,4.8rem)]">
                Made for those who appreciate the <span className="text-pink-deep">finer things.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[58ch] text-lg text-ink-soft">
                Welcome to The Muffin House, where Lahore’s elite indulge in richly filled donuts, hand-tossed artisan pizza, and an experience made for those who
                appreciate the finer things. We take pride in creating high-end donuts using the finest ingredients.
              </p>
              <p className="mt-4 max-w-[58ch] text-ink-soft">
                Your satisfaction is the priority of our Master Chef and owner, Arslan Kahn. Arslan trained in Malaysia for many years and studied at COTHM College
                here in Lahore. He is endearingly known as <span className="font-medium text-ink">“The Muffin Man”</span>.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="container-x mt-28">
          <Reveal>
            <p className="display max-w-[22ch] text-[clamp(2rem,4.4vw,3.4rem)]">
              You’ve earned your place at the top. Shouldn’t your dessert say the same?
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {ADVANTAGES.map((a, k) => (
              <Reveal as="li" key={a.title} delay={k * 0.08} className="rounded-[1.75rem] bg-surface p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-full bg-pink-soft text-pink-deep">
                  <a.icon className="size-6" weight="duotone" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold">{a.title}</h3>
                <p className="mt-2 text-ink-soft">{a.body}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-center font-display text-xl text-pink-ink">{SITE.motto}</p>
        </div>
      </section>
    </>
  );
}
