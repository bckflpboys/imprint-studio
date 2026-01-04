"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ListingCard, { BusinessListing } from '@/components/ListingCard';
import BusinessMap from '@/components/BusinessMap';

// Mock data with coordinates
const mockListings: BusinessListing[] = [
  {
    id: '1',
    name: 'Tech Solutions Inc.',
    category: 'Technology',
    description: 'Leading IT consulting and software development company providing innovative solutions for businesses of all sizes.',
    address: '123 Bultfontein Road, Kimberley, 8301',
    phone: '+27 (53) 123-4567',
    email: 'info@techsolutions.co.za',
    website: 'www.techsolutions.co.za',
    rating: 4.8,
    reviews: 127,
    image: '/featured-listing/Healthcare-Facilities-372x240.jpg',
    featured: true,
    verified: true,
    tags: ['IT Services', 'Software Development', 'Consulting'],
    coordinates: { lat: -28.7282, lng: 24.7499 }
  },
  {
    id: '2',
    name: 'Green Landscaping Co.',
    category: 'Home & Garden',
    description: 'Professional landscaping services offering garden design, maintenance, and outdoor living solutions.',
    address: '456 Memorial Road, Kimberley, 8301',
    phone: '+27 (53) 234-5678',
    email: 'contact@greenlandscaping.co.za',
    website: 'www.greenlandscaping.co.za',
    rating: 4.6,
    reviews: 89,
    image: '/featured-listing/Local-Churches-372x240.jpg',
    featured: true,
    verified: true,
    tags: ['Landscaping', 'Garden Design', 'Maintenance'],
    coordinates: { lat: -28.7000, lng: 24.7200 }
  },
  {
    id: '3',
    name: 'MediCare Health Center',
    category: 'Healthcare',
    description: 'Comprehensive healthcare facility providing medical services, urgent care, and specialized treatments.',
    address: '789 Long Street, Kimberley, 8301',
    phone: '+27 (53) 345-6789',
    email: 'info@medicarehealth.co.za',
    website: 'www.medicarehealth.co.za',
    rating: 4.9,
    reviews: 234,
    image: '/featured-listing/Healthcare-Facilities-372x240.jpg',
    featured: true,
    verified: true,
    tags: ['Healthcare', 'Medical Services', 'Urgent Care'],
    coordinates: { lat: -28.7500, lng: 24.7800 }
  },
  {
    id: '4',
    name: 'Quick Taxi Services',
    category: 'Transportation',
    description: 'Reliable taxi and transportation services available 24/7 for local and long-distance travel.',
    address: '321 Transvaal Road, Kimberley, 8301',
    phone: '+27 (53) 456-7890',
    email: 'book@quicktaxi.co.za',
    website: 'www.quicktaxi.co.za',
    rating: 4.4,
    reviews: 156,
    image: '/featured-listing/Local-Taxi-Ranks-372x240.jpg',
    featured: false,
    verified: false,
    tags: ['Taxi', 'Transportation', 'Airport Transfer'],
    coordinates: { lat: -28.6800, lng: 24.7100 }
  },
  {
    id: '5',
    name: 'Divine Worship Church',
    category: 'Religious Organizations',
    description: 'Welcoming community church offering spiritual guidance, worship services, and community programs.',
    address: '654 Chapel Street, Kimberley, 8301',
    phone: '+27 (53) 567-8901',
    email: 'info@divineworship.co.za',
    website: 'www.divineworship.co.za',
    rating: 4.7,
    reviews: 92,
    image: '/featured-listing/Local-Churches-372x240.jpg',
    featured: false,
    verified: true,
    tags: ['Church', 'Worship', 'Community Programs'],
    coordinates: { lat: -28.7600, lng: 24.7900 }
  },
  {
    id: '6',
    name: 'Gourmet Restaurant',
    category: 'Food & Dining',
    description: 'Fine dining restaurant offering exquisite cuisine in an elegant atmosphere with exceptional service.',
    address: '987 Du Toitspan Road, Kimberley, 8301',
    phone: '+27 (53) 678-9012',
    email: 'reservations@gourmet.co.za',
    website: 'www.gourmet.co.za',
    rating: 4.8,
    reviews: 312,
    image: '/featured-listing/Local-Taxi-Ranks-372x240.jpg',
    featured: true,
    verified: true,
    tags: ['Restaurant', 'Fine Dining', 'Cuisine'],
    coordinates: { lat: -28.6900, lng: 24.7300 }
  },
  {
    id: '7',
    name: 'FitLife Gym',
    category: 'Fitness & Sports',
    description: 'Modern fitness center with state-of-the-art equipment, personal training, and group fitness classes.',
    address: '147 Barkly Road, Kimberley, 8301',
    phone: '+27 (53) 789-0123',
    email: 'join@fitlifegym.co.za',
    website: 'www.fitlifegym.co.za',
    rating: 4.5,
    reviews: 178,
    image: '/featured-listing/Healthcare-Facilities-372x240.jpg',
    featured: false,
    verified: false,
    tags: ['Gym', 'Fitness', 'Personal Training'],
    coordinates: { lat: -28.7400, lng: 24.7600 }
  },
  {
    id: '8',
    name: 'EduLearn Academy',
    category: 'Education',
    description: 'Premier educational institution offering quality education from elementary to high school levels.',
    address: '258 Stockenstroom Street, Kimberley, 8301',
    phone: '+27 (53) 890-1234',
    email: 'info@edulearnacademy.co.za',
    website: 'www.edulearnacademy.co.za',
    rating: 4.9,
    reviews: 267,
    image: '/featured-listing/Local-Churches-372x240.jpg',
    featured: true,
    verified: true,
    tags: ['Education', 'School', 'Learning'],
    coordinates: { lat: -28.7100, lng: 24.7400 }
  }
];

