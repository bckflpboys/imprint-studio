import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team - MMID",
  description: "Meet the dedicated team behind MMID, working to connect local businesses and communities.",
  openGraph: {
    title: "Our Team - MMID",
    description: "Meet the dedicated team behind MMID, working to connect local businesses and communities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team - MMID",
    description: "Meet the dedicated team behind MMID, working to connect local businesses and communities.",
  },
};

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "/team/john-doe.jpg",
    bio: "John is passionate about empowering local businesses with digital tools to thrive in the modern economy.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Jane Smith",
    role: "Chief Technology Officer",
    image: "/team/jane-smith.jpg",
    bio: "Jane leads our tech team, ensuring our platform is innovative, secure, and user-friendly.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Michael Brown",
    role: "Marketing Director",
    image: "/team/michael-brown.jpg",
    bio: "Michael crafts strategies to spread the word about MMID and engage with our community.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Sarah Wilson",
    role: "Community Manager",
    image: "/team/sarah-wilson.jpg",
    bio: "Sarah builds strong relationships with local businesses and ensures their voices are heard.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

const TeamsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative w-full bg-blue-700 text-white py-16 mb-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMCAxIDEgMiAyIDJoMnYtNGgtMmMtMSAwLTIgMS0yIDJ6TTMwIDRDMTMuNDMxIDQgMCAxNy40MzEgMCAzNHMxMy40MzEgMzAgMzAgMzAgMzAtMTMuNDMxIDMwLTMwUzQ2LjU2OSA0IDMwIDR6TTEwLjIyNSA0Mi42OGMtNS41NTYtOS45NDItMi4zLTIyLjUyNyA3LjY0MS0yOC4wODJDMjcuODA5IDkuMDQyIDQwLjM5NSAxMi4yOTcgNDUuOTUgMjIuMjM5YzUuNTU2IDkuOTQzIDIuMyAyMi41MjgtNy42NDEgMjguMDgyLTkuOTQyIDUuNTU1LTIyLjUyNyAyLjMtMjguMDg0LTcuNjQxeiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat repeat" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Meet Our Team</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-3xl">The dedicated individuals behind MMID, working together to empower local businesses and communities.</p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="container mx-auto px-4 py-16 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100">
              <div className="relative h-56 bg-gray-200">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  width={400}
                  height={224}
                  className="w-full h-full object-cover object-center" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-16"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{member.bio}</p>
                <div className="flex space-x-3 mt-auto">
                  <a href={member.social.linkedin} className="text-blue-700 hover:text-blue-900 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
                  </a>
                  <a href={member.social.twitter} className="text-blue-500 hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="w-full bg-blue-50 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Join Our Team</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">We&apos;re always looking for talented individuals passionate about helping local businesses grow. If you share our vision, we&apos;d love to hear from you.</p>
          <a href="#" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">See Open Positions</a>
        </div>
      </section>
    </div>
  );
};

export default TeamsPage;
