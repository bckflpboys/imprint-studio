import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, excerpt, date, author, link }) => {
  return (
    <Link
      href={link}
      className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400 group"
    >
      <Image src={image} alt={title} width={400} height={192} className="w-full h-48 object-cover rounded-t-2xl" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="font-bold text-lg text-gray-800 mb-1 group-hover:text-blue-700 transition-colors truncate">
            {title}
          </div>
          <div className="text-gray-500 text-sm mb-3 line-clamp-2">{excerpt}</div>
        </div>
        <div className="flex items-center justify-between mt-auto text-xs text-gray-400">
          <span>{author}</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
