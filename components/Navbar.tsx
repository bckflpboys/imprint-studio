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

  return (
    <nav className={`w-full py-4 px-4 lg:px-8 flex items-center justify-between fixed top-0 left-0 z-50 transition-all duration-300 bg-black/80 backdrop-blur-lg ${scrolled ? "shadow-lg" : ""}`}>
      <div className="flex items-center space-x-4">
        <Link href="/" className="block h-10 lg:h-12 w-auto relative">
          <Image
            src="/logo.png"
            alt="Multi Media Interactive Directory"
            width={240}
            height={96}
            style={{ width: 'auto', height: '100%' }}
            className="object-contain transition-transform hover:scale-105"
            priority
            unoptimized
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex space-x-8 lg:space-x-10 text-white font-medium items-center">
        <li>
          <Link href="/" className="hover:text-blue-400 transition-colors duration-200 relative group">
            Home
            <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </li>
        <li className="flex items-center space-x-3">
          <Link href="/listings">
            <button className="px-4 lg:px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
              View Listings
            </button>
          </Link>
          <Link href="/listings/new">
            <button className="px-4 lg:px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
              Create Listing
            </button>
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-blue-400 transition-colors duration-200 relative group">
            Blog
            <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-400 transition-colors duration-200 relative group">
            Contact
            <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </li>
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="hidden lg:flex items-center space-x-4 ml-6">
        {user ? (
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2">
                <span>Dashboard</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </Link>
            <ProfileCircle image={user.image || undefined} name={user.name || undefined} />
          </div>
        ) : (
          <>
            <Link href="/auth?mode=signin">
              <button className="px-5 py-2.5 rounded-lg border border-blue-400 text-blue-400 bg-white bg-opacity-90 hover:bg-opacity-100 hover:bg-blue-50 transition-all duration-200 font-semibold shadow-sm hover:shadow-md">Sign In</button>
            </Link>
            <Link href="/auth?mode=signup">
              <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">Sign Up</button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-lg transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col space-y-4 p-6 max-h-[500px] overflow-y-auto">
          <Link href="/" className="text-white font-medium hover:text-blue-400 transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <div className="space-y-3 w-full">
            <Link href="/listings" className="flex justify-center" onClick={() => setMobileMenuOpen(false)}>
              <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 w-full">
                View Listings
              </button>
            </Link>
            <Link href="/listings/new" className="flex justify-center" onClick={() => setMobileMenuOpen(false)}>
              <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 w-full">
                Create Listing
              </button>
            </Link>
          </div>
          <Link href="/blog" className="text-white font-medium hover:text-blue-400 transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/contact" className="text-white font-medium hover:text-blue-400 transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>

          {user && (
            <>
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden border border-blue-400">
                    {user.image ? (
                      <Image src={user.image} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-blue-700 font-bold text-lg">
                        {user.name ? user.name[0].toUpperCase() : "?"}
                      </span>
                    )}
                  </div>
                  <span className="text-white font-medium">{user.name || "User"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/dashboard" className="text-white font-medium hover:text-blue-400 transition-colors duration-200 block" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/privacy-policy" className="text-white font-medium hover:text-blue-400 transition-colors duration-200 block" onClick={() => setMobileMenuOpen(false)}>
                  Privacy Policy
                </Link>
                <Link href="/tos" className="text-white font-medium hover:text-blue-400 transition-colors duration-200 block" onClick={() => setMobileMenuOpen(false)}>
                  Terms of Service
                </Link>
              </div>
            </>
          )}

          <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="px-5 py-2.5 rounded-lg border border-red-400 text-red-400 bg-white bg-opacity-90 hover:bg-opacity-100 hover:bg-red-50 transition-all duration-200 font-semibold shadow-sm hover:shadow-md w-full"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/auth?mode=signin" onClick={() => setMobileMenuOpen(false)}>
                  <button className="px-5 py-2.5 rounded-lg border border-blue-400 text-blue-400 bg-white bg-opacity-90 hover:bg-opacity-100 hover:bg-blue-50 transition-all duration-200 font-semibold shadow-sm hover:shadow-md w-full">Sign In</button>
                </Link>
                <Link href="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                  <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 w-full">Sign Up</button>
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
