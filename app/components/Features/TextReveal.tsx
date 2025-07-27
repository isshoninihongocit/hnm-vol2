"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../ui/text-reveal-card";

export function TextRevealCardPreview() {
  return (
    <section className="relative w-full bg-[#0E0E10] py-16 px-4 sm:px-8 md:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
        <TextRevealCard
          text="Hikari no Matsuri"
          revealText="光で繋がる、心の祭り"
          className="w-full"
        >
          <TextRevealCardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold font-hnm text-center sm:text-left leading-tight tracking-tight">
            Step into a world where tradition meets tomorrow.
          </TextRevealCardTitle>

          <TextRevealCardDescription className="mt-4 text-sm sm:text-base md:text-lg text-neutral-300 font-hnm text-center sm:text-left max-w-3xl mx-auto sm:mx-0">
            Hover to uncover the spirit of Japan — from vibrant yukatas to glowing lanterns, and the magic of community.
          </TextRevealCardDescription>
        </TextRevealCard>
      </div>
    </section>
  );
}

export default TextRevealCardPreview;
