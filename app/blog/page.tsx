import BlogCard from "@/components/BlogCard";

// Sample blog posts data
const blogPosts = [
  {
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    title: "5 Ways to Grow Your Local Business Online",
    excerpt: "Discover actionable tips for expanding your reach and getting more customers using digital tools.",
    date: "Nov 10, 2025",
    author: "Jane Doe",
    link: "/blog/5-ways-to-grow-your-local-business-online",
  },
  {
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
    title: "The Power of Customer Reviews",
    excerpt: "Learn why reviews matter and how to encourage your customers to leave positive feedback.",
    date: "Nov 7, 2025",
    author: "John Smith",
    link: "/blog/the-power-of-customer-reviews",
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    title: "How to Claim Your Business on MMID",
    excerpt: "A step-by-step guide to getting your business listed and verified for maximum visibility.",
    date: "Nov 2, 2025",
    author: "Mary Johnson",
    link: "/blog/how-to-claim-your-business-on-mmid",
  },
  {
    image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&w=600&q=80",
    title: "Digital Marketing Strategies for Small Businesses",
    excerpt: "Explore effective digital marketing strategies tailored for small business owners.",
    date: "Oct 28, 2025",
    author: "Alex Brown",
    link: "/blog/digital-marketing-strategies-for-small-businesses",
  },
  {
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    title: "Maximizing Your Online Presence",
    excerpt: "Tips and tricks to ensure your business stands out in the digital landscape.",
    date: "Oct 20, 2025",
    author: "Sarah Wilson",
    link: "/blog/maximizing-your-online-presence",
  },
  {
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
    title: "SEO Basics for Local Businesses",
    excerpt: "Learn the fundamentals of SEO to help your local business rank higher on search engines.",
    date: "Oct 15, 2025",
    author: "Mike Anderson",
    link: "/blog/seo-basics-for-local-businesses",
  },
];

export default function BlogPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">MMID Blog</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Insights, tips, and strategies to help you grow your business and make the most of MMID.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        
        <div className="mt-12 text-center">
          <p className="text-gray-500">More blog posts coming soon...</p>
        </div>
      </div>
    </div>
  );
}
