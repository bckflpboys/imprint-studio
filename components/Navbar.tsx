"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import ProfileCircle from "./ProfileCircle";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Book Now", href: "#booking" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`w-full py-4 px-4 lg:px-8 flex items-center justify-between fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled ? "bg-grey-900/90 backdrop-blur-lg shadow-lg border-b border-grey-800" : "bg-transparent"}`}>
      <div className="flex items-center space-x-4">
        <Link href="/" className="block h-10 lg:h-12 w-auto relative flex items-center">
          {/* Placeholder for Logo if image fails or is missing, but keeping Image component structure */}
          <div className="text-white font-bold text-xl lg:text-2xl tracking-wider">
            STUDIO<span className="text-primary-400">NEON</span>
          </div>
          {/* Uncomment below when logo is available
          <Image
            src="/logo.png"
            alt="Imprint Media Studio"
            width={240}
            height={96}
            style={{ width: 'auto', height: '100%' }}
            className="object-contain transition-transform hover:scale-105"
            priority
            unoptimized
          />
          */}
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex space-x-8 text-white font-medium items-center">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="hover:text-primary-400 transition-colors duration-200 relative group">
              {link.name}
              <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-primary-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="hidden lg:flex items-center space-x-4 ml-6">
        {user ? (
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-grey-900 font-bold hover:from-primary-400 hover:to-primary-500 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2">
                <span>Dashboard</span>
              </button>
            </Link>
            <ProfileCircle image={user.image || undefined} name={user.name || undefined} />
          </div>
        ) : (
          <>
            <Link href="/auth?mode=signin">
              <button className="px-5 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all duration-200 font-semibold">Sign In</button>
            </Link>
            <Link href="/auth?mode=signup">
              <button className="px-5 py-2 rounded-lg bg-primary-500 text-grey-900 font-bold hover:bg-primary-400 transition-all duration-200 shadow-md hover:shadow-lg">Sign Up</button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-grey-900/95 backdrop-blur-xl transition-all duration-300 flex flex-col justify-center items-center ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col space-y-6 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl text-white font-medium hover:text-primary-400 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-8 flex flex-col space-y-4 w-64 mx-auto">
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="px-6 py-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10 transition-all duration-200 font-semibold"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/auth?mode=signin" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all duration-200 font-semibold">Sign In</button>
                </Link>
                <Link href="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-6 py-3 rounded-lg bg-primary-500 text-grey-900 font-bold hover:bg-primary-400 transition-all duration-200 shadow-lg">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
