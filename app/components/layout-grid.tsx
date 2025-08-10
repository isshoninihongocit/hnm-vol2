//
// import React, { useEffect, useState } from "react";
//
// const images = [
//   "/img1.jpg",
//   "/img2.jpg",
//   "/img3.jpg",
//   "/img4.jpg",
//   "/img5.jpg",
//   "/img6.jpg",
//   "/img7.jpg",
//   "/img8.jpg",
//     "/img9.jpg",
//     "/img10.jpg",
//     "/img11.jpg",
//     "/s1.JPG",
//     "/s2.JPG",
//     "/s3.JPG",
//     "/s4.JPG",
//     "/s5.JPG",
//     "/s6.JPG",
//     "/s7.JPG",
//     "/s8.JPG",
//     "/s9.JPG",
//     "/s10.JPG",
//     "/s11.JPG",
//     "/s12.JPG",
//     "/s13.jpg",
//
//
// ];
//
// export function LayoutGridDemo() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 2000); // Change every 3 seconds
//
//     return () => clearInterval(interval); // Clear on unmount
//   }, []);
//
//   return (
//     <section className="bg-black py-16 px-4 text-white">
//       <h2 className="text-5xl font-bold text-center text-[#dc2626] font-hnm mb-10">
//         ✨ 光の祭り(Hikari no Matsuri) Vol1 Gallery ✨
//       </h2>
//
//       <div className="max-w-4xl mx-auto relative">
//         <img
//           src={images[currentIndex]}
//           alt={`Slide ${currentIndex + 1}`}
//           className="w-full h-[70vh] object-cover rounded-xl border border-neutral-800 shadow-lg transition-opacity duration-1000"
//         />
//       </div>
//     </section>
//   );
// }

// import { useRef, useEffect } from "react";
//
// export function LayoutGridDemo() {
//   const lifeAtHnm = [
//     { url: "/img1.jpg", alt: "Festival Moment 1" },
//     { url: "/img2.jpg", alt: "Festival Moment 2" },
//     { url: "/img3.jpg", alt: "Festival Moment 3" },
//     { url: "/img4.jpg", alt: "Festival Moment 4" },
//     { url: "/img5.jpg", alt: "Festival Moment 5" },
//     { url: "/img6.jpg", alt: "Festival Moment 6" },
//     { url: "/img7.jpg", alt: "Festival Moment 7" },
//     { url: "/img8.jpg", alt: "Festival Moment 8" },
//     { url: "/img8.jpg", alt: "Festival Moment 9" },
//     { url: "/img10.jpg", alt: "Festival Moment 10" },
//     { url: "/img11.jpg", alt: "Festival Moment 11" },
//     { url: "/s1.JPG", alt: "Festival Moment 12" },
//     { url: "/s2.JPG", alt: "Festival Moment 13" },
//     { url: "/s3.JPG", alt: "Festival Moment 14" },
//     { url: "/s4.JPG", alt: "Festival Moment 15" },
//     { url: "/s5.JPG", alt: "Festival Moment 16" },
//     { url: "/s6.JPG", alt: "Festival Moment 17" },
//     { url: "/s7.JPG", alt: "Festival Moment 18" },
//     { url: "/s8.JPG", alt: "Festival Moment 19" },
//     { url: "/s9.JPG", alt: "Festival Moment 20" },
//     { url: "/s10.JPG", alt: "Festival Moment 21" },
//     { url: "/s11.JPG", alt: "Festival Moment 22" },
//     { url: "/s12.JPG", alt: "Festival Moment 23" },
//     { url: "/s13.jpg", alt: "Festival Moment 24" },
//     // Add more images in public/hnm-gallery folder
//   ];
//
//   const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
//   let globalIndex = 0;
//   let last = { x: 0, y: 0 };
//
//   const distanceFromLast = (x: number, y: number) =>
//     Math.hypot(x - last.x, y - last.y);
//
//   const activate = (image: HTMLImageElement | null, x: number, y: number) => {
//     if (!image) return;
//     image.style.left = `${x}px`;
//     image.style.top = `${y}px`;
//     image.style.zIndex = String(globalIndex);
//     image.dataset.status = "active";
//     last = { x, y };
//   };
//
//   const handleOnMove = (e: MouseEvent | TouchEvent) => {
//     const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
//     const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
//
//     if (distanceFromLast(clientX, clientY) > window.innerWidth / 20) {
//       const lead = imagesRef.current[globalIndex % imagesRef.current.length];
//       const tail =
//         imagesRef.current[(globalIndex - 5) % imagesRef.current.length];
//
//       activate(lead, clientX, clientY);
//
//       if (tail) tail.dataset.status = "inactive";
//
//       globalIndex++;
//     }
//   };
//
//   useEffect(() => {
//     window.addEventListener("mousemove", handleOnMove);
//     window.addEventListener("touchmove", handleOnMove);
//
//     return () => {
//       window.removeEventListener("mousemove", handleOnMove);
//       window.removeEventListener("touchmove", handleOnMove);
//     };
//   }, []);
//
//   return (
//     <main className="h-screen w-full flex justify-center items-center bg-cream overflow-hidden relative">
//       <section className="w-full h-full py-10 flex flex-col items-center justify-center">
//         <h1 className="font-hnm text-[#dc2626] text-4xl lg:text-9xl text-center">
//           WE ARE HIKARI NO MATSURI
//         </h1>
//       </section>
//
//       {lifeAtHnm.map((image, index) => (
//         <img
//           key={index}
//           src={image.url}
//           alt={image.alt}
//           width={400}
//           height={400}
//           ref={(el) => (imagesRef.current[index] = el)}
//           className="image absolute"
//           data-status="inactive"
//         />
//       ))}
//     </main>
//   );
// }

