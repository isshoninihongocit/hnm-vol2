"use client";
import { EvervaultCard, Icon } from "../ui/evervault-card";
import { FaLock } from "react-icons/fa6";

export function EvervaultCardDemo() {
  return (
    <div
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between w-full gap-12 px-4 sm:px-8 md:px-12 py-12"
    >
      {/* Left Side Text */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 space-y-6">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold inline-flex items-center gap-3 font-hnm">
          <h1 className="bg-gradient-to-r from-[#ff1e1e] to-[#ff7b3c] text-transparent bg-clip-text">
            プライバシーを大切に
          </h1>
          <FaLock className="text-red-600" size={36} />
        </div>

        <p className="text-neutral-200 dark:text-neutral-100 text-sm sm:text-base md:text-lg font-hnm max-w-2xl text-justify">
          At <span className="font-bold">光の祭り (Hikari no Matsuri)</span>,
          your trust is our greatest honor. We protect every participant’s
          personal information with the utmost care, following strict security
          practices inspired by the Japanese values of
          <span className="font-semibold text-[#dc2626]"> 誠 (Makoto)</span> —
          sincerity and
          <span className="font-semibold text-[#dc2626]"> 信頼 (Shinrai)</span>{" "}
          — trust. Your data remains confidential and secure, allowing you to
          celebrate freely, connect deeply, and experience the festival with
          complete peace of mind.
        </p>

        <a
          href="/privacy"
          className="inline-block font-hnm border border-red-700 dark:border-red-600 rounded-full px-4 py-2 text-red-700 dark:text-red-500 hover:bg-red-700 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition text-sm sm:text-base"
        >
          詳しく読む (Read More)
        </a>
      </div>

      {/* Right Side Card */}
      <div className="relative border border-red-700 dark:border-red-700/[0.4] w-full max-w-sm mx-auto p-4 h-[30rem] flex flex-col items-start justify-start">
        {/* Corner Icons */}
        <Icon className="absolute h-5 w-5 -top-3 -left-3 text-red-700 dark:text-red-700" />
        <Icon className="absolute h-5 w-5 -bottom-3 -left-3 text-red-700 dark:text-red-700" />
        <Icon className="absolute h-5 w-5 -top-3 -right-3 text-red-700 dark:text-red-700" />
        <Icon className="absolute h-5 w-5 -bottom-3 -right-3 text-red-700 dark:text-red-700" />

        {/* Evervault Card */}
        <EvervaultCard text="Identity" />

        {/* Card Text */}
        <h2 className="text-sm text-white font-hnm mt-4">
          Your entire identity is protected and encrypted (Hover)
        </h2>

        {/* Card Button */}
        <a
          href="/privacy"
          className="mt-4 text-sm border border-red-800/[0.8] dark:border-red-800/[0.7] text-white dark:text-white px-3 py-1 rounded-full font-hnm hover:bg-red-700 hover:text-white transition"
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default EvervaultCardDemo;
