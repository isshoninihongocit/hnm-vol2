// "use client";
// import { motion } from "framer-motion";
//
// type Sponsor = {
//   category: string;
//   name: string;
//   logo: string;
//   description: string;
//   link: string;
// };
//
// const sponsors: Sponsor[] = [
//   {
//     category: "Platinum Sponsor",
//     name: "Fuji Sakura",
//     logo: "/fujisakura_cover.jpg",
//     description:
//       "Naturals, India's No.1 salon brand, is redefining beauty and grooming with style and innovation. Proud sponsor of Hackerz 25!",
//     link: "https://naturals.in/",
//   },
//   {
//     category: "Educational Sponsor",
//     name: "DIA",
//     logo: "/diamain.png",
//     description:
//       "DIA is reshaping the way we learn. Proud supporter of Hackerz 25’s educational initiatives.",
//     link: "#",
//   },
//   {
//     category: "Technical Sponsor",
//     name: "Softrate",
//     logo: "/Softrate.png",
//     description:
//       "Softrate provides innovative software solutions and is proud to support Hackerz 25 as our technical sponsor!",
//     link: "https://softrate.com/",
//   },
//   {
//     category: "Refreshment Sponsor",
//     name: "Cool Drinks",
//     logo: "/cooldrinks.png",
//     description:
//       "Refreshing all the minds at Hackerz 25! Cool Drinks is our go-to refreshment sponsor keeping the energy up.",
//     link: "#",
//   },
//   {
//     category: "Food Truck Sponsor",
//     name: "Yummy Trucks",
//     logo: "/yummy.png",
//     description:
//       "Yummy Trucks serves delicious bites and vibes during HNM vol2!",
//     link: "#",
//   },
//   {
//     category: "Certificate Sponsor",
//     name: "Poorvika",
//     logo: "/poor.png",
//     description:
//       "Proudly sponsoring all certificates of achievement and participation for HNM attendees.",
//     link: "https://poorvika.com/",
//   },
// ];
//
// const sponsorClassMap: Record<string, string> = {
//   "Platinum Sponsor": "border-yellow-500",
//   "Educational Sponsor": "border-indigo-500",
//   "Technical Sponsor": "border-green-500",
//   "Refreshment Sponsor": "border-blue-500",
//   "Food Truck Sponsor": "border-orange-500",
//   "Certificate Sponsor": "border-pink-500",
// };
//
// export default function Sponsors() {
//   return (
//     <section className="min-h-screen bg-black text-white px-10 py-16 flex flex-col items-center">
//       <div className="max-w-7xl">
//         {Array.from(new Set(sponsors.map((s) => s.category))).map(
//           (category) => (
//             <div key={category} className="mb-20">
//               {/* Category Title */}
//               <motion.h2
//                 className="text-4xl md:text-6xl font-hnm font-bold text-center text-gray-200 mb-12 underline underline-offset-8 decoration-[#dc2626]"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {category.toUpperCase()}
//               </motion.h2>
//
//               {/* Sponsor Cards */}
//               <div className="flex justify-center">
//                 {sponsors
//                   .filter((s) => s.category === category)
//                   .map((sponsor, idx) => (
//                     <motion.a
//                       key={sponsor.name}
//                       href={sponsor.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`w-100 flex flex-col items-center justify-center text-center bg-neutral-900 p-8 rounded-2xl overflow-hidden transition-transform hover:scale-105 shadow-lg border-2 ${
//                         sponsorClassMap[sponsor.category] ||
//                         "border-neutral-700"
//                       }`}
//                       initial={{ opacity: 0, y: 30 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.1, duration: 0.5 }}
//                       viewport={{ once: true }}
//                     >
//                       <div className="flex flex-col items-center text-center">
//                         <img
//                           src={sponsor.logo}
//                           alt={sponsor.name}
//                           className="h-44 w-auto object-contain mb-4"
//                         />
//                         <h3 className="text-2xl font-semibold text-white mb-2">
//                           {sponsor.name}
//                         </h3>
//                         <p className="text-sm text-gray-300">
//                           {sponsor.description}
//                         </p>
//                         <p className="text-blue-400 mt-3 text-sm underline">
//                           Visit Website
//                         </p>
//                       </div>
//                     </motion.a>
//                   ))}
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </section>
//   );
// }

