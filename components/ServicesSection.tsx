"use client";

import React from "react";
import { FaCamera, FaVideo, FaFilm, FaPhotoVideo } from "react-icons/fa";

const services = [
    {
        title: "Photography",
        description: "Professional photography for events, portraits, products, and more. We capture the essence of every moment.",
        icon: <FaCamera className="text-4xl text-blue-500 mb-4" />,
    },
    {
        title: "Videography",
        description: "High-quality video production for weddings, corporate events, music videos, and commercials.",
        icon: <FaVideo className="text-4xl text-purple-500 mb-4" />,
    },
    {
        title: "Editing & Post-Production",
        description: "Expert editing, color grading, and special effects to bring your vision to life.",
        icon: <FaFilm className="text-4xl text-pink-500 mb-4" />,
    },
    {
        title: "Studio Sessions",
        description: "Book our fully equipped studio for your creative projects and professional shoots.",
        icon: <FaPhotoVideo className="text-4xl text-green-500 mb-4" />,
    },
];

const ServicesSection = () => {
    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We offer a wide range of media services tailored to your needs. From capturing the perfect shot to producing cinematic videos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="p-4 bg-gray-50 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
