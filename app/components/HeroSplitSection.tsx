
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AutoplayVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.muted = isMuted;
      videoRef.current.volume = isMuted ? 0 : 0.7;

      videoRef.current.play().catch((e) => {
        console.warn("Autoplay prevented: ", e);
      });
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted((m) => !m);

  return (
    <section className="relative flex flex-col lg:flex-row min-h-screen w-full overflow-hidden bg-black text-white font-hnm">
      {/* Left Side: Video */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen">
        <video
          ref={videoRef}
          src="https://github.com/isshoninihongocit/hnm-vercel/releases/download/video/visualsmain.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          muted={isMuted}
          controls={false}
        />
        <button
          onClick={toggleMute}
          className="absolute bottom-4 left-4 z-20 px-3 py-1.5 text-xs sm:text-sm md:text-base bg-black bg-opacity-50 text-white rounded-md hover:bg-opacity-80 transition"
        >
          {isMuted ? "Unmute 🔊" : "Mute 🔈"}
        </button>
      </div>

      {/* Right Side: Content */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-10 gap-4"
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#dc2626] text-center lg:text-left"
        >
          光の祭り (Hikari no Matsuri)
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base sm:text-lg text-neutral-200 max-w-2xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
        >
          Immerse yourself in the beauty of lantern-lit nights and heartfelt
          cultural showcases. Hikari no Matsuri brings together art, anime, and
          tradition to light up your soul.
        </motion.p>

        {/* Anime Image Grid */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 gap-4 mt-4 justify-center"
        >
          <img
            src="/img11.jpg"
            alt="Anime 1"
            className="rounded-lg object-cover h-28 w-full sm:h-32 shadow-lg"
          />
          <img
            src="/img8.jpg"
            alt="Anime 2"
            className="rounded-lg object-cover h-28 w-full sm:h-32 shadow-lg"
          />
          <img
            src="/img9.jpg"
            alt="Anime 3"
            className="rounded-lg object-cover h-28 w-full sm:h-32 shadow-lg"
          />
          <img
            src="/img10.jpg"
            alt="Anime 4"
            className="rounded-lg object-cover h-28 w-full sm:h-32 shadow-lg"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
