import React from "react";
import Image from "next/image";

const GrowOnlineBanner = () => {
  return (
    <section className="w-full flex justify-center py-10 bg-white">
      <div className="w-full max-w-6xl bg-white rounded-xl flex flex-col md:flex-row items-center p-6 md:p-10 shadow-xl border border-blue-400">
        <Image
          src="https://img.freepik.com/free-vector/financial-growth-concept-illustration_114360-5435.jpg?w=400"
          alt="Grow Online"
          width={176}
          height={176}
          className="w-44 h-44 object-contain mb-6 md:mb-0 md:mr-10 drop-shadow-lg"
        />
        <div className="flex-1 text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-blue-700 leading-tight">
            Take Your Local Business Online<br />
            <span className="text-blue-500">and Grow Like a Pro</span>
          </h2>
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            Update your business details including hours, payment options and more.
          </p>
          <div className="text-xl md:text-2xl font-bold text-blue-700 mb-2">
            Many of the benefits of <span className="font-extrabold text-blue-600">MMID</span> are <span className="font-extrabold text-green-600">free!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowOnlineBanner;
