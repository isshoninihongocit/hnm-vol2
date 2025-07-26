import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/drag-card";

export function DraggableCardDemo() {
  const items = [
    {
      title: "Otaku Onstage",
      image: "/ps1.jpg",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "Artist Alley",
      image: "/ps.jpg",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Cosplay",
      image: "/ps2.jpg",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Digital Art Workshop",
      image: "/ps3.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },

    {
      title: "Akhibara No Quest",
      image: "/ps8.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "O Talku Zone",
      image: "/ps9.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Watch Party",
      image: "/ps10.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Nihon Ninja Run",
      image: "/ps11.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Exhibits",
      image: "/ps12.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Anime Weeb Shop",
      image: "/ps13.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Hanetsuki",
      image: "/ps4.jpg",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "Strokes of HNM",
      image: "/ps6.jpg",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Fly High",
      image: "/ps7.jpg",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        ✨ “Hikari no Matsuri is back — Chennai’s biggest anime & Japanese
        cultural festival returns!” ✨.
      </p>
      {items.map((item) => (
        <DraggableCardBody className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
