"use client";

import React from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";

type FestivalContentProps = {
  title: string;
  description: string;
  imageUrl: string;
};

export const FestivalContent = ({
  title,
  description,
  imageUrl,
}: FestivalContentProps) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-4 sm:p-6 md:p-10 lg:p-14 rounded-3xl mb-6">
      <h3 className="text-lg sm:text-2xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100 font-hnm text-center sm:text-left">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg font-hnm max-w-3xl mx-auto sm:mx-0 mb-6 text-center sm:text-left">
        {description}
      </p>
      <div className="flex justify-center sm:justify-start">
        <img
          src={imageUrl}
          alt={title}
          className="w-full max-w-xs sm:max-w-md md:max-w-lg object-contain rounded-xl"
        />
      </div>
    </div>
  );
};

const data = [

{
  category: "Cultural",
  title: "Lantern Parade",
  src: "/lantern.jpg",
  content: (
    <FestivalContent
      title="Lantern Parade"
      description="Step into a scene straight out of a dream as hundreds of glowing lanterns float and sway through the night. Each lantern carries a message of hope, love, or remembrance, illuminating the path in a warm golden glow. As the parade winds through the festival grounds, the gentle lights mingle with the sound of laughter, music, and the scent of festival food, creating a breathtaking atmosphere of togetherness and joy. A tradition that celebrates unity and the beauty of fleeting moments, this is one event you’ll never forget."
      imageUrl="/lantern.jpg"
    />
  ),
},
{
  category: "Performance",
  title: "Traditional Dance",
  src: "/dance.jpg",
  content: (
    <FestivalContent
      title="Traditional Dance"
      description="Lose yourself in the elegance of Japan’s rich cultural heritage as skilled dancers take the stage, adorned in vibrant kimonos that flutter like petals in the wind. Every movement, every turn, is steeped in centuries of history, telling stories of seasons, love, and celebration. The rhythmic beats of the taiko drums blend with the delicate notes of traditional instruments, drawing you into a world where art and storytelling become one. A performance that will leave you spellbound, it’s a living masterpiece of grace and passion."
      imageUrl="/dance.jpg"
    />
  ),
},
{
  category: "Workshop",
  title: "Origami Workshop",
  src: "/origami.png",
  content: (
    <FestivalContent
      title="Origami Workshop"
      description="Fold, crease, and create — discover the timeless Japanese art of origami in a workshop that’s perfect for all ages. Guided by master instructors, you’ll learn not just how to make cranes, flowers, and animals, but also the meaning behind each design. Every fold is a step into a story, whether it’s the thousand-crane legend for good fortune or a simple blossom symbolizing renewal. Take home your creations as personal keepsakes, or gift them to someone special as a token of thought and care."
      imageUrl="/cator.jpg"
    />
  ),
},
{
  category: "Food",
  title: "Street Food Stalls",
  src: "/ramen.jpg",
  content: (
    <FestivalContent
      title="Street Food Stalls"
      description="Follow your senses to a street filled with the sizzling, steaming, and sweet aromas of authentic Japanese festival food. Warm your hands around a bowl of rich, savory ramen, taste the crispy delight of takoyaki, or satisfy your sweet tooth with chewy, colorful mochi. Each bite is a journey through Japan’s vibrant culinary traditions, prepared with love and flair by passionate chefs. Whether you’re here for comfort food or bold new flavors, the food stalls are a celebration for your taste buds."
      imageUrl="/food.jpg"
    />
  ),
},
{
  category: "Art",
  title: "Calligraphy Showcase",
  src: "/cal.jpg",
  content: (
    <FestivalContent
      title="Calligraphy Showcase"
      description="Watch in awe as skilled calligraphers transform blank sheets into works of art with a single brushstroke. The graceful sweep of ink across paper brings to life centuries-old kanji characters, each one carrying meaning, beauty, and history. You’ll witness the precision, discipline, and emotion behind this revered craft — and even get the chance to try writing your own name in Japanese under the guidance of an expert. An experience that bridges language, art, and soul."
      imageUrl="/cal.jpg"
    />
  ),
},
{
  category: "Anime",
  title: "AniAct",
  src: "/r1.jpg",
  content: (
    <FestivalContent
      title="AniAct"
      description="Have you ever imagined stepping right into your favorite anime scene? At AniAct, you can bring those moments to life! Team up with friends or join other fans to perform iconic scenes and dialogues from beloved anime series. From dramatic battle cries to heartwarming confessions, your stage awaits — and the crowd is ready to cheer you on. With prizes for the best performances and plenty of laughs along the way, it’s a chance to shine, geek out, and connect with fellow anime lovers."
      imageUrl="/r1.jpg"
    />
  ),
},
{
  category: "Entertainment",
  title: "Anime Watch Party",
  src: "/r2.jpg",
  content: (
    <FestivalContent
      title="Anime Watch Party"
      description="Settle into a cozy atmosphere with friends, snacks, and a big screen showing both classic anime gems and exciting new episodes. Whether you’re rewatching a nostalgic favorite or discovering something fresh, the collective energy of the crowd makes every moment more memorable. Feel the laughter, the gasps, and the cheers ripple through the room as you share in the highs and lows of each story. It’s not just watching anime — it’s experiencing it together."
      imageUrl="/r2.jpg"
    />
  ),
},
{
  category: "Art",
  title: "Manga Plot",
  src: "/r3.jpg",
  content: (
    <FestivalContent
      title="Manga Plot"
      description="Step into the shoes of a manga creator! In this collaborative and imaginative activity, you and your team will brainstorm characters, settings, and storylines to craft your very own manga concept. Sketch scenes, outline twists, and bring your vision to life, whether it’s a lighthearted romance, a heart-pounding action series, or a quirky slice-of-life comedy. At the end, share your ideas and watch how creativity connects people across cultures."
      imageUrl="/comi.jpg"
    />
  ),
},
{
  category: "Stall",
  title: "Anime Weeb Shop",
  src: "/r4.jpg",
  content: (
    <FestivalContent
      title="Anime Weeb Shop"
      description="Your one-stop destination for all things anime! Explore a treasure trove of merchandise, from limited-edition posters and hand-painted fan art to plushies, keychains, and collectibles you won’t find anywhere else. Whether you’re a casual fan or a dedicated otaku, this shop is the perfect place to find something that speaks to your fandom — and maybe even a rare item you’ll cherish forever."
      imageUrl="/r4.jpg"
    />
  ),
},
{
  category: "Workshops",
  title: "Kendo",
  src: "/r5.jpg",
  content: (
    <FestivalContent
      title="Kendo Workshop"
      description="Discover the spirit and discipline of Kendo, the Japanese way of the sword. Led by seasoned practitioners, you’ll learn basic stances, strikes, and the philosophy behind this martial art that emphasizes respect, focus, and self-improvement. Don the protective gear, take up the bamboo shinai, and feel the thrill of this centuries-old tradition as you practice under expert guidance."
      imageUrl="/r5.jpg"
    />
  ),
},
{
  category: "Fun",
  title: "Kingyo Sukui",
  src: "/r6.jpg",
  content: (
    <FestivalContent
      title="Kingyo Sukui"
      description="Test your skill and patience in this beloved Japanese festival game! Using a delicate paper scoop, try to catch lively goldfish swimming in shallow pools — but be careful, one wrong move and your scoop might tear. Whether you take home a fish or simply enjoy the challenge, Kingyo Sukui is a joyful reminder of summer festivals in Japan, filled with laughter, cheers, and playful competition."
      imageUrl="/r6.jpg"
    />
  ),
},
];

export function HighlightsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="w-full h-full py-12 sm:py-16 md:py-20 bg-black">
      <h2 className="max-w-7xl px-4 sm:px-6 mx-auto text-2xl sm:text-4xl md:text-5xl font-bold text-[#dc2626] font-hnm text-center sm:text-left">
        Festival Highlights
      </h2>
      <div className="px-4 sm:px-6 mt-6">
        <Carousel items={cards} />
      </div>
    </section>
  );
}
