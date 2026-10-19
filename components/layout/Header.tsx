"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { PhoneIcon, ShoppingBagIcon } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { useStore } from "@/lib/store";
import { SITE, telHref } from "@/lib/site";
import { NAV } from "@/lib/nav";


export function Header() {
  const { count, setCartOpen, ready } = useStore();
  const { scrollY } = useScroll();
  // Clear over the hero, frosted once the page moves.
  const alpha = useTransform(scrollY, [0, 120], [0, 0.85]);
  const line = useTransform(scrollY, [0, 120], [0, 0.1]);
  const background = useMotionTemplate`rgb(255 250 247 / ${alpha})`;
  const borderColor = useMotionTemplate`rgb(58 21 48 / ${line})`;

  return (
    <motion.header style={{ background, borderColor }} className="fixed inset-x-0 top-0 z-[var(--z-header)] border-b backdrop-blur-md">
      <div className="container-x relative flex h-[4.5rem] items-center gap-2">
        <a href="#top" className="rounded-full" aria-label="The Muffin House, back to top">
          <Logo />
        </a>

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="rounded-full px-3.5 py-2 text-[0.92rem] text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-0.5">
          <a href={telHref(SITE.phone)} className="icon-btn" aria-label={`Call ${SITE.phone}`}>
            <PhoneIcon className="size-[1.3rem]" aria-hidden />
          </a>
          <button type="button" className="icon-btn relative" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}>
            <ShoppingBagIcon className="size-[1.35rem]" aria-hidden />
            {ready && count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute top-1 right-0.5 grid min-w-5 place-items-center rounded-full bg-pink-deep px-1 text-[0.7rem] leading-5 font-semibold text-surface tabular-nums"
                aria-hidden
              >
                {count}
              </motion.span>
            )}
          </button>
          <a href="#menu" className="btn btn-primary ml-2 hidden sm:inline-flex">
            Order now
          </a>
        </div>
      </div>
    </motion.header>
  );
}
