'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export interface BusinessListing {
  id: string;
  slug?: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviews: number;
  image: string;
  featured: boolean;
  verified: boolean;
  tags: string[];
  coordinates?: { lat: number; lng: number };
}

interface ListingCardProps {
  listing: BusinessListing;
  isHovered?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, isHovered = false }) => {
  const router = useRouter();

  const handleCardClick = () => {
    // Use slug if available, otherwise fall back to id
    const urlPath = listing.slug || listing.id;
    router.push(`/listings/${urlPath}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden group border flex flex-col h-full cursor-pointer ${isHovered
        ? 'shadow-2xl border-blue-400 bg-blue-50'
        : 'border-gray-100 hover:shadow-2xl hover:border-blue-400 hover:bg-blue-50'
        }`}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={listing.image || '/featured-listing/Healthcare-Facilities-372x240.jpg'}
          alt={listing.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.featured && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              Featured
            </div>
          )}
        </div>

        {listing.verified && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-green-600 p-2 rounded-full shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 mb-1">
              {listing.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {listing.category}
            </div>
          </div>

          <div className="flex flex-col items-end bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-lg border border-yellow-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-gray-900 font-bold">{listing.rating}</span>
            </div>
            <span className="text-xs text-gray-600">({listing.reviews} reviews)</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {listing.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {listing.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-medium">
              {tag}
            </span>
          ))}
          {listing.tags.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
              +{listing.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 text-sm">
          <div className={`flex items-center transition-colors duration-200 ${isHovered ? 'text-blue-700' : 'text-gray-600'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-200 ${isHovered ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <svg className={`w-4 h-4 transition-colors duration-200 ${isHovered ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="truncate">{listing.address}</span>
          </div>
          <div className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="font-medium">{listing.phone}</span>
          </div>
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1"></div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4">
          <button
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
          >
            View Details
          </button>
          <a
            href={`tel:${listing.phone}`}
            className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
