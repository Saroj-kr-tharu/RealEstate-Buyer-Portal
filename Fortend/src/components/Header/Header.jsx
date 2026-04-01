import { useState } from "react";
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineUsers
} from "react-icons/hi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/", icon: <HiOutlineHome className="w-4 h-4" /> },
  { label: "Agent", href: "/agent", icon: <HiOutlineUsers className="w-4 h-4" /> },
  { label: "About", href: "/about", icon: <HiOutlineInformationCircle className="w-4 h-4" /> },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header
      className="flex py-4 px-4 sm:px-10 min-h-[70px] tracking-wide relative z-50"
      style={{
        backgroundColor: "#252d3a",
        borderBottom: "1px solid #2d3748",
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.35)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md transition-colors"
            style={{ backgroundColor: "#2d3d55" }}
          >
            <HiBuildingOffice2 className="w-5 h-5" style={{ color: "#60a5fa" }} />
          </div>
          <span className="max-sm:hidden text-xl font-bold tracking-tight" style={{ color: "#e2e8f0" }}>
            Nest<span style={{ color: "#60a5fa" }}>Find</span>
          </span>
        </NavLink>

        {/* Mobile logo (icon only) */}
        <NavLink to="/" className="hidden max-sm:flex items-center">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md"
            style={{ backgroundColor: "#2d3d55" }}
          >
            <HiBuildingOffice2 className="w-5 h-5" style={{ color: "#60a5fa" }} />
          </div>
        </NavLink>

        {/* Nav Menu */}
        <div
          className={`lg:block ${menuOpen ? "block" : "hidden"} max-lg:fixed max-lg:inset-0 max-lg:z-50`}
        >
          {/* Backdrop */}
          {menuOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black opacity-60 z-40"
              onClick={toggleMenu}
            />
          )}

          {/* Close button (mobile) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full w-9 h-9 flex items-center justify-center border cursor-pointer shadow-sm transition-colors"
            style={{ backgroundColor: "#2d3748", borderColor: "#374151" }}
            aria-label="Close menu"
          >
            <IoClose className="w-4 h-4" style={{ color: "#e2e8f0" }} />
          </button>

          <ul
            className="lg:flex gap-x-1 max-lg:space-y-1 max-lg:fixed max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:overflow-auto z-50"
            style={
              typeof window !== "undefined" && window.innerWidth < 1024
                ? { backgroundColor: "#1e2530", boxShadow: "4px 0 24px rgba(0,0,0,0.4)" }
                : {}
            }
          >
            {/* Mobile menu logo */}
            <li
              className="mb-6 hidden max-lg:flex items-center gap-2 pb-4"
              style={{ borderBottom: "1px solid #374151" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md"
                style={{ backgroundColor: "#2d3d55" }}
              >
                <HiBuildingOffice2 className="w-5 h-5" style={{ color: "#60a5fa" }} />
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ color: "#e2e8f0" }}>
                Nest<span style={{ color: "#60a5fa" }}>Find</span>
              </span>
            </li>

            {navLinks.map(({ label, href, icon }) => (
              <li
                key={label}
                className="max-lg:border-b max-lg:py-3 px-3"
                style={{ borderColor: "#2d3748" }}
              >
                <NavLink
                  to={href}
                  end={href === "/"}
                  className="flex items-center gap-1.5 font-medium text-[15px] transition-colors rounded-md px-2 py-1"
                  style={({ isActive }) => ({
                    color: isActive ? "#60a5fa" : "#9ca3af",
                    backgroundColor: isActive ? "rgba(96,165,250,0.10)" : "transparent",
                    borderBottom: isActive ? "2px solid #60a5fa" : "2px solid transparent",
                  })}
                  onMouseEnter={e => {
                    if (!e.currentTarget.classList.contains("active")) {
                      e.currentTarget.style.color = "#60a5fa";
                      e.currentTarget.style.backgroundColor = "rgba(96,165,250,0.06)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!e.currentTarget.classList.contains("active")) {
                      e.currentTarget.style.color = "#9ca3af";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span style={{ color: isActive ? "#60a5fa" : "#4b5563" }}>{icon}</span>
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex max-lg:ml-auto items-center space-x-3">
          <Link to="/login" 
            className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide transition-all"
            style={{ color: "#cbd5e1", border: "1px solid #374151", backgroundColor: "transparent" }}
          >
            Login 
          </Link>
          <Link to="/signup" 
            className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide transition-all"
            style={{ color: "#fff", border: "1px solid #3b82f6", backgroundColor: "#3b82f6" }}
           
          >
            Sign up
          </Link>

          {/* Hamburger (mobile) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden cursor-pointer p-1 rounded transition-colors"
            aria-label="Open menu"
          >
            <IoMenu className="w-7 h-7" style={{ color: "#9ca3af" }} />
          </button>
        </div>

      </div>
    </header>
  );
}