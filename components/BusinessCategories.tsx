"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaLaptop, FaHospital, FaCar, FaUtensils, FaDumbbell } from "react-icons/fa";

const categories = [
  { icon: <FaLaptop size={32} />, label: "Technology" },
  { icon: <FaHospital size={32} />, label: "Healthcare" },
  { icon: <FaCar size={32} />, label: "Transportation" },
  { icon: <FaUtensils size={32} />, label: "Food & Dining" },
  { icon: <FaDumbbell size={32} />, label: "Fitness & Sports" },
];

const BusinessCategories = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryLabel: string) => {
    router.push(`/listings?category=${encodeURIComponent(categoryLabel)}`);
  };
  return (
    <section className="w-full bg-white pb-16 pt-8 flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-6 mb-10 -mt-16 z-10 relative">
        {categories.map((cat, idx) => (
          <div
            key={cat.label}
            onClick={() => handleCategoryClick(cat.label)}
            className="flex flex-col items-center justify-between bg-blue-500 text-white px-6 py-6 rounded-lg shadow-lg w-[160px] h-[160px] hover:bg-blue-600 transition-all duration-200 cursor-pointer"
            style={{ marginTop: idx === 2 ? 0 : undefined }}
          >
            <div className="flex-1 flex items-center justify-center">{cat.icon}</div>
            <div className="font-semibold text-base text-center">{cat.label}</div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
        Checkout Businesses in your area
      </h2>
      <p className="text-gray-500 text-md md:text-lg text-center">
        Support Local &amp; Help Grow Our Local Economy
      </p>
    </section>
  );
};

export default BusinessCategories;