const categories = ['All', 'Technology', 'Healthcare', 'Food & Dining', 'Home & Garden', 'Transportation', 'Education', 'Fitness & Sports', 'Religious Organizations'];

function Listings() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const [dbListings, setDbListings] = useState<BusinessListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings?limit=100');
        if (response.ok) {
          const data = await response.json();
          // Map database listings to match BusinessListing interface
          const mappedListings = data.listings.map((listing: any) => ({
            ...listing,
            id: listing._id || listing.id, // Ensure id is present
            tags: listing.tags || [], // Ensure tags is an array
          }));
          setDbListings(mappedListings);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  // Combine mock listings and database listings
  const allListings = [...dbListings, ...mockListings];

  // Remove duplicates based on ID (prefer database listings if conflict)
  const uniqueListingsMap = new Map();
  allListings.forEach(listing => {
    if (!uniqueListingsMap.has(listing.id)) {
      uniqueListingsMap.set(listing.id, listing);
    }
  });

  const uniqueListings = Array.from(uniqueListingsMap.values());

  const filteredListings = uniqueListings.filter(listing => {
    const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.tags && listing.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesFeatured = !showFeaturedOnly || listing.featured;
    return matchesCategory && matchesSearch && matchesFeatured;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Business Listings</h1>
          <p className="text-xl opacity-90">Discover and connect with local businesses in your area</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Search businesses, services, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Featured Filter */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Featured Only</span>
            </label>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-700">
            Showing <span className="font-semibold">{filteredListings.length}</span> businesses
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Listings Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map(listing => (
                <div
                  key={listing.id}
                  onMouseEnter={() => setHoveredListingId(listing.id)}
                  onMouseLeave={() => setHoveredListingId(null)}
                >
                  <ListingCard listing={listing} isHovered={hoveredListingId === listing.id} />
                </div>
              ))}
            </div>
          </div>

          {/* Map - Desktop Sidebar */}
          <div className="hidden lg:block lg:w-96 xl:w-[400px]">
            <BusinessMap listings={filteredListings} hoveredListingId={hoveredListingId} />
          </div>

          {/* Mobile PIP Map */}
          <div className="lg:hidden">
            <BusinessMap listings={filteredListings} hoveredListingId={hoveredListingId} />
          </div>
        </div>

        {/* No Results */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No businesses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you&apos;re looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Listings />
    </Suspense>
  );
}
