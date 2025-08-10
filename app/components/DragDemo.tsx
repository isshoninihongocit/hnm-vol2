"use client";

import React, { useState, useEffect } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/drag-card";

export function DraggableCardDemo() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-08-22T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft("🌸 It’s time for Hikari no Matsuri! 🌸");
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(
          `⏳ ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds until Hikari no Matsuri`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { title: "Otaku Onstage", image: "/ps1.jpg" },
    { title: "Origami WORKSHOP", image: "/ps2.jpg" },
    { title: "KENDO WORKSHOP", image: "/ps3.jpg" },
    { title: "Hanetsuki", image: "/ps4.jpg" },
    { title: "COSPLAY CONTEST", image: "/ps5.jpg" },
    { title: "KARAOKE NIGHT", image: "/ps6.jpg" },
    { title: "KINGYO SUKUI", image: "/ps8.jpg" },
    { title: "Nihon Trivia", image: "/ps9.jpg" },
    { title: "SPEECH CONTEST", image: "/ps10.jpg" },
    { title: "Shodo WORKSHOP", image: "/ps11.jpg" },
    { title: "Anime Watch Party", image: "/ps12.jpg" },
    { title: "Shogi", image: "/ps13.jpg" },
    { title: "Anime Renact", image: "/ps14.jpg" },
  ];

  return (
    <section className="relative w-full py-20 bg-[#0e0e10] overflow-hidden">
      <div className="z-10 relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[#dc2626] text-xl sm:text-2xl md:text-3xl font-bold font-hnm">
          {timeLeft}
        </h2>
      </div>

      <DraggableCardContainer className="relative flex flex-wrap justify-center items-center gap-6 mt-12 px-4 sm:px-8">
        {items.map((item, index) => (
          <DraggableCardBody key={index} className="relative w-72 h-auto">
            <img
              src={item.image}
              alt={item.title}
              className="pointer-events-none h-80 w-full object-cover rounded-xl shadow-md"
            />
            <h3 className="mt-4 text-center text-xl font-bold text-[#dc2626] font-hnm">
              {item.title}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
}

export default DraggableCardDemo;
