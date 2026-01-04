import React from "react";
import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";

interface ExclusiveListingCardProps {
  image: string;
  title: string;
  category: string;
  status: string;
}

const ExclusiveListingCard: React.FC<ExclusiveListingCardProps> = ({ image, title, category, status }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden flex flex-col min-w-[320px] transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400 group">
      <div className="relative">
        <Image src={image} alt={title} width={400} height={192} className="w-full h-48 object-cover rounded-t-2xl" />
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-white/30 backdrop-blur-md bg-gradient-to-t from-black/60 to-transparent group-hover:bg-white/50 transition-all">
          <span className="flex items-center gap-2 text-white group-hover:text-blue-700 text-sm font-semibold drop-shadow">
            <FaRegBookmark className="text-lg" /> Save
          </span>
          <span className="flex items-center gap-2 text-white group-hover:text-blue-700 text-sm font-semibold drop-shadow">
            <BiShowAlt className="text-lg" /> Preview
          </span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-white/80 to-white">
        <div>
          <div className="font-bold text-lg text-gray-800 mb-1 truncate">{title}</div>
          <div className="text-blue-500 text-xs font-medium uppercase tracking-wide mb-3">{category}</div>
        </div>
        <div className="text-green-600 text-sm font-bold text-right mt-auto bg-green-50 px-3 py-1 rounded-full w-fit ml-auto shadow-sm">
          {status}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveListingCard;
