"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircleIcon, MopedIcon, PhoneIcon, StorefrontIcon } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field } from "@/components/forms/Field";
import { PHONE_FIELD } from "@/lib/forms";
import { formatPrice, priceLabel } from "@/lib/menu";
import { SITE, telHref } from "@/lib/site";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Mode = "pickup" | "delivery";
type Placed = {
  ref: string;
  name: string;
  phone: string;
  mode: Mode;
  when: string;
  address?: string;
  notes?: string;
  lines: { name: string; qty: number; price: number | null }[];
  subtotal: number;
  unpriced: number;
};

const MODES: { id: Mode; label: string; sub: string; icon: typeof MopedIcon }[] = [
  { id: "pickup", label: "Pickup", sub: "From Model Town A Block", icon: StorefrontIcon },
  { id: "delivery", label: "Delivery", sub: "To your door, fee on call", icon: MopedIcon },
];

function whenLabel(day: string, time: string) {
  if (!time) return "As soon as possible";
  const [h, m] = time.split(":").map(Number);
  const t = new Date(2000, 0, 1, h, m).toLocaleTimeString("en-PK", { hour: "numeric", minute: "2-digit" });
  return `${day === "tomorrow" ? "Tomorrow" : "Today"}, ${t}`;
}

export function OrderDialog() {
  const { orderOpen, setOrderOpen, lines, subtotal, unpriced, count, clear, setCartOpen } = useStore();
  const [mode, setMode] = useState<Mode>("pickup");
  const [asap, setAsap] = useState(true);
  const [placed, setPlaced] = useState<Placed | null>(null);

  const close = (open: boolean) => {
    setOrderOpen(open);
    if (!open) setTimeout(() => setPlaced(null), 300);
  };

  return (
    <Dialog open={orderOpen} onOpenChange={close}>
      <DialogContent className="max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-2xl gap-0 overflow-y-auto rounded-[1.75rem] border-0 bg-ground p-0 sm:max-w-2xl" data-lenis-prevent>
        <AnimatePresence mode="wait" initial={false}>
          {placed ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="p-6 sm:p-10" role="status">
              <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }}>
                <CheckCircleIcon className="size-16 text-pink-deep" weight="fill" aria-hidden />
              </motion.div>
              <DialogTitle className="display mt-5 text-[clamp(2.2rem,6vw,3.4rem)]">Order received, {placed.name}.</DialogTitle>
              <DialogDescription className="mt-3 text-ink-soft">
                Order <span className="font-semibold text-ink tabular-nums">{placed.ref}</span> is in. The shop will call you on <span className="font-medium text-ink tabular-nums">{placed.phone}</span> to confirm it.
              </DialogDescription>

              <div className="mt-8 rounded-[1.25rem] bg-surface p-5">
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-muted-ink">{placed.mode === "pickup" ? "Pickup" : "Delivery"}</dt>
                    <dd className="font-medium">{placed.mode === "pickup" ? SITE.address : placed.address}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-ink">Ready</dt>
                    <dd className="font-medium">{placed.when}</dd>
                  </div>
                  {placed.notes && (
                    <div className="sm:col-span-2">
                      <dt className="text-muted-ink">Notes</dt>
                      <dd className="font-medium">{placed.notes}</dd>
                    </div>
                  )}
                </dl>
                <ul className="mt-5 divide-y divide-line border-t border-line">
                  {placed.lines.map((l) => (
                    <li key={l.name} className="flex justify-between gap-3 py-2.5 text-sm">
                      <span>
                        <span className="tabular-nums">{l.qty} ×</span> {l.name}
                      </span>
                      <span className="tabular-nums">{l.price == null ? "On call" : formatPrice(l.qty * l.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline justify-between border-t border-line pt-3">
                  <span className="text-ink-soft">Total so far</span>
                  <span className="font-display text-2xl font-semibold tabular-nums">{formatPrice(placed.subtotal)}</span>
                </div>
                {placed.unpriced > 0 && <p className="mt-1 text-xs text-muted-ink">Plus items priced on the confirmation call.</p>}
              </div>

              <ol className="mt-6 grid gap-2 text-sm text-ink-soft">
                <li>1. The shop calls to confirm items, price and time.</li>
                <li>2. Your donuts are filled and boxed fresh for {placed.when.toLowerCase()}.</li>
                <li>3. Pay cash on {placed.mode}.</li>
              </ol>
              <p className="mt-6 rounded-[1rem] bg-butter-soft px-4 py-3 text-sm">This is a demo of the ordering flow, so nothing was sent to the shop.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => close(false)} className="btn btn-primary">
                  Done
                </button>
                <a href={telHref(SITE.phone)} className="btn btn-ghost">
                  <PhoneIcon className="size-4" aria-hidden /> Call {SITE.phone}
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0, x: -20 }}
              className="grid gap-6 p-6 sm:p-10"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const s = (k: string) => String(fd.get(k) ?? "").trim();
                setPlaced({
                  ref: `MH-${Date.now().toString(36).slice(-5).toUpperCase()}`,
                  name: s("name").split(" ")[0],
                  phone: s("phone"),
                  mode,
                  when: asap ? "As soon as possible" : whenLabel(s("day"), s("time")),
                  address: mode === "delivery" ? s("address") : undefined,
                  notes: s("notes") || undefined,
                  lines: lines.map((l) => ({ name: l.item.name, qty: l.qty, price: l.item.price })),
                  subtotal,
                  unpriced,
                });
                clear();
                e.currentTarget.closest("[data-slot=dialog-content]")?.scrollTo({ top: 0 });
              }}
            >
              <div className="pr-8">
                <DialogTitle className="display text-[clamp(2.2rem,6vw,3.2rem)]">Place your order</DialogTitle>
                <DialogDescription className="mt-2 text-ink-soft">
                  {count} {count === 1 ? "item" : "items"} · {formatPrice(subtotal)}
                  {unpriced > 0 && " + items priced on call"} ·{" "}
                  <button
                    type="button"
                    className="font-medium text-pink-deep link-underline"
                    onClick={() => {
                      setOrderOpen(false);
                      setCartOpen(true);
                    }}
                  >
                    Edit cart
                  </button>
                </DialogDescription>
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-medium">How would you like it?</legend>
                <div className="grid grid-cols-2 gap-3">
                  {MODES.map((m) => (
                    <label
                      key={m.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-[1.25rem] border-2 p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-pink-deep",
                        mode === m.id ? "border-pink-deep bg-pink-soft" : "border-line bg-surface hover:border-input",
                      )}
                    >
                      <input type="radio" name="mode" value={m.id} checked={mode === m.id} onChange={() => setMode(m.id)} className="sr-only" />
                      <m.icon className="size-7 shrink-0 text-pink-deep" weight={mode === m.id ? "fill" : "duotone"} aria-hidden />
                      <span className="leading-tight">
                        <span className="block font-semibold">{m.label}</span>
                        <span className="text-xs text-muted-ink">{m.sub}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Your name" autoComplete="name" required minLength={2} error="Please enter your name." />
                <Field name="phone" label="Mobile number" required {...PHONE_FIELD} hint="e.g. 0322 1234567" error="Use a Pakistani mobile number like 0322 1234567." />
                <AnimatePresence initial={false}>
                  {mode === "delivery" && (
                    <motion.div key="addr" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden sm:col-span-2">
                      <Field name="address" label="Delivery address" autoComplete="street-address" required minLength={8} hint="House, street, block and area" error="Please add your full address." />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <fieldset className="grid gap-3">
                <legend className="mb-3 text-sm font-medium">Preferred time</legend>
                <div className="inline-grid grid-cols-2 gap-1 justify-self-start rounded-full bg-muted p-1">
                  {[
                    { v: true, l: "ASAP" },
                    { v: false, l: "Schedule" },
                  ].map((o) => (
                    <label key={o.l} className={cn("flex min-h-10 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-pink-deep", asap === o.v ? "bg-surface text-ink shadow-soft" : "text-ink-soft")}>
                      <input type="radio" name="asap" checked={asap === o.v} onChange={() => setAsap(o.v)} className="sr-only" />
                      {o.l}
                    </label>
                  ))}
                </div>
                {!asap && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="field grid gap-1.5">
                      <label htmlFor="day" className="text-sm font-medium">
                        Day
                      </label>
                      <select id="day" name="day" defaultValue="today">
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                      </select>
                    </div>
                    <div className="field grid gap-1.5">
                      <label htmlFor="time" className="text-sm font-medium">
                        Time
                      </label>
                      <input id="time" name="time" type="time" required step={900} />
                      <span className="field-error">Pick a time.</span>
                    </div>
                  </div>
                )}
              </fieldset>

              <div className="field grid gap-1.5">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notes (optional)
                </label>
                <textarea id="notes" name="notes" rows={3} placeholder="Flavours for your box, a birthday message, gate number…" />
              </div>

              {lines.length > 0 && (
                <ul className="grid gap-1 rounded-[1.25rem] bg-surface p-4 text-sm">
                  {lines.map((l) => (
                    <li key={l.id} className="flex justify-between gap-3">
                      <span>
                        <span className="tabular-nums">{l.qty} ×</span> {l.item.name}
                      </span>
                      <span className="text-muted-ink tabular-nums">{l.item.price == null ? priceLabel(null) : formatPrice(l.qty * l.item.price)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={lines.length === 0}>
                  Place order · {formatPrice(subtotal)}
                </button>
                <p className="text-xs text-muted-ink">Cash on {mode}. Demo only, nothing is sent.</p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
