import Image from "next/image";
import { InstagramLogoIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { SITE, telHref } from "@/lib/site";
import { NAV } from "@/lib/nav";

const SOCIALS = [
  { href: SITE.instagram, label: `Instagram ${SITE.instagramHandle}`, icon: InstagramLogoIcon, external: true },
  { href: telHref(SITE.phone), label: `Call ${SITE.phone}`, icon: PhoneIcon, external: false },
  { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`, label: "Open in Google Maps", icon: MapPinIcon, external: true },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-surface">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-[1.5rem] bg-surface p-3">
            <Image src="/img/brand/logo.webp" alt="The Muffin House" width={499} height={520} className="h-20 w-auto" />
          </div>
          <p className="mt-6 max-w-[34ch] font-display text-2xl text-pink">{SITE.motto}</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow !text-surface/60">Explore</p>
          <ul className="mt-4 grid gap-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-underline text-surface/85 hover:text-surface">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow !text-surface/60">Find us</p>
          <p className="mt-4 text-surface/85">{SITE.address}</p>
          <a href={telHref(SITE.phone)} className="mt-2 inline-block link-underline tabular-nums">
            {SITE.phone}
          </a>
          <ul className="mt-6 flex gap-2" aria-label="Social and contact">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="grid size-11 place-items-center rounded-full bg-surface/10 transition-colors hover:bg-pink hover:text-ink"
                >
                  <s.icon className="size-5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-wrap justify-between gap-3 border-t border-surface/10 py-6 text-sm text-surface/55">
        <p>© 2026 The Muffin House, Lahore</p>
        <p>Ordering on this site is a demo. Nothing is sent to the shop.</p>
      </div>
    </footer>
  );
}
