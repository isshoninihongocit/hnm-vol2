
import React, { useEffect, useState } from "react";

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
  "/img6.jpg",
  "/img7.jpg",
  "/img8.jpg",
    "/img9.jpg",
    "/img10.jpg",
    "/img11.jpg",
    "/s1.JPG",
    "/s2.JPG",
    "/s3.JPG",
    "/s4.JPG",
    "/s5.JPG",
    "/s6.JPG",
    "/s7.JPG",
    "/s8.JPG",
    "/s9.JPG",
    "/s10.JPG",
    "/s11.JPG",
    "/s12.JPG",
    "/s13.jpg",


];

export function LayoutGridDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000); // Change every 3 seconds

    return () => clearInterval(interval); // Clear on unmount
  }, []);

  return (
    <section className="bg-black py-16 px-4 text-white">
      <h2 className="text-5xl font-bold text-center text-[#dc2626] font-hnm mb-10">
        ✨ 光の祭り(Hikari no Matsuri) Vol1 Gallery ✨
      </h2>

      <div className="max-w-4xl mx-auto relative">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-[70vh] object-cover rounded-xl border border-neutral-800 shadow-lg transition-opacity duration-1000"
        />
      </div>
    </section>
  );
}
