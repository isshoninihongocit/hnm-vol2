"use client";

import { CardStack } from "../ui/card-stack";
import { cn } from "../../lib/utils";
import { TiFlowSwitch } from "react-icons/ti";

export function CardStackDemo() {
  return (
    <div
      data-aos="fade-up"
      data-aos-once="true"
      className="flex flex-col lg:flex-row items-center justify-between w-full gap-10 px-4 sm:px-8 md:px-12 py-12"
    >
      {/* Text Section */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl lg:max-w-[45%] space-y-6">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold inline-flex items-center gap-3 text-white font-hnm">
          Seamless Experience
          <TiFlowSwitch className="text-[#dc2626] text-4xl" />
        </div>

        <p className="text-neutral-200 text-md sm:text-lg lg:text-xl font-hnm text-justify">
          We offer an intuitive and user-friendly journey, ensuring every moment
          at <Highlight>Hikari no Matsuri</Highlight> is smooth, memorable, and
          magical.
        </p>
      </div>

      {/* Card Stack Section */}
      <div className="w-full lg:w-1/2">
        <CardStack items={CARDS} />
      </div>
    </div>
  );
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-red-400 text-red-900 dark:bg-red-500/[0.2] dark:text-emerald-500 px-1 py-0.5 rounded",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Aksshay",
    designation: "Festival Organizer",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-neutral-100">
        Our festival honors centuries-old Japanese traditions while embracing{" "}
        <Highlight>modern expressions</Highlight>. Attendees experience
        everything from <Highlight>Bon Odori dances</Highlight> to immersive
        art and cultural<Highlight>heritage</Highlight>.
      </p>
    ),
  },
  {
    id: 1,
    name: "Ramesh Kumar",
    designation: "Festival Volunteer",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-neutral-100">
        <Highlight>Hikari no Matsuri</Highlight> brings people together.
        Visitors connect through activities, share moments under lanterns, wear
        yukatas, and feel the <Highlight>community spirit</Highlight> that makes
        our festival so special.
      </p>
    ),
  },
  {
    id: 2,
    name: "Venkatesh",
    designation: "Head of Experience",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-neutral-100">
        What makes <Highlight>Hikari no Matsuri</Highlight> truly special is the{" "}
        <Highlight>community spirit</Highlight>. Every visitor is invited to
        participate — lighting lanterns, and connecting in an atmosphere full of
        warmth and unity.
      </p>
    ),
  },
];

export default CardStackDemo;
