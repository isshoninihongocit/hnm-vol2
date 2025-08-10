"use client";

import { motion } from "framer-motion";

type Delegate = {
  name: string;
  title: string;
  photo: string; // Path to photo
  bio: string;
};

const delegates: Delegate[] = [
  {
    name: "Mr.TAGA Masayuki",
    title: "Consulate-General of Japan",
    photo: "/csg.jpg",
    bio: "Representing the Government of Japan, Taga Masayuki san, Consul General of Japan, is committed to deepening cultural and economic connections between Japan and India. His support for Hikari no Matsuri reflects the festival’s mission of celebrating and sharing Japanese heritage.",
  },
  {
    name: "Ms.Sonu Gupta",
    title: "Assistant Director at Japan Foundation New Delhi",
    photo: "/sonu.png",
    bio: "As Assistant Director at the Japan Foundation, New Delhi, Sonu Gupta works tirelessly to promote Japanese culture, arts, and language education in India. Her efforts help create meaningful cross-cultural experiences, enriching the spirit of Hikari no Matsuri.",
  },

  // Add more delegates here...
];

export default function Delegates() {
  return (
    <section className="min-h-screen font-sans px-4 py-20 bg-black text-white flex flex-col items-center">
      <motion.h1
        className="text-4xl md:text-7xl font-hnm font-bold mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Chief Guests & Japanese Delegates
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {delegates.map((delegate, index) => (
          <motion.div
            key={delegate.name}
            className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <img
              src={delegate.photo}
              alt={delegate.name}
              className="h-40 w-40 object-cover rounded-full mb-4 border-4 border-red-500"
            />
            <h2 className="text-xl font-bold mb-1">{delegate.name}</h2>
            <h3 className="text-sm uppercase text-red-500 mb-2">
              {delegate.title}
            </h3>
            <p className="text-neutral-300 text-sm">{delegate.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
