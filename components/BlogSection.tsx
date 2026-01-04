import React from "react";
import BlogCard from "./BlogCard"; // Assuming BlogCard is in the same directory

const blogPosts = [
  {
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    title: "5 Ways to Grow Your Local Business Online",
    excerpt: "Discover actionable tips for expanding your reach and getting more customers using digital tools.",
    date: "Nov 10, 2025",
    author: "Jane Doe",
    link: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
    title: "The Power of Customer Reviews",
    excerpt: "Learn why reviews matter and how to encourage your customers to leave positive feedback.",
    date: "Nov 7, 2025",
    author: "John Smith",
    link: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    title: "How to Claim Your Business on MMID",
    excerpt: "A step-by-step guide to getting your business listed and verified for maximum visibility.",
    date: "Nov 2, 2025",
    author: "Mary Johnson",
    link: "#",
  },
];

const BlogSection = () => {
  return (
    <section className="w-full bg-gray-50 py-16 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2 text-center">From the Blog</h2>
      <p className="text-gray-500 text-md md:text-base mb-10 text-center max-w-2xl">
        Insights, tips, and stories to help you make the most of MMID and grow your business.
      </p>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.title}
            image={post.image}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            author={post.author}
            link={post.link}
          />
        ))}
      </div>
      <div className="mt-12">
        <a href="/blog" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
          View All Blog Posts →
        </a>
      </div>
    </section>
  );
};

export default BlogSection;
