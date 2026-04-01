import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";

export default function Footer() {
  return (
    <div className="relative z-20 left-0 bottom-0 w-full">
      <footer
        className="w-full px-4 sm:px-10 py-4 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0"
        style={{ backgroundColor: "#1e2530", color: "#9ca3af" }}
      >
        {/* Logo */}
        <aside className="flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto mb-2 sm:mb-0">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "#2d3748" }}
          >
            <HiBuildingOffice2 className="w-4 h-4" style={{ color: "#60a5fa" }} />
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: "#e2e8f0" }}>
            Nest<span style={{ color: "#60a5fa" }}>Find</span>
          </span>
        </aside>

        {/* Copyright */}
        <div className="text-xs sm:text-sm text-center sm:text-left order-3 sm:order-2 mt-2 sm:mt-0">
          Copyright © {new Date().getFullYear()} - All right reserved
        </div>

        {/* Social Icons */}
        <nav className="flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto order-2 sm:order-3">
          <a
            aria-label="Twitter"
            href="#"
            className="p-2 rounded-full transition-colors duration-200"
            style={{ backgroundColor: "#2d3748" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1da1f2"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#2d3748"}
          >
            <FaTwitter className="w-4 h-4 text-gray-300" />
          </a>

          <a
            aria-label="YouTube"
            href="#"
            className="p-2 rounded-full transition-colors duration-200"
            style={{ backgroundColor: "#2d3748" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ff0000"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#2d3748"}
          >
            <FaYoutube className="w-4 h-4 text-gray-300" />
          </a>

          <a
            aria-label="Facebook"
            href="#"
            className="p-2 rounded-full transition-colors duration-200"
            style={{ backgroundColor: "#2d3748" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1877f2"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#2d3748"}
          >
            <FaFacebookF className="w-4 h-4 text-gray-300" />
          </a>
        </nav>
      </footer>
    </div>
  );
}