// "use client";
// import { motion } from "framer-motion";
//
// type Sponsor = {
//   category: string;
//   name: string;
//   logo: string;
//   description: string;
//   link: string;
// };
// type Stall = {
//   name: string;
//   logo: string;
//   link: string;
// };
// const sponsors: Sponsor[] = [
//   {
//     category: "Platinum Sponsor",
//     name: "Fuji Sakura",
//     logo: "/fujisakura_cover.jpg",
//     description:
//       "As our Platinum Sponsor, Fuji Sakura brings prestige and excellence to Hikari no Matsuri, supporting the festival’s vision of quality and elegance. Their partnership helps us create a truly distinguished celebration!.",
//     link: "https://fujisakuratech.com/",
//   },
//   {
//     category: "Educational Sponsor",
//     name: "DIA",
//     logo: "/diamain.png",
//     description:
//       "DIA Foreign Language Academy, an international online platform, focused on delivering outstanding language education through structured, engaging courses that help learners master fluency, empowering success across borders, encompasses the educational spirit of Hikari no Matsuri.",
//     link: "https://www.diacourses.com/",
//   },
//   {
//     category: "Technical Sponsor",
//     name: "Softrate",
//     logo: "/Softrate.png",
//     description:
//       "With cutting-edge tools and expertise, Softrate fuels the technical backbone of Hikari no Matsuri, ensuring innovation and smooth operations throughout the event. Their unwavering support helps us deliver a seamless and memorable experience for all attendees!.",
//     link: "https://softrate.com/",
//   },
//   {
//     category: "Certificate Sponsor",
//     name: "Poorvika",
//     logo: "/poor.png",
//     description:
//       "Poorvika helps us recognize every achievement at Hikari no Matsuri, proudly supporting the creation of certificates that celebrate our participants’ contributions. Their touch turns recognition into a lasting memory.",
//     link: "https://poorvika.com/",
//   },
// ];
// const stalls: Stall[] = [
//   { name: "Sakura Café", logo: "/stall1.png", link: "#" },
//   { name: "Origami Wonders", logo: "/stall2.png", link: "#" },
//   { name: "Kimono Corner", logo: "/stall3.png", link: "#" },
//   { name: "Matcha Magic", logo: "/stall4.png", link: "#" },
//   { name: "Anime World", logo: "/stall5.png", link: "#" },
// ];
// export default function Sponsors() {
//   return (
//     <section className="min-h-screen bg-black text-white px-10 py-16 flex flex-col items-center">
//       <div className="max-w-7xl">
//         {Array.from(new Set(sponsors.map((s) => s.category))).map(
//           (category) => (
//             <div key={category} className="mb-20">
//               {/* Category Title */}
//               <motion.h2
//                 className="text-4xl md:text-6xl font-hnm font-bold text-center text-gray-200 mb-12 underline underline-offset-8 decoration-[#dc2626]"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {category.toUpperCase()}
//               </motion.h2>
//
//               {/* Sponsor Cards */}
//               <div className="flex justify-center">
//                 {sponsors
//                   .filter((s) => s.category === category)
//                   .map((sponsor, idx) => (
//                     <motion.a
//                       key={sponsor.name}
//                       href={sponsor.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="relative p-[2px] rounded-2xl overflow-hidden transition-transform hover:scale-105 shadow-lg"
//                       initial={{ opacity: 0, y: 30 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.1, duration: 0.5 }}
//                       viewport={{ once: true }}
//                     >
//                       {/* Animated Gradient Border */}
//                       <motion.div
//                         className="absolute inset-0 rounded-2xl"
//                         animate={{
//                           background: [
//                             "linear-gradient(90deg, #facc15, #ec4899, #3b82f6, #10b981)",
//                             "linear-gradient(90deg, #ec4899, #3b82f6, #10b981, #facc15)",
//                             "linear-gradient(90deg, #3b82f6, #10b981, #facc15, #ec4899)",
//                             "linear-gradient(90deg, #10b981, #facc15, #ec4899, #3b82f6)",
//                           ],
//                         }}
//                         transition={{
//                           duration: 6,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                       />
//
//                       {/* Inner Card */}
//                       <div className="relative flex flex-col items-center text-center bg-neutral-900 p-8 rounded-2xl w-100">
//                         <img
//                           src={sponsor.logo}
//                           alt={sponsor.name}
//                           className="h-44 w-auto object-contain mb-4"
//                         />
//                         <h3 className="text-2xl font-semibold text-white mb-2">
//                           {sponsor.name}
//                         </h3>
//                         <p className="text-sm text-gray-300">
//                           {sponsor.description}
//                         </p>
//                         <p className="text-blue-400 mt-3 text-sm underline">
//                           Visit Website
//                         </p>
//                       </div>
//                     </motion.a>
//                   ))}
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </section>
//   );
//
// }

