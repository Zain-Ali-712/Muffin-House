"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDownIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { AddButton } from "@/components/cart/AddButton";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { getItem, priceLabel } from "@/lib/menu";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Each slide is an official photo, background removed. Names are from the captions that posted them. */
const SLIDES = [
  { id: "box-6", label: "Brioche donuts, filled fresh", src: "/img/cut/tower.webp", w: 435, h: 853, bg: "#f9c9de", ring: "#fdeff5", tilt: -4 },
  { id: "boston-cream", label: "Boston Cream", src: "/img/cut/boston.webp", w: 467, h: 794, bg: "#fae0a0", ring: "#fdf6e2", tilt: 5 },
  { id: "jumbo-nutella", label: "Jumbo Nutella", src: "/img/cut/nutella.webp", w: 509, h: 399, bg: "#f5cdc8", ring: "#fcefec", tilt: -6 },
  { id: "smash-beef", label: "Smash Beef Burger", src: "/img/cut/smash.webp", w: 1000, h: 733, bg: "#e1cdf3", ring: "#f6effc", tilt: 3 },
] as const;

const RING_TEXT = "FILLED · FLAWLESS · FEARLESSLY LUXURIOUS · HANDCRAFTED IN LAHORE · ";

/** Confetti strokes like the ones around the logo. */
const SPRINKLES = [
  { x: "8%", y: "18%", r: 24, c: "var(--butter)", d: 0 },
  { x: "86%", y: "12%", r: -30, c: "var(--grape)", d: 0.4 },
  { x: "92%", y: "58%", r: 60, c: "var(--surface)", d: 0.8 },
  { x: "4%", y: "70%", r: -50, c: "var(--pink-deep)", d: 1.2 },
  { x: "70%", y: "90%", r: 15, c: "var(--butter)", d: 1.6 },
  { x: "24%", y: "92%", r: 80, c: "var(--grape)", d: 2 },
];

