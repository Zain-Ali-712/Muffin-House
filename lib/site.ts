/** Brand facts, all from the old Wix site and @muffinhouse.pk captions (see research/gaps.md). */
export const SITE = {
  name: "The Muffin House",
  headline: "Luxury You Can Taste", // Wix hero
  intro: "Satisfy your cravings with our exquisite high-end filled donuts that were handcrafted for the elite.", // Wix hero
  motto: "Filled. Flawless. Fearlessly luxurious.", // Wix "Why Us"
  phone: "0322 7876097", // Wix "Call Us" + every IG caption
  phoneIntl: "+92 322 7876097",
  address: "Store Market, A Block, Model Town, Lahore",
  landmark: "Near Apna Bank and Babu Pan Shop", // IG captions, Dec 2025
  instagram: "https://www.instagram.com/muffinhouse.pk/",
  instagramHandle: "@muffinhouse.pk",
  oldSite: "https://muffinhouse.wixsite.com/pakistan",
  mapQuery: "The Muffin House, Model Town A Block, Lahore",
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "").replace(/^0/, "+92")}`;
