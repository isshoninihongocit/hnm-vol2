import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Hikari no Matsuri" },
    { name: "description", content: "Contact Hikari no Matsuri (HNM)" },
  ];
};

export default function Contact() {
  return (
    <div className="bg-black text-white font-mono flex flex-col justify-between min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 border-b border-neutral-800">
        {/* Contact Info */}
        <div>
          <p className="text-lg font-semibold">// CONTACT US AT</p>
          <p className="text-gray-400 mt-4">contact@hnmfestival.jp</p>
        </div>

        {/* Socials */}
        <div>
          <p className="text-lg font-semibold">// OUR SOCIALS</p>
          <div className="space-x-6 text-gray-400 mt-4">
            <a
              href="https://twitter.com/hnmfestival"
              target="_blank"
              rel="noreferrer"
            >
              TWITTER
            </a>
            <a
              href="https://discord.gg/hnmfestival"
              target="_blank"
              rel="noreferrer"
            >
              DISCORD
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-xs flex flex-col md:flex-row md:justify-between items-center px-4 py-6 border-t border-neutral-800 gap-4">
        <div className="flex flex-wrap justify-center gap-4 text-gray-400">
          <a href="/terms" className="hover:underline">
            Terms and Conditions
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/shipping" className="hover:underline">
            Shipping Policy
          </a>
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
          <a href="/cancellation" className="hover:underline">
            Cancellation & Refunds
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-neutral-500">
          <p>© HIKARI NO MATSURI 2024</p>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
}