"use client";
import { motion } from "framer-motion";

type Sponsor = {
  category: string;
  name: string;
  logo: string;
  description: string;
  link: string;
};

type Stall = {
  name: string;
  logo: string;
};

const sponsors: Sponsor[] = [
  {
    category: "Platinum Sponsor",
    name: "Fuji Sakura",
    logo: "/fujisakura_cover.jpg",
    description:
      "As our Platinum Sponsor, Fuji Sakura brings prestige and excellence to Hikari no Matsuri, supporting the festival’s vision of quality and elegance.",
    link: "https://fujisakuratech.com/",
  },
  {
    category: "Educational Sponsor",
    name: "DIA",
    logo: "/diamain.png",
    description:
      "DIA Foreign Language Academy, an international online platform delivering outstanding language education for learners worldwide.",
    link: "https://www.diacourses.com/",
  },
  {
    category: "Technical Sponsor",
    name: "Softrate",
    logo: "/Softrate.png",
    description:
      "Softrate fuels the technical backbone of Hikari no Matsuri, ensuring innovation and smooth operations throughout the event.",
    link: "https://softrate.com/",
  },
  {
    category: "Certificate Sponsor",
    name: "Poorvika",
    logo: "/poor.png",
    description:
      "Poorvika helps us recognize achievements at Hikari no Matsuri with certificates that create lasting memories.",
    link: "https://poorvika.com/",
  },
];

const stalls: Stall[] = [
  { name: "Shinoobee Ramen ", logo: "/shino.png" },
  { name: "Bakeology", logo: "/bake.png" },
  { name: "tongueout", logo: "/to.png" },
  { name: "Meat and eat", logo: "/meatandeat.jpg" },
  { name: "burnout", logo: "/burout.png" },
  { name: "icebay", logo: "/icebay.png" },
];

export default function Sponsors() {
  return (
    <section className="min-h-screen bg-black text-white px-10 py-16 flex flex-col items-center">
      <div className="max-w-7xl">
        {Array.from(new Set(sponsors.map((s) => s.category))).map(
          (category) => (
            <div key={category} className="mb-20">
              {/* Category Title */}
              <motion.h2
                className="text-4xl md:text-6xl font-hnm font-bold text-center text-gray-200 mb-12 underline underline-offset-8 decoration-[#dc2626]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {category.toUpperCase()}
              </motion.h2>

              {/* Sponsor Cards */}
              <div className="flex justify-center">
                {sponsors
                  .filter((s) => s.category === category)
                  .map((sponsor, idx) => (
                    <motion.a
                      key={sponsor.name}
                      href={sponsor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-[2px] rounded-2xl overflow-hidden transition-transform hover:scale-105 shadow-lg"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {/* Animated Gradient Border */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{
                          background: [
                            "linear-gradient(90deg, #facc15, #ec4899, #3b82f6, #10b981)",
                            "linear-gradient(90deg, #ec4899, #3b82f6, #10b981, #facc15)",
                            "linear-gradient(90deg, #3b82f6, #10b981, #facc15, #ec4899)",
                            "linear-gradient(90deg, #10b981, #facc15, #ec4899, #3b82f6)",
                          ],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Inner Card */}
                      <div className="relative flex flex-col items-center text-center bg-neutral-900 p-8 rounded-2xl w-100">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="h-44 w-auto object-contain mb-4"
                        />
                        <h3 className="text-2xl font-semibold text-white mb-2">
                          {sponsor.name}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {sponsor.description}
                        </p>
                        <p className="text-blue-400 mt-3 text-sm underline">
                          Visit Website
                        </p>
                      </div>
                    </motion.a>
                  ))}
              </div>
            </div>
          )
        )}

        {/* Stalls Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-5xl font-hnm font-bold text-center text-gray-200 mb-12">
            Stalls at Hikari no Matsuri
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {stalls.map((stall, idx) => (
              <motion.a
                key={stall.name}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-900 p-6 rounded-xl flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <img
                  src={stall.logo}
                  alt={stall.name}
                  className="h-28 w-auto object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stall.name}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
