import React from "react";
import Image from "next/image";

const categories = [
  {
    name: "Private Individuals & Business",
    image: "/featured-listing/WhatsApp-Image-2022-11-24-at-03.00.20-372x240.jpeg",
  },
  {
    name: "Health & Medical",
    image: "/featured-listing/Healthcare-Facilities-372x240.jpg",
  },
  {
    name: "Local Taxi Rank",
    image: "/featured-listing/Local-Taxi-Ranks-372x240.jpg",
  },
  {
    name: "Hotels & Accommodation",
    image: "/featured-listing/Tourism-Sites-372x240.png",
  },
  {
    name: "Legal & Finance",
    image: "/featured-listing/pexels-erik-mclean-5864149-372x240.jpg",
  },
  {
    name: "Food & Restaurants",
    image: "/featured-listing/Shopping-Centres-364x240.jpg",
  },
];

const FeaturedListingsByCategory = () => {
  return (
    <section className="w-full bg-white py-16 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2 text-center flex items-center justify-center w-full">
        <span className="flex-1 border-t border-gray-300 mx-4" />
        Featured Listings by Category
        <span className="flex-1 border-t border-gray-300 mx-4" />
      </h2>
      <p className="text-gray-500 text-md md:text-base mb-10 text-center max-w-2xl">
        The listings for all business suited for, products and services required.
      </p>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-white"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={372}
              height={240}
              className="w-full h-48 object-cover object-center transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-blue-900/90 to-transparent">
              <span className="text-white font-semibold text-base md:text-lg bg-blue-500 px-4 py-2 rounded-lg shadow-lg">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedListingsByCategory;
