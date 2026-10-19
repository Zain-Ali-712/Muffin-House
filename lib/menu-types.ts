export type MenuItem = {
  id: string;
  name: string;
  /** PKR. null = no price posted anywhere official; the shop confirms it on the call. */
  price: number | null;
  /** Where the price came from, shown under the card so nothing reads as invented. */
  priceNote?: string;
  description: string | null;
  /** Official photo of this exact item, or null (the card draws a flavour swatch instead). */
  image: string | null;
  /** Cut-out (transparent) version, used on tinted cards. */
  cutout?: string;
  /** Glaze / filling colours for the drawn donut swatch. */
  swatch?: [glaze: string, filling: string];
  popular?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  blurb: string;
  items: MenuItem[];
};
