"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = ['All', 'Technology', 'Healthcare', 'Food & Dining', 'Home & Garden', 'Transportation', 'Education', 'Fitness & Sports', 'Religious Organizations'];

const HeroSection = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (searchTerm) params.append("search", searchTerm);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <section
      className="relative w-full min-h-[500px] flex flex-col justify-center items-center text-white bg-cover bg-center pt-48 md:pt-52"
      style={{ backgroundImage: "url('/home-banner.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 py-16">

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">
          Take Your Local Business Online with MMID
        </h1>
        <p className="text-lg md:text-xl mb-8 text-center drop-shadow">
          Let’s uncover the best places to eat, drink, and shop nearest to you.
        </p>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center w-full max-w-2xl bg-white bg-opacity-80 rounded-lg shadow-lg p-4 mb-6 gap-2">
          <select
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none text-gray-800 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category...</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none text-gray-800"
            type="text"
            placeholder="Search by name, service, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow"
          >
            Search
          </button>
        </form>
        <div className="text-white text-md md:text-lg mb-4">
          Just looking around? Let us suggest you something hot &amp; happening!
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
