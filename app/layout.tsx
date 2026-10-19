import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FormAria } from "@/components/layout/FormAria";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { OrderDialog } from "@/components/cart/OrderDialog";
import { AddedToast } from "@/components/cart/AddedToast";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["SOFT", "WONK", "opsz"] });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Muffin House | Filled brioche donuts & artisan pizza, Model Town Lahore",
  description:
    "High-end filled brioche donuts and hand-tossed artisan pizza from Model Town A Block, Lahore. Order online for pickup or delivery.",
  openGraph: {
    title: "The Muffin House",
    description: "Luxury you can taste. Filled brioche donuts, made fresh daily in Model Town, Lahore.",
    images: [{ url: "/img/photo/tower.webp" }],
  },
};

export const viewport: Viewport = { themeColor: "#fdf4ef" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable}`}>
      <body className="min-h-dvh">
        <MotionProvider>
          <StoreProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
            >
              Skip to content
            </a>
            <SmoothScroll />
            <FormAria />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <OrderDialog />
            <AddedToast />
          </StoreProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
