import type { MenuCategory } from "./menu-types";

/*
  Every name below is from an @muffinhouse.pk caption (Oct 2025 to Jan 2026).
  Prices: the only donut price ever posted is Rs 250 each, plus boxes of 6 / 12
  (Dec 2025 offer posts). Pizzas and burgers never had a price posted, so they are null.
*/
const DONUT_PRICE = 250;
const DONUT_NOTE = "Rs 250 each, last posted price (Dec 2025)";

export const MENU: MenuCategory[] = [
  {
    id: "donuts",
    title: "Brioche donuts",
    blurb: "Soft brioche dough, premium fillings and toppings, made fresh every day.",
    items: [
      { id: "boston-cream", name: "Boston Cream", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: "The house classic: vanilla custard inside, chocolate on top.", image: "/img/photo/boston.webp", cutout: "/img/cut/boston.webp", popular: true },
      { id: "jumbo-nutella", name: "Jumbo Nutella", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: "Sugar-dusted and split open with a river of Nutella.", image: "/img/photo/nutella.webp", cutout: "/img/cut/nutella.webp", popular: true },
      { id: "double-glazed", name: "Double Glazed Chocolate", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: "Double chocolate glaze, filled with Oreo cookie cream.", image: "/img/photo/double-glazed.webp", popular: true },
      { id: "korean", name: "Korean-style Donut", price: DONUT_PRICE, priceNote: "Rs 250, New Year offer (Dec 2025)", description: "Super soft, fluffy, sugar-rolled.", image: "/img/photo/korean.webp" },
      { id: "oreo-cookie-cream", name: "Oreo Cookie Cream", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#2b1d1a", "#f4efe6"] },
      { id: "double-decker-oreo", name: "Double Decker Oreo Cookie Cream", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#1f1715", "#efe8dc"] },
      { id: "tiramisu", name: "Tiramisu", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#a77a55", "#f2e2c6"] },
      { id: "honeycomb", name: "Honeycomb", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#e7a93a", "#f8dc8a"] },
      { id: "hazelnut-chocolate", name: "Hazelnut Chocolate", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#5a3424", "#8b5a3c"] },
      { id: "strawberry-chocolate", name: "Strawberry Chocolate", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#e86a8f", "#5a3424"] },
      { id: "salted-caramel", name: "Salted Caramel", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#c9813b", "#f0c78a"] },
      { id: "vanilla-chocolate", name: "Vanilla Chocolate", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#f3ead8", "#5a3424"] },
      { id: "vanilla", name: "Vanilla", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#f6eedc", "#fbf4e2"] },
      { id: "chocolate-glaze", name: "Classic Chocolate Glaze", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#4a2a1c", "#e9c9a0"] },
      { id: "oreo-glaze", name: "Oreo Glaze", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#2b1d1a", "#e9c9a0"] },
      { id: "double-choc-crunch", name: "Double Chocolate Crunch", price: DONUT_PRICE, priceNote: DONUT_NOTE, description: null, image: null, swatch: ["#3a2118", "#6b3f2a"] },
    ],
  },
  {
    id: "boxes",
    title: "Boxes",
    blurb: "For the office, the family, or a very good evening.",
    items: [
      { id: "box-6", name: "Box of 6 donuts", price: 1500, priceNote: "Offer price posted Dec 2025", description: "Mix any six flavours. Tell us which in the order notes.", image: "/img/photo/tower.webp", cutout: "/img/cut/tower.webp", popular: true },
      { id: "box-12", name: "Box of 12 donuts", price: 3000, priceNote: "Offer price posted Dec 2025", description: "A dozen, any mix. Tell us which in the order notes.", image: "/img/photo/choc.webp" },
    ],
  },
  {
    id: "pizza",
    title: "Artisan pizza",
    blurb: "Hand-tossed on the special house dough, thin crust or pan. Baked fresh every day.",
    items: [
      { id: "pz-pepperoni", name: "Pepperoni", price: null, description: null, image: null },
      { id: "pz-chicken-tikka", name: "Chicken Tikka", price: null, description: null, image: null },
      { id: "pz-chicken-fajita", name: "Chicken Fajita", price: null, description: "Spicy, saucy and full of taste.", image: null },
      { id: "pz-malai-boti", name: "Malai Boti", price: null, description: "Creamy perfection in every bite.", image: null },
      { id: "pz-chicken-supreme", name: "Chicken Supreme", price: null, description: "Loaded with toppings.", image: null },
      { id: "pz-bbq-tikka", name: "BBQ Tikka", price: null, description: "Smoky flavour that hits just right.", image: null },
      { id: "pz-veggie", name: "Veggie Delight", price: null, description: "Fresh, colourful and delicious.", image: null },
    ],
  },
  {
    id: "burgers",
    title: "Burgers & deals",
    blurb: "For when the craving is savoury.",
    items: [
      { id: "midnight-deal", name: "Midnight Deal", price: 699, priceNote: "Posted Oct 2025", description: "Zinger burger with coleslaw, a 345ml drink and a glaze donut.", image: "/img/photo/midnight.webp", cutout: "/img/cut/midnight.webp", popular: true },
      { id: "smash-beef", name: "Smash Beef Burger", price: null, description: "Premium Australian beef, seared, with chipotle, mustard sauce and spicy mayo.", image: "/img/photo/smash.webp", cutout: "/img/cut/smash.webp" },
      { id: "zinger-deal", name: "Zinger Burger Deal", price: null, description: "Crispy zinger with chipotle sauce, fresh coleslaw and salad, and a drink.", image: null },
    ],
  },
];
