"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@remix-run/react";
type Event = {
  id: number;
  title: string;
  role: string;
  poster: string;
  description: string;
  rules: string[];
};
const events: Event[] = [
  {
    id: 1,
    title: "KAMICRAFT",
    role: "Origami Workshop",
    poster: "/1.jpg",
    description: "Unfold the magic of Japanese paper folding. Learn cranes, blossoms & more.",
    rules: [
      "Open to all students with valid College ID.",
      "Materials provided, handle with care.",
      "Maintain silence & respect during instruction.",
    ],
  },
  {
    id: 2,
    title: "SHODO SPIRIT",
    role: "Japanese Calligraphy",
    poster: "/1.jpg",
    description: "Experience the art of brush, ink & balance. Write beautiful kanji & proverbs.",
    rules: [
      "Open to all students with valid College ID.",
      "Brushes & ink provided, clean up after use.",
      "Maintain a quiet and mindful environment.",
    ],
  },
  {
    id: 3,
    title: "OTAKU ARENA",
    role: "Anime Quiz Show",
    poster: "/1.jpg",
    description: "Team up & prove you’re the ultimate otaku with quizzes on anime & manga!",
    rules: [
      "Teams of 1-3 members.",
      "No phones or cheating during the quiz.",
      "Respect quizmasters & buzzer rounds.",
    ],
  },
  {
    id: 4,
    title: "MANGAMIND",
    role: "Manga Plot Challenge",
    poster: "/1.jpg",
    description: "Write your own manga plot — characters, twists & more. Be the next mangaka!",
    rules: [
      "Solo entry only.",
      "No plagiarism. Original plots only.",
      "Keep content general audience friendly.",
    ],
  },
  {
    id: 5,
    title: "BRAIN DOJO",
    role: "Shogi Board Game",
    poster: "/1.jpg",
    description: "Learn & play Shogi — the Japanese chess game of strategy & focus.",
    rules: [
      "Open to all students.",
      "Respect your opponent. No distractions.",
      "Equipment must be handled responsibly.",
    ],
  },
  {
    id: 6,
    title: "KOINOBORI",
    role: "Color the Sky",
    poster: "/1.jpg",
    description: "Decorate carp streamers and fill the sky with your wishes & colors.",
    rules: [
      "Open to all with valid ID.",
      "Use only provided materials.",
      "Keep messages positive and respectful.",
    ],
  },
  {
    id: 23,
    title: "YOREI HOUSE",
    role: "Ghost House Experience",
    poster: "/1.jpg",
    description: "Face your fears in a spooky walk-through inspired by Japanese ghost legends!",
    rules: [
      "Groups of 2-4 allowed.",
      "No running or pushing inside.",
      "Not recommended for faint-hearted guests.",
    ],
  },
];

export default function EventGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
      className="relative w-full border border-black overflow-hidden rounded-lg"
    >
      <div className="aspect-[3/4] w-full">
        <img
          src={event.poster}
          alt={event.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex justify-between items-center p-4 border-t border-black space-x-2">
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-xl truncate">{event.title}</h2>
          <p className="text-sm">{event.role}</p>
          <p className="text-xs mt-2">{event.description}</p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setIsOpen(true)}
            aria-label={`View rules for ${event.title}`}
            className="flex h-10 w-10 items-center justify-center border border-black rounded-full text-xl hover:bg-gray-100"
          >
            +
          </button>
          <Link
            to={`/registration?eventId=${event.id}`}
            className="flex items-center px-3 py-1 border border-black rounded-full text-sm font-semibold transition-colors hover:bg-red-600 hover:text-white"
          >
            Register
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col justify-center p-8 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4">{event.title} Rules</h3>
            <p className="mb-6 text-lg leading-relaxed">
              {event.rules.map((rule, idx) => (
                <span key={idx} className="block mb-2">
                  • {rule}
                </span>
              ))}
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="self-end flex h-10 w-10 items-center justify-center border border-black rounded-full text-xl hover:bg-gray-200"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