import { useRef, useEffect, useState } from "react";
export function LayoutGridDemo() {
  const lifeAtHnm = [
    { url: "/img1.jpg", alt: "Festival Moment 1" },
    { url: "/img2.jpg", alt: "Festival Moment 2" },
    { url: "/img3.jpg", alt: "Festival Moment 3" },
    { url: "/img4.jpg", alt: "Festival Moment 4" },
    { url: "/img5.jpg", alt: "Festival Moment 5" },
    { url: "/img6.jpg", alt: "Festival Moment 6" },
    { url: "/img7.jpg", alt: "Festival Moment 7" },
    { url: "/img8.jpg", alt: "Festival Moment 8" },
    { url: "/img9.jpg", alt: "Festival Moment 9" },
    { url: "/img10.jpg", alt: "Festival Moment 10" },
    { url: "/img11.jpg", alt: "Festival Moment 11" },
    { url: "/s1.JPG", alt: "Festival Moment 12" },
    { url: "/s2.JPG", alt: "Festival Moment 13" },
    { url: "/s3.JPG", alt: "Festival Moment 14" },
    { url: "/s4.JPG", alt: "Festival Moment 15" },
    { url: "/s5.JPG", alt: "Festival Moment 16" },
    { url: "/s6.JPG", alt: "Festival Moment 17" },
    { url: "/s7.JPG", alt: "Festival Moment 18" },
    { url: "/s8.JPG", alt: "Festival Moment 19" },
    { url: "/s9.JPG", alt: "Festival Moment 20" },
    { url: "/s10.JPG", alt: "Festival Moment 21" },
    { url: "/s11.JPG", alt: "Festival Moment 22" },
    { url: "/s12.JPG", alt: "Festival Moment 23" },
    { url: "/s13.jpg", alt: "Festival Moment 24" },
  ];
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [imageStatus, setImageStatus] = useState<string[]>(
    Array(lifeAtHnm.length).fill("inactive")
  );
  let globalIndex = 0;
  let last = { x: 0, y: 0 };
  const distanceFromLast = (x: number, y: number) =>
    Math.hypot(x - last.x, y - last.y);
  const activate = (
    image: HTMLImageElement | null,
    x: number,
    y: number,
    index: number
  ) => {
    if (!image) return;
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.zIndex = String(globalIndex);
    setImageStatus((prev) => {
      const updated = [...prev];
      updated[index] = "active";
      return updated;
    });
    last = { x, y };
    setTimeout(() => {
      setImageStatus((prev) => {
        const updated = [...prev];
        updated[index] = "inactive";
        return updated;
      });
    }, 3000);
  };
  const handleOnMove = (e: MouseEvent | TouchEvent) => {
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    if (distanceFromLast(clientX, clientY) > window.innerWidth / 20) {
      const leadIndex = globalIndex % imagesRef.current.length;
      const lead = imagesRef.current[leadIndex];

      activate(lead, clientX, clientY, leadIndex);

      globalIndex++;
    }
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("touchmove", handleOnMove);
    return () => {
      window.removeEventListener("mousemove", handleOnMove);
      window.removeEventListener("touchmove", handleOnMove);
    };
  }, []);
  return (
    <main className="h-screen w-full flex justify-center items-center bg-cream overflow-hidden relative">
      <section className="w-full h-full py-10 flex flex-col items-center justify-center">
        <h1 className="font-hnm text-[#dc2626] text-4xl lg:text-7xl text-center">
          HIKARI NO MATSURI Vol1 Gallery
        </h1>
      </section>
      {lifeAtHnm.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={image.alt}
          width={400}
          height={400}
          ref={(el) => (imagesRef.current[index] = el)}
          style={{
            position: "absolute",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            opacity: imageStatus[index] === "active" ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          data-status={imageStatus[index]}
        />
      ))}
    </main>
  );
}
