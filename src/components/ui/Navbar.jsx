"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, LogIn, User } from "lucide-react";
import { useAuth } from "@/components/context/AuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const { user, isAuthenticated, logout } = useAuth(); // 🔥 PAKAI CONTEXT

  const isShopPage =
    pathname.startsWith("/products") ||
    pathname.startsWith("/collections");

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topLinks = [
    { name: "Koleksi", path: "/collections" },
    { name: "Semua Produk", path: "/products" },
  ];

  const bottomLinks = [
    { name: "Home", path: "/#home" },
    { name: "Tentang Kami", path: "/#about" },
    { name: "Nilai Kami", path: "/#value" },
    { name: "Tim Kami", path: "/#ourteam" },
    { name: "Kontak", path: "/#contact" },
  ];

  const getTextColor = (active = false) => {
    if (active) return "text-cyan-400";

    if (isShopPage || isScrolled) {
      return "text-gray-600 hover:text-cyan-600";
    }

    return "text-white hover:text-cyan-300";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isShopPage
          ? "bg-white/90 backdrop-blur-lg shadow"
          : isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow"
          : "bg-transparent"
      }`}
    >
      <div className="relative">

        {/* LOGO */}
        <Link
          href="/"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50"
        >
          <img
            src="/Logonavbar.png"
            alt="Arthakara Logo"
            className="h-10 sm:h-12 md:h-18 w-auto object-contain"
          />
        </Link>

        {/* ================= TOP NAVBAR ================= */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 pl-24 flex items-center justify-end h-12 text-sm">

            <div className="flex items-center gap-3 sm:gap-4">

              {/* DESKTOP LINKS */}
              <div className="hidden md:flex items-center gap-4">
                {topLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`transition ${getTextColor(
                      isActive(link.path)
                    )}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* SEARCH */}
              <button className={`transition ${getTextColor()}`}>
                <Search size={18} />
              </button>

              {/* AUTH SECTION */}
              {!isAuthenticated ? (
                <>
                  <Link href="/login" className="hidden md:block">
                    <button
                      className={`flex items-center gap-1 transition ${getTextColor()}`}
                    >
                      <LogIn size={16} />
                      Login
                    </button>
                  </Link>

                  <Link href="/signup" className="hidden md:block">
                    <button
                      className={`px-3 py-1 rounded-md text-xs transition ${
                        isShopPage || isScrolled
                          ? "bg-cyan-500 text-white hover:bg-cyan-600"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  
                  {/* PROFILE */}
                  <Link href="/profile">
                    <button
                      className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                        isShopPage || isScrolled
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <User size={16} />
                      {user?.name || "Profile"}
                    </button>
                  </Link>

                  {/* LOGOUT */}
                  <button
                    onClick={logout}
                    className="hidden md:block text-sm text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}

              {/* MOBILE BUTTON */}
              <button
                className={`md:hidden ${getTextColor()}`}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM NAVBAR ================= */}
        <div className="max-w-7xl mx-auto px-4 pl-24 flex items-center justify-end h-14 md:h-16">
          <div className="hidden md:flex items-center gap-8">
            {bottomLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`transition font-medium ${getTextColor(
                  isActive(link.path)
                )}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white px-4 py-5 space-y-4 shadow-lg">

          {topLinks.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setIsMobileOpen(false)}>
              {link.name}
            </Link>
          ))}

          <hr />

          {bottomLinks.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setIsMobileOpen(false)}>
              {link.name}
            </Link>
          ))}

          <hr />

          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <button className="w-full py-1.5 border rounded">
                  Login
                </button>
              </Link>

              <Link href="/signup">
                <button className="w-full py-1.5 bg-cyan-500 text-white rounded">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile">
                <button className="w-full py-1.5 bg-gray-100 rounded">
                  {user?.name || "Profile"}
                </button>
              </Link>

              <button
                onClick={logout}
                className="w-full py-1.5 text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}