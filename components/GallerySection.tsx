"use client";

import React from "react";
import Image from "next/image";

// Placeholder data for gallery items
const galleryItems = [
    { id: 1, type: "photo", src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Wedding Photography" },
    { id: 2, type: "video", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Nature Shot" },
    { id: 3, type: "photo", src: "https://images.unsplash.com/photo-1554048612-387768052bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Studio Portrait" },
    { id: 4, type: "photo", src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Event Photography" },
    { id: 5, type: "video", src: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Cinematic Video" },
    { id: 6, type: "photo", src: "https://images.unsplash.com/photo-1511285560982-1356c11d4606?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Fashion Shoot" },
];

const GallerySection = () => {
    return (
        <section id="gallery" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A glimpse into our portfolio. We take pride in every project we undertake.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryItems.map((item) => (
                        <div key={item.id} className="relative group overflow-hidden rounded-xl shadow-md aspect-[4/3]">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">{item.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 bg-transparent border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300">
                        View Full Gallery
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
