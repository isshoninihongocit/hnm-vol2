// import { Link } from "@remix-run/react";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, login, logout } = useAuth();

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white px-6 py-4 flex items-center justify-between font-hnm">
//       <Link
//         to="/"
//         className="flex flex-col items-start group cursor-pointer select-none"
//       >
//         <img
//           src="/hnmmainwhite.png"
//           alt="Hikari no Matsuri Logo"
//           className="w-12 h-12 object-contain transition-transform group-hover:scale-150"
//         />
//       </Link>
//       <div className="flex gap-10 items-center text-2xl font-hnm uppercase">
//         <div className="flex items-center gap-1">
//           <span className="w-2 h-2 bg-red-500 inline-block rounded-sm"></span>
//           <Link to="/events" className="hover:text-red-500 transition">
//             EVENTS
//           </Link>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="w-2 h-2 bg-red-500 inline-block rounded-sm"></span>
//           <Link to="/workshop" className="hover:text-red-500 transition">
//             WORKSHOPS
//           </Link>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="w-2 h-2 bg-red-500 inline-block rounded-sm"></span>
//           <Link to="/fun" className="hover:text-red-500 transition">
//               FUN EVENTS
//           </Link>
//         </div>
//         <Link to="/registration" className="hover:text-red-500 transition">
//           Register
//         </Link>
//         <Link to="/about" className="hover:text-red-500 transition">
//           ABOUT
//         </Link>
//         <Link to="/delegates" className="hover:text-red-500 transition">
//           JAPANESE DELEGATES
//         </Link>
//         <Link to="/sponsors" className="hover:text-red-500 transition">
//           Sponsors
//         </Link>
//       </div>
//       {user ? (
//         <button
//           onClick={logout}
//           className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm uppercase font-mono"
//         >
//           Logout ({user.name})
//         </button>
//       ) : (
//         <button
//           onClick={login}
//           className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-xl uppercase font-hnm"
//         >
//           Login
//         </button>
//       )}
//     </nav>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // Lucide icons

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white px-4 py-3 md:px-6 md:py-4 font-hnm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer select-none"
        >
          <img
            src="/hnmmainwhite.png"
            alt="Hikari no Matsuri Logo"
            className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
          />
          {/* <span className="text-lg md:text-2xl font-bold">HNM</span> */}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 items-center text-base md:text-lg uppercase">
          {[
            ["events", "Events"],
            ["workshop", "Workshops"],
            ["fun", "Fun Events"],
            ["registration", "Register"],
            ["about", "About"],
            ["delegates", "Chief guest "],
            ["sponsors", "Sponsors"],
          ].map(([path, label]) => (
            <Link
              key={path}
              to={`/${path}`}
              className="hover:text-red-500 transition"
              onClick={(e) => {
                console.log(`🔗 Navbar: Clicked ${label} button, navigating to /${path}`);
                if (path === 'registration') {
                  console.log('🎯 Navbar: Register button clicked specifically');
                }
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex">
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              Logout ({user.username && user.username.trim() !== "" ? user.username : user.email})
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="lg:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mt-4 lg:hidden flex flex-col gap-4 bg-black px-4 py-6 text-base uppercase shadow-xl rounded-md">
          {[
            ["events", "Events"],
            ["workshop", "Workshops"],
            ["fun", "Fun Events"],
            ["registration", "Register"],
            ["about", "About"],
            ["delegates", "Japanese Delegates"],
            ["sponsors", "Sponsors"],
          ].map(([path, label]) => (
            <Link
              key={path}
              to={`/${path}`}
              className="hover:text-red-500 transition"
              onClick={() => {
                console.log(`🔗 Mobile Navbar: Navigating to /${path}`);
                setIsOpen(false);
              }}
            >
              {label}
            </Link>
          ))}

          {user ? (
            <button
              onClick={() => {
              logout();
              setIsOpen(false);
              }}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              Logout ({user.username && user.username.trim() !== "" ? user.username : user.email})
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
