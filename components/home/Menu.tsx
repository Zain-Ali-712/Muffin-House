"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AddButton } from "@/components/cart/AddButton";
import { Reveal } from "@/components/motion/Reveal";
import { DonutSwatch } from "@/components/brand/DonutSwatch";
import { MENU, priceLabel, type MenuItem } from "@/lib/menu";
import { cn } from "@/lib/utils";

function ItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-[1.75rem] bg-surface p-3 shadow-soft"
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-pink-soft">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />
        ) : item.swatch ? (
          <div className="sprinkles grid size-full place-items-center bg-pink-soft">
            <DonutSwatch glaze={item.swatch[0]} filling={item.swatch[1]} className="w-[52%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-12" />
          </div>
        ) : null}
        {item.popular && <span className="absolute top-3 left-3 rounded-full bg-butter px-3 py-1 text-xs font-semibold">Customer favourite</span>}
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <h3 className="font-display text-xl leading-tight font-semibold">{item.name}</h3>
        {item.description && <p className="mt-1.5 text-sm text-ink-soft">{item.description}</p>}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="font-medium tabular-nums">{priceLabel(item.price)}</p>
            {item.priceNote && <p className="text-[0.72rem] text-muted-ink">{item.priceNote}</p>}
          </div>
          <AddButton id={item.id} name={item.name} />
        </div>
      </div>
    </motion.li>
  );
}

/** Low card for flavours without their own photo: swatch, name, price, add. */
function CompactCard({ item }: { item: MenuItem }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group flex min-w-0 items-center gap-3 rounded-[1.25rem] bg-surface p-2.5 pr-3 shadow-soft"
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-[0.9rem] bg-pink-soft">
        {item.swatch ? <DonutSwatch glaze={item.swatch[0]} filling={item.swatch[1]} className="size-11 transition-transform duration-500 group-hover:rotate-12" /> : <span className="font-display text-xl font-semibold text-pink-ink">{item.name.charAt(0)}</span>}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="line-clamp-2 block font-display text-[1.02rem] font-semibold">{item.name}</span>
        <span className="text-sm text-muted-ink tabular-nums">{priceLabel(item.price)}</span>
      </span>
      <AddButton id={item.id} name={item.name} compact />
    </motion.li>
  );
}

function PizzaRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex items-center gap-4 py-4">
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl font-semibold">{item.name}</h3>
        {item.description && <p className="text-sm text-ink-soft">{item.description}</p>}
      </div>
      <span className="hidden text-sm text-muted-ink sm:block">{priceLabel(item.price)}</span>
      <AddButton id={item.id} name={`${item.name} pizza`} />
    </li>
  );
}

export function Menu() {
  const [tab, setTab] = useState(MENU[0].id);
  const cat = MENU.find((c) => c.id === tab)!;

  return (
    <section id="menu" aria-labelledby="menu-h" className="relative bg-pink-soft/60 py-24 md:py-32">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The menu</p>
            <h2 id="menu-h" className="display mt-4 text-[clamp(2.6rem,6vw,4.8rem)]">
              Pick it. Box it. <span className="text-pink-deep">Order it.</span>
            </h2>
          </div>
          <p className="max-w-[38ch] text-ink-soft">Add anything to your cart, choose pickup or delivery, and the shop calls you back to confirm.</p>
        </Reveal>

        <div className="sticky top-[4.5rem] z-[var(--z-content)] -mx-4 mt-10 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
          <div role="tablist" aria-label="Menu categories" className="inline-flex gap-1 rounded-full bg-surface p-1 shadow-soft">
            {MENU.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={tab === c.id}
                aria-controls="menu-panel"
                onClick={() => setTab(c.id)}
                className={cn("relative min-h-11 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors sm:px-5", tab === c.id ? "text-surface" : "text-ink-soft hover:text-ink")}
              >
                {tab === c.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">
                  {c.title} <span className="opacity-60 tabular-nums">{c.items.length}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-6">
          <p className="mb-6 max-w-[60ch] text-ink-soft">{cat.blurb}</p>
          {cat.id === "pizza" ? (
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.75rem]">
                  <Image src="/img/photo/pizza.webp" alt="A Muffin House pizza with peppers, tomato and sausage" fill sizes="(min-width: 1024px) 520px, 92vw" className="object-cover" />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-[1.25rem]">
                  <Image src="/img/photo/pizza-2.webp" alt="A Muffin House pizza with a mayo swirl" fill sizes="260px" className="object-cover" />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-[1.25rem]">
                  <Image src="/img/photo/signage.webp" alt="The Muffin House sign above a fresh pizza" fill sizes="260px" className="object-cover" />
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-surface px-6 py-2 shadow-soft">
                <p className="border-b border-line py-4 font-display text-lg text-pink-ink">“Where taste meets title.” Thin crust or pan crust.</p>
                <ul className="divide-y divide-line">
                  {cat.items.map((i) => (
                    <PizzaRow key={i.id} item={i} />
                  ))}
                </ul>
                <p className="pb-4 text-xs text-muted-ink">Sizes and prices were never posted publicly, so the shop confirms them when it calls you back.</p>
              </div>
            </div>
          ) : (
            <>
              <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {cat.items
                    .filter((i) => i.image)
                    .map((i) => (
                      <ItemCard key={i.id} item={i} />
                    ))}
                </AnimatePresence>
              </motion.ul>
              {cat.items.some((i) => !i.image) && (
                <>
                  <p className="mt-12 mb-4 font-display text-2xl font-semibold">More flavours</p>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {cat.items
                      .filter((i) => !i.image)
                      .map((i) => (
                        <CompactCard key={i.id} item={i} />
                      ))}
                  </ul>
                  {cat.id === "donuts" && <p className="mt-3 text-xs text-muted-ink">Rs 250 each is the last price posted on Instagram (Dec 2025). The shop confirms it on the call.</p>}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
