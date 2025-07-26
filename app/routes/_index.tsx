import Loader from "~/components/Loader";
// import { NavbarDemo } from "~/components/resizenav";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import HeroSplitSection from "~/components/HeroSplitSection";
// import ScrollMural from "~/components/ScrollMural";
import EventCard from "~/components/EventGrid";
import { HighlightsCarousel } from "~/components/HighlightsCarousel";
import Features from "~/components/Features/Features";
import { DraggableCardDemo } from "~/components/DragDemo";
import Contact from "~/routes/Contact";
export default function Index() {
  return (
    <main className="font-sans">
      <Navbar />
      <Hero />
      <HeroSplitSection />
      <HighlightsCarousel />
      <DraggableCardDemo />
      <Features />
      <Contact />
    </main>
  );
}
