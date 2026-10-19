import Image from "next/image";
import { cn } from "@/lib/utils";

/** The official Muffin House mark (Wix site logo, background removed). */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image src="/img/brand/logo.webp" alt="The Muffin House" width={499} height={520} className="h-14 w-auto" priority />
    </span>
  );
}
