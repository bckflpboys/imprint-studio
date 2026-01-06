"use client";

import React from "react";
import { FaCamera, FaVideo, FaFilm, FaPhotoVideo, FaMicrophone } from "react-icons/fa";

const services = [
    {
        title: "Photography",
        description: "Professional photography for events, portraits, products, and more. We capture the essence of every moment with precision and artistry.",
        icon: <FaCamera className="text-5xl text-blue-600 group-hover:text-white transition-colors duration-300" />,
        gradient: "from-blue-500 to-cyan-500",
        delay: "0s",
    },
    {
        title: "Videography",
        description: "High-quality video production for weddings, corporate events, music videos, and commercials. Cinematic storytelling at its finest.",
        icon: <FaVideo className="text-5xl text-purple-600 group-hover:text-white transition-colors duration-300" />,
        gradient: "from-purple-500 to-pink-500",
        delay: "0.2s",
    },
    {
        title: "Editing & Post-Production",
        description: "Expert editing, color grading, and special effects to bring your vision to life. We polish your raw footage into a masterpiece.",
        icon: <FaFilm className="text-5xl text-pink-600 group-hover:text-white transition-colors duration-300" />,
        gradient: "from-pink-500 to-rose-500",
        delay: "0.4s",
    },
    {
        title: "Studio Sessions",
        description: "Book our fully equipped studio for your creative projects and professional shoots. State-of-the-art lighting and backdrops available.",
        icon: <FaPhotoVideo className="text-5xl text-green-600 group-hover:text-white transition-colors duration-300" />,
        gradient: "from-green-500 to-emerald-500",
        delay: "0.6s",
    },
    {
        title: "Podcast Production",
        description: "Professional audio recording and mixing for your podcasts. High-quality sound engineering to ensure your voice is heard clearly.",
        icon: <FaMicrophone className="text-5xl text-orange-600 group-hover:text-white transition-colors duration-300" />,
        gradient: "from-orange-500 to-red-500",
        delay: "0.8s",
    },
];

const ServicesSection = () => {
    return (
        <section id="services" className="py-24 bg-white relative overflow-hidden">
            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                        We offer a wide range of media services tailored to your needs. From capturing the perfect shot to producing cinematic videos, we bring your creative vision to reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-white border-2 border-gray-400 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:border-transparent transition-all duration-500 animate-float"
                            style={{ animationDelay: service.delay }}
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10`} />

                            <div className="relative z-10 flex flex-col items-center text-center h-full">
                                <div className="mb-8 p-4 bg-gray-50 rounded-2xl group-hover:bg-white/20 transition-colors duration-300 shadow-sm group-hover:shadow-inner">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
