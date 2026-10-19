import { MENU } from "./menu-data";
import type { MenuItem } from "./menu-types";

export { MENU };
export type { MenuItem, MenuCategory } from "./menu-types";

const BY_ID = new Map<string, MenuItem & { category: string }>(
  MENU.flatMap((c) => c.items.map((i) => [i.id, { ...i, category: c.title }] as const)),
);

export const getItem = (id: string) => BY_ID.get(id);

const pkr = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });
export const formatPrice = (n: number) => `Rs ${pkr.format(n)}`;
export const priceLabel = (p: number | null) => (p == null ? "Price on call" : formatPrice(p));
