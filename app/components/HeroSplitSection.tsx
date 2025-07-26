"use client";

import { useState, useRef, useEffect } from "react";

export default function AutoplayVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; // Set speed here
      videoRef.current.muted = isMuted;
      videoRef.current.volume = isMuted ? 0 : 0.7; // Volume only if unmuted

      videoRef.current.play().catch((e) => {
        console.warn("Autoplay prevented: ", e);
      });
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((m) => !m);
  };

  return (
    <section className="relative flex min-h-screen w-full overflow-hidden">
      <div className="relative w-1/2 h-screen">
        <video
          ref={videoRef}
          src="/visualsmain.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          muted={isMuted}
          controls={false}
        />
        <button
          onClick={toggleMute}
          className="absolute bottom-6 left-6 z-20 px-4 py-2 bg-black bg-opacity-50 text-white rounded-md hover:bg-opacity-80 transition"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? "Unmute 🔊" : "Mute 🔈"}
        </button>
      </div>
      <div className="relative flex w-1/2 flex-col justify-center bg-white p-16">
        <h2 className="text-4xl font-bold text-red-600 mb-8">
          01 / CELEBRATION.
        </h2>
        <h2 className="text-4xl font-bold text-black-600 mb-8">02 // UNITY.</h2>
        <h2 className="text-4xl font-bold text-red-600 mb-8">
          03 /// ILLUMINATION.
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-gray-700">
          Hikari no Matsuri is more than just an event — it’s a celebration of
          light, culture, and togetherness. We invite everyone to gather and
          share moments under the vibrant glow of lanterns and performances.
        </p>
      </div>
    </section>
  );
}
