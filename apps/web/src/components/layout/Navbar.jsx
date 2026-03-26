"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const navLinks = [
  { label: "Dashboard", href: "/dashboard",  ready: true  },
  { label: "Transaksi", href: "/transaksi",  ready: true  },
  { label: "Budget",    href: "/budget",     ready: true },
  { label: "Laporan",   href: "/laporan",    ready: true  },
  { label: "Kategori",  href: "/kategori",   ready: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const initial = user?.username?.charAt(0).toUpperCase() ?? "U";

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 shadow-sm flex items-center px-5 h-14">

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 mr-7 no-underline">
          <img src="/img/logo.png" alt="FinSmart" className="h-8 w-auto object-contain" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex list-none gap-1">
          {navLinks.map(({ label, href, ready }) => (
            <li key={label}>
              {ready ? (
                <Link
                  href={href}
                  className={`text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg no-underline transition-colors
                    ${pathname === href
                      ? "bg-teal/10 text-teal-dark"
                      : "text-navy hover:bg-teal/10 hover:text-teal-dark"
                    }`}
                >
                  {label}
                </Link>
              ) : (
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg text-gray-300 cursor-not-allowed">
                  {label}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button className="bg-teal text-white font-bebas text-sm tracking-widest px-5 py-2 rounded-full hover:bg-teal-dark transition-colors whitespace-nowrap">
            Mode Gajian
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              {user?.foto ? (
                <img src={user.foto} alt="foto" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center text-white font-extrabold text-sm">
                  {initial}
                </div>
              )}
              <span className="font-bold text-xs tracking-widest uppercase">
                {user?.username ?? "User"}
              </span>
              <span className={`text-gray-400 text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                ▾
              </span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-xl rounded-xl py-2 w-44 border border-gray-100 z-50">
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-navy hover:bg-gray-50 no-underline transition-colors"
                >
                  <span>👤</span> Profil
                </Link>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm font-bold text-red hover:bg-red/5 transition-colors"
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden ml-auto flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 z-40 bg-white shadow-xl flex flex-col px-5 pb-5 pt-4">
          {navLinks.map(({ label, href, ready }) => (
            ready ? (
              <Link
                key={label}
                href={href}
                className={`font-bold text-sm uppercase tracking-widest py-3 border-b border-gray-100 no-underline transition-colors
                  ${pathname === href ? "text-teal" : "text-navy hover:text-teal"}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ) : (
              <span
                key={label}
                className="font-bold text-sm uppercase tracking-widest py-3 border-b border-gray-100 text-gray-300 cursor-not-allowed"
              >
                {label}
              </span>
            )
          ))}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 no-underline"
            >
              {user?.foto ? (
                <img src={user.foto} alt="foto" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center text-white font-extrabold text-sm">
                  {initial}
                </div>
              )}
              <span className="font-bold text-xs tracking-widest uppercase text-navy">
                {user?.username ?? "User"}
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red text-white font-bebas text-sm tracking-widest px-4 py-2 rounded-full hover:opacity-90 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
