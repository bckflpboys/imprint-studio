"use client";

import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-center items-center text-white bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl animate-fade-in-up">
          IMPRINT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">MEDIA STUDIO</span>
        </h1>

        <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl drop-shadow-lg font-light">
          Capturing moments, creating memories. Your premier destination for professional photography and videography services.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="#booking">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 w-full sm:w-auto">
              Book a Session
            </button>
          </Link>
          <Link href="#gallery">
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg transform hover:-translate-y-1 w-full sm:w-auto">
              View Our Work
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
