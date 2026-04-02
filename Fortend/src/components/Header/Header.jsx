import { useEffect, useRef, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineLogout,
  HiOutlineUsers,
} from "react-icons/hi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoClose, IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/Slices/AuthSlice";

const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectEmail      = (state) => state.auth.email;
const selectRole       = (state) => state.auth.role;

function safeString(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if (typeof value.role === "string") return value.role;
    if (typeof value.name === "string") return value.name;
    return "";
  }
  return String(value);
}

const navLinks = [
  { label: "Home",  href: "/",      icon: <HiOutlineHome className="w-4 h-4" /> },
  { label: "About", href: "/about", icon: <HiOutlineInformationCircle className="w-4 h-4" /> },
];

export default function Header() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();
  const dispatch    = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const email      = useSelector(selectEmail);
  const rawRole    = useSelector(selectRole);

  const role      = safeString(rawRole);
  const safeEmail = safeString(email);

  const displayName = safeEmail
    ? safeEmail.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim()
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?";

  const isAgent = role.toUpperCase() === "AGENT";

  const roleBadgeStyle = isAgent
    ? { backgroundColor: "rgba(96,165,250,0.15)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.35)" }
    : { backgroundColor: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.35)" };

  useEffect(() => {
    function onOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  function handleDashboardClick() {
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate(isAgent ? "/agentDashboard" : "/buyerDashboard");
  }

  function handleLogout() {
    setDropdownOpen(false);
    setMenuOpen(false);
    dispatch(logout());
    navigate("/login");
  }

  return (
    <header
      className="flex py-4 px-4 sm:px-10 min-h-[70px] tracking-wide relative z-50"
      style={{
        backgroundColor: "#252d3a",
        borderBottom: "1px solid #2d3748",
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.35)",
      }}
    >
      <div className="flex items-center justify-between w-full">

        {/*  Logo  */}
        <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md"
            style={{ backgroundColor: "#2d3d55" }}
          >
            <HiBuildingOffice2 className="w-5 h-5" style={{ color: "#60a5fa" }} />
          </div>
          <span
            className="hidden lg:block text-xl font-bold tracking-tight"
            style={{ color: "#e2e8f0" }}
          >
            Nest<span style={{ color: "#60a5fa" }}>Find</span>
          </span>
        </NavLink>

        {/*  Nav ( */}
        <nav className="hidden lg:flex items-center gap-x-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ label, href, icon }) => (
            <NavLink
              key={label}
              to={href}
              end={href === "/"}
              className="flex items-center gap-1.5 font-medium text-[15px] transition-colors rounded-md px-3 py-1.5"
              style={({ isActive }) => ({
                color: isActive ? "#60a5fa" : "#9ca3af",
                backgroundColor: isActive ? "rgba(96,165,250,0.10)" : "transparent",
                borderBottom: isActive ? "2px solid #60a5fa" : "2px solid transparent",
              })}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#60a5fa";
                e.currentTarget.style.backgroundColor = "rgba(96,165,250,0.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "";
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              {({ isActive }) => (
                <>
                  <span style={{ color: isActive ? "#60a5fa" : "#4b5563" }}>{icon}</span>
                  {label}
                </>
              )}
            </NavLink>
          ))}

          {/* Dashboard */}
          {isLoggedIn && (
            <button
              onClick={handleDashboardClick}
              className="flex items-center gap-1.5 font-medium text-[15px] transition-colors rounded-md px-3 py-1.5 cursor-pointer"
              style={{ color: "#9ca3af", borderBottom: "2px solid transparent" }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#60a5fa";
                e.currentTarget.style.backgroundColor = "rgba(96,165,250,0.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#9ca3af";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <HiOutlineUsers className="w-4 h-4" style={{ color: "#4b5563" }} />
              Dashboard
            </button>
          )}
        </nav>

        {/*  Right side Actions (  */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all"
                style={{ backgroundColor: "rgba(45,61,85,0.7)", border: "1px solid #374151" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold select-none"
                  style={{ backgroundColor: "#3b82f6", color: "#fff" }}
                >
                  {initials}
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
                    {displayName}
                  </span>
                  {role && (
                    <span
                      className="text-[10px] font-medium px-1.5 rounded-full capitalize"
                      style={roleBadgeStyle}
                    >
                      {role.toLowerCase()}
                    </span>
                  )}
                </div>
                <HiOutlineChevronDown
                  className="w-3.5 h-3.5"
                  style={{
                    color: "#9ca3af",
                    transition: "transform 0.2s",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Desktop Dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl py-2 z-[200]"
                  style={{
                    backgroundColor: "#1e2530",
                    border: "1px solid #2d3748",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
                  }}
                >
                  <div className="px-4 py-2 mb-1" style={{ borderBottom: "1px solid #2d3748" }}>
                    <p className="text-sm font-semibold truncate" style={{ color: "#e2e8f0" }}>
                      {displayName}
                    </p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "#6b7280" }}>
                      {safeEmail}
                    </p>
                    {role && (
                      <span
                        className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize mt-1"
                        style={roleBadgeStyle}
                      >
                        {role.toLowerCase()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleDashboardClick}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#60a5fa"; e.currentTarget.style.backgroundColor = "rgba(96,165,250,0.07)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <HiOutlineUsers className="w-4 h-4" />
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.07)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <HiOutlineLogout className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide transition-all"
                style={{ color: "#cbd5e1", border: "1px solid #374151", backgroundColor: "transparent" }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide transition-all"
                style={{ color: "#fff", border: "1px solid #3b82f6", backgroundColor: "#3b82f6" }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="lg:hidden cursor-pointer p-1 rounded transition-colors ml-auto"
          aria-label="Open menu"
        >
          <IoMenu className="w-7 h-7" style={{ color: "#9ca3af" }} />
        </button>
      </div>

      {/*  Drawer  */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div
            className="lg:hidden fixed top-0 left-0 h-full w-[300px] z-50 flex flex-col"
            style={{
              backgroundColor: "#1e2530",
              boxShadow: "4px 0 24px rgba(0,0,0,0.5)",
            }}
          >
            {/* Drawer header  */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: "1px solid #2d3748" }}
            >
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2"
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
              </NavLink>

              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full w-8 h-8 flex items-center justify-center border cursor-pointer flex-shrink-0"
                style={{ backgroundColor: "#2d3748", borderColor: "#374151" }}
                aria-label="Close menu"
              >
                <IoClose className="w-4 h-4" style={{ color: "#e2e8f0" }} />
              </button>
            </div>

            {/* User info  */}
            {isLoggedIn && (
              <div
                className="px-5 py-4 flex items-center gap-3 flex-shrink-0"
                style={{ borderBottom: "1px solid #2d3748" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold select-none flex-shrink-0"
                  style={{ backgroundColor: "#3b82f6", color: "#fff" }}
                >
                  {initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold truncate" style={{ color: "#e2e8f0" }}>
                    {displayName}
                  </span>
                  <span className="text-xs truncate" style={{ color: "#6b7280" }}>
                    {safeEmail}
                  </span>
                  {role && (
                    <span
                      className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize mt-1 w-fit"
                      style={roleBadgeStyle}
                    >
                      {role.toLowerCase()}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Nav links */}
            <ul className="flex-1 overflow-auto px-3 py-3 space-y-1">
              {navLinks.map(({ label, href, icon }) => (
                <li key={label}>
                  <NavLink
                    to={href}
                    end={href === "/"}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 font-medium text-[15px] rounded-lg px-3 py-2.5 transition-colors w-full"
                    style={({ isActive }) => ({
                      color: isActive ? "#60a5fa" : "#9ca3af",
                      backgroundColor: isActive ? "rgba(96,165,250,0.10)" : "transparent",
                    })}
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

              {/* Dashboard  */}
              {isLoggedIn && (
                <li>
                  <button
                    onClick={handleDashboardClick}
                    className="flex items-center gap-2 font-medium text-[15px] rounded-lg px-3 py-2.5 w-full transition-colors text-left"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#60a5fa"; e.currentTarget.style.backgroundColor = "rgba(96,165,250,0.07)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <HiOutlineUsers className="w-4 h-4 flex-shrink-0" style={{ color: "#4b5563" }} />
                    Dashboard
                  </button>
                </li>
              )}

              {/* Login   */}
              {!isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 font-medium text-[15px] rounded-lg px-3 py-2.5 w-full transition-colors"
                      style={{ color: "#cbd5e1" }}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 font-medium text-[15px] rounded-lg px-3 py-2.5 w-full transition-colors"
                      style={{ color: "#60a5fa" }}
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Logout  */}
            {isLoggedIn && (
              <div className="px-3 py-4 flex-shrink-0" style={{ borderTop: "1px solid #2d3748" }}>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 font-medium text-[15px] rounded-lg px-3 py-2.5 w-full transition-colors"
                  style={{ color: "#f87171" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <HiOutlineLogout className="w-4 h-4 flex-shrink-0" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}