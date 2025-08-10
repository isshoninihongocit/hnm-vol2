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

"use client";
import { motion } from "framer-motion";

type Sponsor = {
  category: string;
  name: string;
  logo: string;
  description: string;
  link: string;
};

const sponsors: Sponsor[] = [
  {
    category: "Platinum Sponsor",
    name: "Fuji Sakura",
    logo: "/fujisakura_cover.jpg",
    description:
      "Naturals, India's No.1 salon brand, is redefining beauty and grooming with style and innovation. Proud sponsor of Hackerz 25!",
    link: "https://naturals.in/",
  },
  {
    category: "Educational Sponsor",
    name: "DIA",
    logo: "/diamain.png",
    description:
      "DIA is reshaping the way we learn. Proud supporter of Hackerz 25’s educational initiatives.",
    link: "#",
  },
  {
    category: "Technical Sponsor",
    name: "Softrate",
    logo: "/Softrate.png",
    description:
      "Softrate provides innovative software solutions and is proud to support Hackerz 25 as our technical sponsor!",
    link: "https://softrate.com/",
  },
  {
    category: "Refreshment Sponsor",
    name: "Cool Drinks",
    logo: "/cooldrinks.png",
    description:
      "Refreshing all the minds at Hackerz 25! Cool Drinks is our go-to refreshment sponsor keeping the energy up.",
    link: "#",
  },
  {
    category: "Food Truck Sponsor",
    name: "Yummy Trucks",
    logo: "/yummy.png",
    description:
      "Yummy Trucks serves delicious bites and vibes during HNM vol2!",
    link: "#",
  },
  {
    category: "Certificate Sponsor",
    name: "Poorvika",
    logo: "/poor.png",
    description:
      "Proudly sponsoring all certificates of achievement and participation for HNM attendees.",
    link: "https://poorvika.com/",
  },
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
      </div>
    </section>
  );
}
