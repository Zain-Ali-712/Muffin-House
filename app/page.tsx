import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { Menu } from "@/components/home/Menu";
import { Visit } from "@/components/home/Visit";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Menu />
      <Visit />
    </>
  );
}
