import { ClockIcon, InstagramLogoIcon, MapPinIcon, PackageIcon, PhoneIcon, ShoppingBagOpenIcon, StorefrontIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { SITE, telHref } from "@/lib/site";

const WHY = [
  { icon: ShoppingBagOpenIcon, tint: "bg-pink-soft", title: "No busy line", body: "Build the order yourself, see the total, send it in one tap. No waiting on hold." },
  { icon: StorefrontIcon, tint: "bg-butter-soft", title: "Pickup or delivery", body: "Collect from Model Town A Block or have it brought to your door." },
  { icon: ClockIcon, tint: "bg-[#efe4f8]", title: "Your time, not ours", body: "Pick a time and your donuts are filled and boxed for it, still soft." },
  { icon: PackageIcon, tint: "bg-[#fbe6dc]", title: "Boxes for a crowd", body: "Mix six or twelve flavours and leave a note for birthdays and offices." },
];

const STEPS = ["Add to cart", "Choose pickup or delivery and a time", "The shop calls to confirm, then it’s boxed fresh"];

export function Visit() {
  return (
    <section id="visit" aria-labelledby="why-h" className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">Why order online</p>
            <h2 id="why-h" className="display mt-4 text-[clamp(2.6rem,5.4vw,4.4rem)]">
              Skip the call. <span className="text-pink-deep">Keep the craving.</span>
            </h2>
            <p className="mt-5 max-w-[42ch] text-lg text-ink-soft">
              Pick your flavours on your phone, choose when you want them, and the shop calls back once to confirm. No hold music, no wrong orders.
            </p>
            <a href="#menu" className="btn btn-primary mt-8">
              Start your order
            </a>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2">
            {WHY.map((w, k) => (
              <Reveal
                as="li"
                key={w.title}
                delay={k * 0.07}
                className={`group relative overflow-hidden rounded-[1.75rem] p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 ${w.tint}`}
              >
                <span aria-hidden className="absolute -right-2 -bottom-6 font-display text-[7rem] leading-none font-semibold text-ink/[0.06] tabular-nums">
                  0{k + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-full bg-surface text-pink-deep shadow-soft transition-transform duration-500 group-hover:rotate-[-8deg]">
                  <w.icon className="size-6" weight="duotone" aria-hidden />
                </span>
                <h3 className="relative mt-6 font-display text-xl font-semibold">{w.title}</h3>
                <p className="relative mt-1.5 max-w-[30ch] text-sm text-ink-soft">{w.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mt-10">
          <ol aria-label="How it works" className="flex flex-col gap-3 rounded-[1.5rem] border border-line bg-surface px-5 py-4 md:flex-row md:items-center md:gap-0 md:rounded-full md:px-3 md:py-2.5">
            <li className="hidden shrink-0 rounded-full bg-ink px-4 py-2 text-xs font-semibold tracking-[0.14em] text-surface uppercase md:block">How it works</li>
            {STEPS.map((s, k) => (
              <li key={s} className="flex flex-1 items-center gap-3 md:px-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-pink-soft text-sm font-semibold text-pink-ink tabular-nums">{k + 1}</span>
                <span className="text-sm text-ink-soft">{s}</span>
                {k < STEPS.length - 1 && <span aria-hidden className="ml-auto hidden h-px w-8 bg-line lg:block" />}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-24 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col rounded-[1.75rem] bg-pink p-8 md:p-10">
            <p className="eyebrow !text-ink">Visit & contact</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4rem)]">Come by the shop.</h2>
            <dl className="mt-8 grid gap-6 text-ink">
              <div className="flex gap-4">
                <MapPinIcon className="mt-0.5 size-6 shrink-0" weight="duotone" aria-hidden />
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="text-lg font-medium">{SITE.address}</dd>
                  <dd className="text-ink/75">{SITE.landmark}</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <PhoneIcon className="mt-0.5 size-6 shrink-0" weight="duotone" aria-hidden />
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <a href={telHref(SITE.phone)} className="text-lg font-medium link-underline tabular-nums">
                      {SITE.phone}
                    </a>
                  </dd>
                  <dd className="text-ink/75">Orders and enquiries</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <InstagramLogoIcon className="mt-0.5 size-6 shrink-0" weight="duotone" aria-hidden />
                <div>
                  <dt className="sr-only">Instagram</dt>
                  <dd>
                    <a href={SITE.instagram} target="_blank" rel="noreferrer" className="text-lg font-medium link-underline">
                      {SITE.instagramHandle}
                    </a>
                  </dd>
                  <dd className="text-ink/75">Fresh stock and offers, posted first</dd>
                </div>
              </div>
            </dl>
            <div className="mt-auto flex flex-wrap gap-3 pt-10">
              <a href={telHref(SITE.phone)} className="btn btn-ink">
                <PhoneIcon className="size-4" aria-hidden /> Call the shop
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`} target="_blank" rel="noreferrer" className="btn btn-ghost !border-ink/30">
                Get directions
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-muted">
            <iframe
              title="Map of Model Town A Block, Lahore"
              src={`https://maps.google.com/maps?q=${encodeURIComponent("A Block, Model Town, Lahore, Pakistan")}&z=16&output=embed`}
              className="absolute inset-0 size-full border-0 saturate-[0.7]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
