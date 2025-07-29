import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Hikari no Matsuri" },
    { name: "description", content: "Contact Hikari no Matsuri (HNM)" },
  ];
};

export default function Contact() {
  return (
    <div className="bg-black text-white font-mono flex flex-col">
      {/* Top Red Line */}
      <div className="border-t border-[#dc2626]" />

      {/* Contact Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 px-6 py-10 md:px-20 md:py-10 border-b border-[#dc2626]">
        {/* Location */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#dc2626] font-hnm">
            Location
          </h2>
          <div className="rounded-lg overflow-hidden shadow-lg w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0045131842544!2d80.0405040758612!3d12.971562787343832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f4d07355bab5%3A0xbb6063169c4ed4d9!2sChennai%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1753607722253!5m2!1sen!2sin"
              width="80%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#dc2626] font-hnm">
            Contact Us
          </h2>
          <div>
            <a
              href="mailto:japaneseclub@citchennai.net"
              className="text-sm text-white break-words hover:text-red-500"
            >
              japaneseclub@citchennai.net
            </a>
          </div>

          <div className="flex flex-col gap-4 text-sm text-white">
            <p>
              📞 Kiran:{" "}
              <a href="tel:+918072835235" className="hover:text-red-500">
                +91-8072835235
              </a>
            </p>
            <p>
              📞 Aksshay:{" "}
              <a href="tel:+917200347086" className="hover:text-red-500">
                +91-7200347086
              </a>
            </p>
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#dc2626] font-hnm">
            Socials
          </h2>
          <div className="flex flex-col gap-6 text-sm text-white">
            <a
              href="https://www.instagram.com/_isshoni_nihongo_?igsh=MmE2bWZ5eXJvOWs0"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500"
            >
              Instagram
            </a>
            <a
              href="https://discord.gg/hnmfestival"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500"
            >
              Discord
            </a>
          </div>
        </div>

        {/* Other Links */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#dc2626] font-hnm">
            Other Links
          </h2>
          <div className="flex flex-col gap-6 text-sm text-white">
            <a href="/terms" className="hover:text-red-500">
              Terms & Conditions
            </a>
            <a href="/privacy" className="hover:text-red-500">
              Privacy Policy
            </a>
            <a href="/shipping" className="hover:text-red-500">
              Shipping Policy
            </a>
            <a href="/cancellation" className="hover:text-red-500">
              Cancellation & Refunds
            </a>
          </div>
        </div>

        {/* Payment Gateways - placed at the right */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#dc2626] font-hnm">
            Payment Gateway
          </h2>
          <a href="https://razorpay.com/" target="_blank" rel="noreferrer">
            <img
              referrerPolicy="origin"
              src="https://badges.razorpay.com/badge-dark.png"
              alt="Razorpay | Payment Gateway | Neobank"
              style={{ height: "50px", width: "150px" }}
            />
          </a>

          <a
            href="https://www.citchennai.edu.in/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              referrerPolicy="origin"
              src="/CIT_Logo.png"
              alt="CIT|Neobank"
              style={{ height: "120px", width: "170px" }}
            />
          </a>

          <a
            href="https://www.citchennai.edu.in/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              referrerPolicy="origin"
              src="/ingo.png"
              alt="CIT|Neobank"
              style={{ height: "95px", width: "190px" }}
            />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-xs text-white text-center px-4 py-4">
        <p>© 2025 Hikari no Matsuri. All Rights Reserved</p>
      </footer>
    </div>
  );
}
