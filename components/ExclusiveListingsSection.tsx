import React from "react";
import ExclusiveListingCard from "./ExclusiveListingCard";

const listings = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    title: "Kimberley Local Taxi Association",
    category: "Local Taxi Rank",
    status: "Open Now~",
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    title: "Thusano Taxi Association",
    category: "Local Taxi Rank",
    status: "24 hours open",
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "Queens Park",
    category: "Recreational Parks",
    status: "24 hours open",
  },
];

const ExclusiveListingsSection = () => {
  return (
    <section className="w-full bg-white py-16 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2 text-center">Be Part of Exclusive Club</h2>
      <p className="text-gray-500 text-md md:text-base mb-10 text-center max-w-2xl">
        Popular Exclusive Business Listings On MMID
      </p>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <ExclusiveListingCard key={listing.title} {...listing} />
        ))}
      </div>
    </section>
  );
};

export default ExclusiveListingsSection;