export function Hero() {
  const reduce = useReducedMotionSafe();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const slide = SLIDES[i];
  const item = getItem(slide.id)!;

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), 4200);
    return () => clearTimeout(t);
  }, [i, paused, reduce]);

  // Scroll: the stage sinks and grows while the copy lifts away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const go = (d: number) => setI((n) => (n + d + SLIDES.length) % SLIDES.length);

  return (
    <motion.section
      id="top"
      ref={ref}
      aria-label="The Muffin House"
      animate={{ backgroundColor: slide.bg }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate overflow-hidden pt-[4.5rem]"
      style={{ backgroundColor: SLIDES[0].bg }}
    >
      <div aria-hidden className="sprinkles absolute inset-0 -z-10 opacity-45" />

      <div className="container-x grid min-h-[calc(100svh-4.5rem)] items-center gap-6 pt-6 pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-10">
        <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }} className="relative z-10 max-lg:text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow !text-ink">
            Model Town A Block · Lahore
          </motion.p>
          <h1 className="display mt-4 text-[clamp(2.7rem,6.2vw,5.4rem)] text-ink">
            {["Luxury you"].map((w, k) => (
              <motion.span
                key={w}
                className="block whitespace-nowrap"
                initial={{ opacity: 0, y: "0.4em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + k * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className="block whitespace-nowrap text-surface [text-shadow:0_3px_0_var(--ink)]"
              initial={{ opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 14 }}
            >
              <span className="text-ink">can</span> taste.
            </motion.span>
          </h1>
          <p className="mx-auto mt-6 max-w-[40ch] text-lg text-ink/80 lg:mx-0">{SITE.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3 max-lg:justify-center">
            <a href="#menu" className="btn btn-ink">
              Order online
            </a>
            <a href="#story" className="btn btn-ghost !border-ink/30 !bg-surface/40">
              Our story <ArrowDownIcon className="size-4" aria-hidden />
            </a>
          </div>
        </motion.div>

        {/* Product stage */}
        <motion.div
          style={reduce ? undefined : { y: stageY, scale: stageScale }}
          className="relative mx-auto aspect-square w-full max-w-[min(28rem,78vw)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* plate */}
          <motion.div aria-hidden animate={{ backgroundColor: slide.ring }} transition={{ duration: 0.9 }} className="absolute inset-[9%] rounded-full shadow-[inset_0_-18px_40px_rgb(58_21_48/0.12),0_40px_80px_-40px_rgb(58_21_48/0.55)]" />
          {/* spinning motto ring */}
          <svg aria-hidden viewBox="0 0 500 500" className="spin-slow absolute inset-0 size-full">
            <defs>
              <path id="ring" d="M250,250 m-226,0 a226,226 0 1,1 452,0 a226,226 0 1,1 -452,0" />
            </defs>
            <text className="fill-ink font-sans text-[19px] font-semibold tracking-[0.32em]">
              <textPath href="#ring" textLength="1405" lengthAdjust="spacing">{RING_TEXT}</textPath>
            </text>
          </svg>
          {SPRINKLES.map((s, k) => (
            <motion.span
              key={k}
              aria-hidden
              className="absolute block h-2.5 w-7 rounded-full"
              style={{ left: s.x, top: s.y, background: s.c, rotate: s.r }}
              animate={reduce ? undefined : { y: [0, -14, 0], rotate: [s.r, s.r + 25, s.r] }}
              transition={{ duration: 5, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
            />
          ))}

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={slide.id}
              className="absolute inset-[19%] grid place-items-center"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: slide.tilt - 30, y: 60 }}
              animate={{ opacity: 1, scale: 1, rotate: slide.tilt, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, rotate: slide.tilt + 25, y: -50, transition: { duration: 0.35 } }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
            >
              <div className="bob relative size-full">
                <Image
                  src={slide.src}
                  alt={slide.label}
                  fill
                  priority={i === 0}
                  loading="eager"
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="object-contain drop-shadow-[0_30px_30px_rgb(58_21_48/0.35)]"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* product pill */}
          <div className="absolute inset-x-0 -bottom-3 flex justify-center sm:bottom-2 lg:right-auto lg:-left-6 lg:justify-start">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3 rounded-full bg-surface py-2 pr-2 pl-5 shadow-lift"
              >
                <div className="leading-tight">
                  <p className="font-display text-[1.05rem] font-semibold">{slide.label}</p>
                  <p className="text-xs text-muted-ink tabular-nums">{slide.id === "box-6" ? `Box of 6 · ${priceLabel(item.price)}` : priceLabel(item.price)}</p>
                </div>
                <AddButton id={item.id} name={item.name} compact />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* slide controls */}
      <div className="container-x absolute inset-x-0 bottom-5 hidden items-center justify-end gap-2 lg:flex">
        <button type="button" onClick={() => go(-1)} className="icon-btn bg-surface/50 hover:bg-surface" aria-label="Previous product">
          <CaretLeftIcon className="size-5" aria-hidden />
        </button>
        <div className="flex gap-1.5" role="tablist" aria-label="Featured products">
          {SLIDES.map((s, k) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={s.label}
              onClick={() => setI(k)}
              className={cn("h-2 rounded-full bg-ink/30 transition-all", k === i ? "w-8 bg-ink" : "w-2 hover:bg-ink/60")}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} className="icon-btn bg-surface/50 hover:bg-surface" aria-label="Next product">
          <CaretRightIcon className="size-5" aria-hidden />
        </button>
      </div>
      <div className="flex justify-center gap-1.5 pb-6 lg:hidden" aria-hidden>
        {SLIDES.map((s, k) => (
          <button key={s.id} type="button" tabIndex={-1} onClick={() => setI(k)} className={cn("h-2 rounded-full bg-ink/30 transition-all", k === i ? "w-8 bg-ink" : "w-2")} />
        ))}
      </div>
    </motion.section>
  );
}
