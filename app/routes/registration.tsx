// Main code where the razorpay window works and everyone needs to do this one
// "use client";
// import React from "react";
// import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import CartDashboard from "~/components/CartDashboard";
//
// export const loader = () => {
//   return json({
//     RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
//   });
// };
//
// const plans = [
//   {
//     name: "General",
//     price: 100,
//     days: {
//       Day1: [
//         "Canvas Painting – Strokes of HnM",
//         "Akihabara no Quest - A Japanese X Anime quiz",
//         "O-Talku Zone! - Talk and Interact Area",
//         "Hanetsuki",
//         "Obstacle Course – Nihon Ninja Run",
//       ],
//       Day2: [
//         "Canvas Painting – Strokes of HnM",
//         "Akihabara no Quest - A Japanese X Anime quiz",
//         "O-Talku Zone! - Talk and Interact Area",
//         "Obstacle Course – Nihon Ninja Run",
//         "Musical Performance – Notes of Nippon",
//         "Artist Alley",
//       ],
//     },
//   },
//   {
//     name: "Premium",
//     price: 200,
//     days: {
//       Day1: [
//         "Watch Party",
//         "Japanese Language and Culture Workshop",
//         "Origami Workshop",
//       ],
//       Day2: [
//         "Otaku Onstage! A Cosplay Carnival",
//         "Digital Art Workshop",
//         "Kendo Workshop",
//       ],
//     },
//   },
// ];
// const workshops = [
//   { name: "Japanese Calligraphy Workshop", price: 300 },
//   { name: "Origami Advanced Session", price: 300 },
//   { name: "Ikebana - Japanese Flower Arrangement", price: 300 },
//   { name: "Tea Ceremony Experience", price: 300 },
//   { name: "Manga Drawing Basics", price: 300 },
//   { name: "Kendo Masterclass", price: 300 },
// ];
// export default function RegistrationPage() {
//   const { RAZORPAY_KEY_ID } = useLoaderData<typeof loader>();
//   const handlePayment = async (amount: number, description: string) => {
//     await loadRazorpayScript();
//     const options = {
//       key: RAZORPAY_KEY_ID,
//       amount: amount * 100,
//       currency: "INR",
//       name: "Hikari no Matsuri",
//       description,
//       handler: function (response: any) {
//         alert(
//           `Payment successful! Payment ID: ${response.razorpay_payment_id}`
//         );
//       },
//       prefill: {
//         name: "Aksshay",
//         email: "aksshay@example.com",
//       },
//       theme: { color: "#F37254" },
//     };
//
//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();
//   };
//
//   return (
//     <div className="bg-black text-white min-h-screen py-16 px-8">
//       <h1 className="text-4xl md:text-6xl font-extrabold mb-12 text-center">
//         REGISTRATION
//       </h1>
//       <div className="grid grid-cols-3 gap-4 text-center text-lg uppercase font-bold">
//         <div className="bg-red-700 py-4">PLAN</div>
//         <div className="bg-red-700 py-4">DAY 1</div>
//         <div className="bg-red-700 py-4">DAY 2</div>
//         {plans.map((plan) => (
//           <React.Fragment key={plan.name}>
//             <div className="bg-gradient-to-b from-purple-800 to-blue-800 flex flex-col items-center justify-center py-12 text-2xl">
//               <span>{plan.name}</span>
//               <button
//                 onClick={() => handlePayment(plan.price, `${plan.name} Pass`)}
//                 className="mt-4 bg-red-600 px-4 py-2 rounded-full text-sm uppercase hover:bg-red-700 transition"
//               >
//                 Pay ₹{plan.price}
//               </button>
//             </div>
//
//             <div className="bg-neutral-900 p-4 flex flex-col gap-4">
//               {plan.days.Day1.map((event) => (
//                 <div
//                   key={event}
//                   className="border border-yellow-500 py-4 px-2 rounded text-base hover:bg-yellow-600 hover:text-black transition"
//                 >
//                   {event}
//                 </div>
//               ))}
//             </div>
//             <div className="bg-neutral-900 p-4 flex flex-col gap-4">
//               {plan.days.Day2.map((event) => (
//                 <div
//                   key={event}
//                   className="border border-yellow-500 py-4 px-2 rounded text-base hover:bg-yellow-600 hover:text-black transition"
//                 >
//                   {event}
//                 </div>
//               ))}
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//       <div className="mt-20">
//         <h2 className="text-3xl md:text-5xl font-extrabold mb-8 text-center">
//           WORKSHOPS
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {workshops.map((ws) => (
//             <div
//               key={ws.name}
//               className="border border-green-500 text-center py-6 px-4 rounded-xl text-lg font-semibold hover:bg-green-500 hover:text-black transition flex flex-col items-center"
//             >
//               <span>{ws.name}</span>
//               <button
//                 onClick={() => handlePayment(ws.price, ws.name)}
//                 className="mt-4 bg-green-600 px-4 py-2 rounded-full text-sm uppercase hover:bg-green-700 transition"
//               >
//                 Pay ₹{ws.price}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
//
// async function loadRazorpayScript() {
//   if (document.getElementById("razorpay-sdk")) return;
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.id = "razorpay-sdk";
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = resolve;
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// }
// pricing acc to mac

// "use client";
//
// import { PiCheckCircleFill } from "react-icons/pi";
//
// const plans = [
//   {
//     index: 0,
//     name: "General Pass",
//     price: "₹100",
//     features: [
//       "Canvas Painting – Strokes of HnM",
//       "Akihabara no Quest - A Japanese X Anime quiz",
//       "O-Talku Zone! - Talk and Interact Area",
//       "Hanetsuki",
//       "Obstacle Course – Nihon Ninja Run",
//     ],
//     description: "Access to all main festival events and activities.",
//     buttonText: "Register Now",
//     buttonLink: "https://rzp.io/l/general-pass",
//   },
//   {
//     index: 1,
//     name: "Premium Pass",
//     price: "₹200",
//     features: [
//       "Watch Party",
//       "Japanese Language and Culture Workshop",
//       "Origami Workshop",
//       "Otaku Onstage! A Cosplay Carnival",
//       "Digital Art Workshop",
//       "Kendo Workshop",
//     ],
//     description: "Includes everything from General + exclusive premium sessions.",
//     buttonText: "Register Now",
//     buttonLink: "https://rzp.io/l/premium-pass",
//   },
// ];
//
// const workshops = [
//   {
//     name: "Japanese Calligraphy Workshop",
//     price: "₹300",
//     link: "https://rzp.io/l/japanese-calligraphy",
//   },
//   {
//     name: "Origami Advanced Session",
//     price: "₹300",
//     link: "https://rzp.io/l/origami-advanced",
//   },
//   {
//     name: "Ikebana - Japanese Flower Arrangement",
//     price: "₹300",
//     link: "https://rzp.io/l/ikebana",
//   },
//   {
//     name: "Tea Ceremony Experience",
//     price: "₹300",
//     link: "https://rzp.io/l/tea-ceremony",
//   },
//   {
//     name: "Manga Drawing Basics",
//     price: "₹300",
//     link: "https://rzp.io/l/manga-basics",
//   },
//   {
//     name: "Kendo Masterclass",
//     price: "₹300",
//     link: "https://rzp.io/l/kendo-masterclass",
//   },
// ];
//
// const RegistrationPage = () => {
//   return (
//     <div className="w-full bg-black text-white min-h-screen">
//
//       <div className="flex flex-col items-center justify-center px-6 py-20">
//         <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
//           Hikari no Matsuri <br /> Event Registration
//         </h1>
//
//         <p className="text-center text-neutral-400 mt-4 text-lg max-w-2xl">
//           Choose your pass and explore the best of Japanese culture, art, and
//           experience.
//         </p>
//
//         {/* PASS PLANS */}
//         <div className="grid md:grid-cols-2 gap-10 mt-16 w-full max-w-5xl">
//           {plans.map((plan) => (
//             <div
//               key={plan.name}
//               className="border border-neutral-700 rounded-3xl p-6 hover:border-yellow-400 transition"
//             >
//               <div className="text-3xl font-semibold mb-2 text-yellow-300">
//                 {plan.name}
//               </div>
//               <div className="text-2xl mb-4">{plan.price}</div>
//               <p className="mb-6 text-neutral-300">{plan.description}</p>
//               <ul className="mb-6">
//                 {plan.features.map((feature) => (
//                   <li key={feature} className="flex items-center py-1">
//                     <PiCheckCircleFill className="text-green-400 mr-2" />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//
//         {/* WORKSHOPS */}
//         <h2 className="text-4xl font-bold mt-24 mb-10 text-center text-pink-300">
//           Add-On Workshops
//         </h2>
//
//         <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
//           {workshops.map((workshop) => (
//             <div
//               key={workshop.name}
//               className="border border-neutral-700 rounded-xl p-6 text-center hover:border-green-400 transition"
//             >
//               <h3 className="text-xl font-semibold text-green-300">
//                 {workshop.name}
//               </h3>
//               <p className="text-lg my-2">{workshop.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default RegistrationPage;

"use client";

import { Link } from "react-router-dom";

import { PiCheckCircleFill } from "react-icons/pi";

const plans = [
  {
    index: 0,
    name: "General",
    price: "₹100",
    features: [
      "Canvas Painting – Strokes of HnM (Day 1 & 2)",
      "Akihabara no Quest – Japanese × Anime Quiz (Day 1 & 2)",
      "O-Talku Zone! – Talk and Interact Area (Day 1 & 2)",
      "Obstacle Course – Nihon Ninja Run (Day 1 & 2)",
      "Hanetsuki (Day 1)",
      "Musical Performance – Notes of Nippon (Day 2)",
      "Artist Alley (Day 2)",
      "Digital Certificate of Participation",
    ],
    style:
      " rounded-3xl  py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
    description:
      "The General Pass gives you access to the heart of Hikari no Matsuri! Join us for two days of anime quizzes, ninja runs, art, and cultural exchange — perfect for all Japanese culture enthusiasts.",
    button: "Buy Now",
  },
  {
    index: 1,
    name: "Premium",
    price: "₹200",
    features: [
      "All General Pass Events",
      "Exclusive Access to Yukata Experience – Dress Like a Native (Day 2)",
      "Shodō – Japanese Calligraphy Workshop (Day 2)",
      "VIP Seat Access for Cultural Shows & Performances",
      "Custom Event Badge & Premium Merchandise",
      "Digital Certificate of Premium Participation",
    ],
    style:
      " rounded-3xl  py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
    description:
      "Unlock the full experience of Hikari no Matsuri with our Premium Pass. Immerse yourself in Japanese culture through exclusive workshops, VIP access, and special merch. For the true Nihon enthusiast!",
    button: "Buy Now",
  },
  {
    index: 2,
    name: "Workshops & Add-Ons",
    feature: "Best",
    price: "₹300 per workshop",
    features: [
      "Includes General + Premium Pass Features",
      "Kendo Workshop",
      "Origami & Japanese Crafts",
      "Japanese Calligraphy (Shodō)",
      "Participation Certificate for each workshop",
      "Expert-led Sessions",
      "Materials Provided On-Site",
      "Limited Slots Available per Workshop",
    ],
    style:
      " h-full rounded-3xl py-10 flex flex-col  bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50  ",
    description:
      "Enhance your Hikari no Matsuri experience by enrolling in our exclusive workshops. Gain hands-on learning and cultural immersion from professionals.",
    button: "Contact Us",
  },

  {
    index: 3,
    name: "Shodo Workshop",
    price: "₹300",
    features: [
      "Traditional Japanese Calligraphy",
      "Ink & Brush Provided",
      "Hands-on Guided Session",
      "Take-home Art Piece",
      "Participation Certificate",
    ],
    style:
      " rounded-3xl  py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
    description:
      "Experience the art of Shodō — master the brush strokes of Japanese calligraphy in this culturally immersive workshop.",
    button: "Join Shodō",
  },
  {
    index: 4,
    name: "Kendo Workshop",
    price: "₹300",
    features: [
      "Intro to Japanese Swordsmanship",
      "Practice with Bamboo Shinai",
      "Kata Demonstrations",
      "Safety Gear Provided",
      "Participation Certificate",
    ],
    style:
      " h-full rounded-3xl py-10 flex flex-col  bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50  ",
    description:
      "Step into the spirit of the samurai and learn the fundamentals of Kendo — the way of the sword, taught by trained instructors.",
    button: "Join Kendo",
  },
  {
    index: 5,
    name: "Origami Workshop",
    price: "₹300",
    features: [
      "Learn Traditional Origami Techniques",
      "Create Multiple Origami Figures",
      "Paper Materials Included",
      "Cultural Storytelling Session",
      "Participation Certificate",
    ],
    style:
      " h-full rounded-3xl py-10 flex flex-col  bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50  ",
    description:
      "Unfold the stories behind paper art — join this fun and relaxing origami session with cultural insights.",
    button: "Join Origami",
  },
];
const RegistrationPage = () => {
  return (
    <div
      className="w-full  md:items-center md:justify-center
     bg-black/[0.96] antialiased 
     bg-grid-white/[0.02] relative overflow-hidden"
    >
      <div className="flex items-center justify-center flex-col   ">
        <div className="font-hnm text-[#dc2626] text-5xl pb-10 md:pb-20  px-6 text-center bg-clip-text  bg-gradient-to-b  bg-opacity-50">
          Simple Pricing <br /> Choose your plan
        </div>
        <div className="grid md:grid-cols-3 gap-6 px-6 md:w-4/5 2xl:w-3/4 cursor-pointer pb-20  items-start ">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className="h-full font-hnm text-[#dc2626] flex flex-col justify-between border rounded-3xl px-6  "
            >
              <div className={plan.style}>
                <div className="text-4xl flex text-[#dc2626] items-center">
                  {plan.name}
                  {plan.feature === "Contact Us" && (
                    <div className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full ml-4 items-center ">
                      Contact Us
                    </div>
                  )}
                </div>
                <div className="text-3xl pt-6 ">{plan.price}</div>
                <div className="py-6">{plan.description}</div>

                <ul>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-lg  py-2 flex space-x-2 items-center"
                    >
                      {/* render checkmark only for enterprise tab*/}
                      {plan.feature === "Contact Us" ? (
                        <PiCheckCircleFill className="text-blue-400 mr-2 text-xl" />
                      ) : (
                        <PiCheckCircleFill className="text-green-600 mr-2 text-xl" />
                      )}

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={plan.button}>
                {index === 0 && (
                  <a
                    href="https://rzp.io/rzp/jDBbfqeC"
                    className="rounded-3xl my-4  py-2 text-white w-full mx-auto items-center flex justify-center bg-gradient-to-r from-emerald-500 to-blue-300"
                  >
                    Buy Now
                  </a>
                )}
                {index === 1 && (
                  <a
                    href="https://rzp.io/rzp/hnm-vol2-premium"
                    className="rounded-3xl my-4  py-2 text-white w-full mx-auto items-center flex justify-center bg-gradient-to-r from-emerald-500 to-blue-300"
                  >
                    Buy Now
                  </a>
                )}
                {index === 2 && (
                  <a className="rounded-3xl my-4  py-2 text-white w-full mx-auto items-center flex justify-center bg-gradient-to-r from-purple-500 to-blue-300">
                    See below
                  </a>
                )}

                {index === 3 && (
                  <a
                    href="https://rzp.io/rzp/v3QAKNgu"
                    className="rounded-3xl my-4  py-2 text-white w-full mx-auto items-center flex justify-center bg-gradient-to-r from-purple-500 to-blue-300"
                  >
                    Buy Now
                  </a>
                )}

                {index === 4 && (
                  <a
                    href="https://rzp.io/rzp/5mlMph5"
                    className="rounded-3xl my-4  py-2 text-white w-full mx-auto items-center flex justify-center bg-gradient-to-r from-purple-500 to-blue-300"
                  >
                    Buy Now
                  </a>
                )}
                {index === 5 && (
                  <a
                    href="https://rzp.io/rzp/hnmvol2"
                    className="rounded-3xl my-4  py-2 text-white w-full mx-auto items-center flex justify-center bg-gradient-to-r from-purple-500 to-blue-300"
                  >
                    Buy Now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

// Mobile response code below

// "use client";
// import React from "react";
// import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
//
// export const loader = () => {
//   return json({
//     RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder", // fallback
//   });
// };
//
// const plans = [
//   {
//     name: "General",
//     price: 100,
//     days: {
//       Day1: [
//         "Canvas Painting – Strokes of HnM",
//         "Akihabara no Quest - A Japanese X Anime quiz",
//         "O-Talku Zone! - Talk and Interact Area",
//         "Hanetsuki",
//         "Obstacle Course – Nihon Ninja Run",
//       ],
//       Day2: [
//         "Canvas Painting – Strokes of HnM",
//         "Akihabara no Quest - A Japanese X Anime quiz",
//         "O-Talku Zone! - Talk and Interact Area",
//         "Obstacle Course – Nihon Ninja Run",
//         "Musical Performance – Notes of Nippon",
//         "Artist Alley",
//       ],
//     },
//   },
//   {
//     name: "Premium",
//     price: 200,
//     days: {
//       Day1: [
//         "Watch Party",
//         "Japanese Language and Culture Workshop",
//         "Origami Workshop",
//       ],
//       Day2: [
//         "Otaku Onstage! A Cosplay Carnival",
//         "Digital Art Workshop",
//         "Kendo Workshop",
//       ],
//     },
//   },
// ];
//
// const workshops = [
//   { name: "Japanese Calligraphy Workshop", price: 300 },
//   { name: "Origami Advanced Session", price: 300 },
//   { name: "Ikebana - Japanese Flower Arrangement", price: 300 },
//   { name: "Tea Ceremony Experience", price: 300 },
//   { name: "Manga Drawing Basics", price: 300 },
//   { name: "Kendo Masterclass", price: 300 },
// ];
//
// export default function RegistrationPage() {
//   const { RAZORPAY_KEY_ID } = useLoaderData<typeof loader>();
//
//   const handlePayment = async (amount: number, description: string) => {
//     await loadRazorpayScript();
//
//     const options = {
//       key: RAZORPAY_KEY_ID,
//       amount: amount * 100,
//       currency: "INR",
//       name: "Hikari no Matsuri",
//       description,
//       handler: function (response: any) {
//         alert(
//           `Payment successful! Payment ID: ${response.razorpay_payment_id}`
//         );
//       },
//       prefill: {
//         name: "Guest",
//         email: "guest@example.com",
//       },
//       theme: { color: "#F37254" },
//     };
//
//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();
//   };
//
//   return (
//     <div className="bg-black text-white min-h-screen py-16 px-4 sm:px-8">
//       <h1 className="text-3xl sm:text-5xl font-extrabold mb-12 text-center font-hnm">
//         REGISTRATION
//       </h1>
//
//       {/* PLAN SECTION */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm sm:text-lg font-bold">
//         <div className="bg-red-700 py-3 sm:py-4 uppercase">Plan</div>
//         <div className="bg-red-700 py-3 sm:py-4 uppercase">Day 1</div>
//         <div className="bg-red-700 py-3 sm:py-4 uppercase">Day 2</div>
//
//         {plans.map((plan) => (
//           <React.Fragment key={plan.name}>
//             <div className="bg-gradient-to-b from-purple-800 to-blue-800 flex flex-col items-center justify-center p-4 text-xl sm:text-2xl">
//               <span>{plan.name}</span>
//               <button
//                 onClick={() => handlePayment(plan.price, `${plan.name} Pass`)}
//                 className="mt-3 bg-red-600 px-4 py-2 rounded-full text-sm uppercase hover:bg-red-700 transition"
//               >
//                 Pay ₹{plan.price}
//               </button>
//             </div>
//
//             {/* Day 1 Events */}
//             <div className="bg-neutral-900 p-4 flex flex-col gap-3 text-base">
//               {plan.days.Day1.map((event) => (
//                 <div
//                   key={event}
//                   className="border border-yellow-500 py-2 px-3 rounded hover:bg-yellow-600 hover:text-black transition"
//                 >
//                   {event}
//                 </div>
//               ))}
//             </div>
//
//             {/* Day 2 Events */}
//             <div className="bg-neutral-900 p-4 flex flex-col gap-3 text-base">
//               {plan.days.Day2.map((event) => (
//                 <div
//                   key={event}
//                   className="border border-yellow-500 py-2 px-3 rounded hover:bg-yellow-600 hover:text-black transition"
//                 >
//                   {event}
//                 </div>
//               ))}
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//
//       {/* WORKSHOPS SECTION */}
//       <div className="mt-20">
//         <h2 className="text-2xl sm:text-4xl font-extrabold mb-10 text-center font-hnm">
//           WORKSHOPS
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {workshops.map((ws) => (
//             <div
//               key={ws.name}
//               className="border border-green-500 text-center py-6 px-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-green-500 hover:text-black transition flex flex-col items-center"
//             >
//               <span>{ws.name}</span>
//               <button
//                 onClick={() => handlePayment(ws.price, ws.name)}
//                 className="mt-4 bg-green-600 px-4 py-2 rounded-full text-sm uppercase hover:bg-green-700 transition"
//               >
//                 Pay ₹{ws.price}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
//
// async function loadRazorpayScript() {
//   if (document.getElementById("razorpay-sdk")) return;
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.id = "razorpay-sdk";
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = resolve;
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// }
