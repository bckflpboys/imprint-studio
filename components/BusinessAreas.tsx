import React from "react";
import Image from "next/image";

const areas = [
  {
    name: "Vergenoeg",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    listings: 0,
  },
  {
    name: "Tshwaragano",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    listings: 0,
  },
  {
    name: "Roodepan",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    listings: 2,
  },
  {
    name: "North View",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    listings: 0,
  },
  // Add more areas as needed
];

const BusinessAreas = () => {
  return (
    <section className="w-full bg-white py-8 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {areas.map((area) => (
          <div
            key={area.name}
            className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
          >
            <Image
              src={area.image}
              alt={area.name}
              width={400}
              height={208}
              className="w-full h-52 object-cover object-center transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <div className="text-white font-bold text-lg drop-shadow mb-1 transform transition-all duration-300 translate-y-0 group-hover:-translate-y-4">
                {area.name}
              </div>
              <div className="text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-4">
                {area.listings} Listing{area.listings !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessAreas;
