"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaShare, FaSpinner } from 'react-icons/fa';
import BusinessMap from '@/components/BusinessMap';
import ListingSchema from '@/components/ListingSchema';

// Mock data - used for related listings only
const mockListings = [
  {
    id: '1',
    name: 'Tech Solutions Inc.',
    category: 'Technology',
    description: 'Leading IT consulting and software development company providing innovative solutions for businesses of all sizes.',
    longDescription: 'Tech Solutions Inc. is a premier IT consulting and software development company based in Kimberley. With over 15 years of industry experience, we specialize in delivering cutting-edge technology solutions tailored to meet the unique needs of businesses across various sectors. Our team of expert developers and consultants work closely with clients to understand their challenges and provide innovative, scalable solutions that drive growth and efficiency.',
    address: '123 Bultfontein Road, Kimberley, 8301',
    phone: '+27 (53) 123-4567',
    email: 'info@techsolutions.co.za',
    website: 'www.techsolutions.co.za',
    rating: 4.8,
    reviews: 127,
    image: '/featured-listing/Healthcare-Facilities-372x240.jpg',
    featured: true,
    verified: true,
    tags: ['IT Services', 'Software Development', 'Consulting', 'Web Development', 'Cloud Solutions'],
    coordinates: { lat: -28.7282, lng: 24.7499 },
    hours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '09:00 - 13:00',
      sunday: 'Closed'
    },
    services: ['Software Development', 'IT Consulting', 'Web Development', 'Cloud Migration', 'System Integration', 'Technical Support'],
    gallery: [
      '/featured-listing/Healthcare-Facilities-372x240.jpg',
      '/featured-listing/Local-Churches-372x240.jpg',
      '/featured-listing/Local-Taxi-Ranks-372x240.jpg'
    ]
  },
  {
    id: '2',
    name: 'Green Landscaping Co.',
    category: 'Home & Garden',
    description: 'Professional landscaping services offering garden design, maintenance, and outdoor living solutions.',
    longDescription: 'Green Landscaping Co. is your trusted partner for all landscaping needs in Kimberley. We provide comprehensive landscaping services including garden design, landscape maintenance, outdoor living spaces, and hardscaping. Our team of experienced landscapers is committed to transforming your outdoor spaces into beautiful, functional areas that enhance your property value.',
    address: '456 Memorial Road, Kimberley, 8301',
    phone: '+27 (53) 234-5678',
    email: 'contact@greenlandscaping.co.za',
    website: 'www.greenlandscaping.co.za',
    rating: 4.6,
    reviews: 89,
    image: '/featured-listing/Local-Churches-372x240.jpg',
    featured: true,
    verified: true,
    tags: ['Landscaping', 'Garden Design', 'Maintenance', 'Hardscaping', 'Outdoor Living'],
    coordinates: { lat: -28.7000, lng: 24.7200 },
    hours: {
      monday: '07:00 - 18:00',
      tuesday: '07:00 - 18:00',
      wednesday: '07:00 - 18:00',
      thursday: '07:00 - 18:00',
      friday: '07:00 - 18:00',
      saturday: '08:00 - 14:00',
      sunday: 'Closed'
    },
    services: ['Garden Design', 'Landscape Maintenance', 'Hardscaping', 'Lawn Care', 'Tree Trimming', 'Outdoor Lighting'],
    gallery: [
      '/featured-listing/Local-Churches-372x240.jpg',
      '/featured-listing/Healthcare-Facilities-372x240.jpg',
      '/featured-listing/Local-Taxi-Ranks-372x240.jpg'
    ]
  },
  {
    id: '3',
    name: 'MediCare Health Center',
    category: 'Healthcare',
    description: 'Comprehensive healthcare facility providing medical services, urgent care, and specialized treatments.',
    longDescription: 'MediCare Health Center is a state-of-the-art healthcare facility in Kimberley offering comprehensive medical services. Our team of qualified healthcare professionals provides urgent care, general medical services, and specialized treatments. We are committed to providing high-quality, patient-centered care in a comfortable and welcoming environment.',
    address: '789 Long Street, Kimberley, 8301',
    phone: '+27 (53) 345-6789',
    email: 'info@medicarehealth.co.za',
    website: 'www.medicarehealth.co.za',
    rating: 4.9,
    reviews: 234,
    image: '/featured-listing/Healthcare-Facilities-372x240.jpg',
    featured: true,
    verified: true,
    tags: ['Healthcare', 'Medical Services', 'Urgent Care', 'General Practice', 'Specialist Care'],
    coordinates: { lat: -28.7500, lng: 24.7800 },
    hours: {
      monday: '08:00 - 18:00',
      tuesday: '08:00 - 18:00',
      wednesday: '08:00 - 18:00',
      thursday: '08:00 - 18:00',
      friday: '08:00 - 18:00',
      saturday: '09:00 - 14:00',
      sunday: '10:00 - 14:00'
    },
    services: ['General Practice', 'Urgent Care', 'Specialist Consultations', 'Diagnostic Services', 'Vaccination', 'Health Screening'],
    gallery: [
      '/featured-listing/Healthcare-Facilities-372x240.jpg',
      '/featured-listing/Local-Churches-372x240.jpg',
      '/featured-listing/Local-Taxi-Ranks-372x240.jpg'
    ]
  },
  {
    id: '4',
    name: 'Quick Taxi Services',
    category: 'Transportation',
    description: 'Reliable taxi and transportation services available 24/7 for local and long-distance travel.',
    longDescription: 'Quick Taxi Services provides reliable, professional transportation services in Kimberley and surrounding areas. Available 24/7, we offer safe and comfortable rides for local trips, airport transfers, and long-distance travel. Our experienced drivers and well-maintained vehicles ensure a smooth and pleasant journey.',
    address: '321 Transvaal Road, Kimberley, 8301',
    phone: '+27 (53) 456-7890',
    email: 'book@quicktaxi.co.za',
    website: 'www.quicktaxi.co.za',
    rating: 4.4,
    reviews: 156,
    image: '/featured-listing/Local-Taxi-Ranks-372x240.jpg',
    featured: false,
    verified: false,
    tags: ['Taxi', 'Transportation', 'Airport Transfer', 'Long Distance', '24/7 Service'],
    coordinates: { lat: -28.6800, lng: 24.7100 },
    hours: {
      monday: '24 Hours',
      tuesday: '24 Hours',
      wednesday: '24 Hours',
      thursday: '24 Hours',
      friday: '24 Hours',
      saturday: '24 Hours',
      sunday: '24 Hours'
    },
    services: ['Local Taxi Service', 'Airport Transfer', 'Long Distance Travel', 'Corporate Transport', 'Event Transportation'],
    gallery: [
      '/featured-listing/Local-Taxi-Ranks-372x240.jpg',
      '/featured-listing/Healthcare-Facilities-372x240.jpg',
      '/featured-listing/Local-Churches-372x240.jpg'
    ]
  },
  {
    id: '5',
    name: 'Divine Worship Church',
    category: 'Religious Organizations',
    description: 'Welcoming community church offering spiritual guidance, worship services, and community programs.',
    longDescription: 'Divine Worship Church is a vibrant, welcoming community dedicated to spiritual growth and service. We offer inspiring worship services, spiritual guidance, and various community programs designed to strengthen faith and build meaningful relationships. Join us as we worship together and serve our community.',
    address: '654 Chapel Street, Kimberley, 8301',
    phone: '+27 (53) 567-8901',
    email: 'info@divineworship.co.za',
    website: 'www.divineworship.co.za',
    rating: 4.7,
    reviews: 92,
    image: '/featured-listing/Local-Churches-372x240.jpg',
    featured: false,
    verified: true,
    tags: ['Church', 'Worship', 'Community Programs', 'Spiritual Guidance', 'Fellowship'],
    coordinates: { lat: -28.7600, lng: 24.7900 },
    hours: {
      monday: 'Closed',
      tuesday: 'Closed',
      wednesday: '18:30 - 20:00',
      thursday: 'Closed',
      friday: 'Closed',
      saturday: 'Closed',
      sunday: '09:00 - 11:00'
    },
    services: ['Sunday Worship', 'Prayer Services', 'Bible Study', 'Community Outreach', 'Counseling'],
    gallery: [
      '/featured-listing/Local-Churches-372x240.jpg',
      '/featured-listing/Healthcare-Facilities-372x240.jpg',
      '/featured-listing/Local-Taxi-Ranks-372x240.jpg'
    ]
  },
  {
    id: '6',
    name: 'Gourmet Restaurant',
    category: 'Food & Dining',
    description: 'Fine dining restaurant offering exquisite cuisine in an elegant atmosphere with exceptional service.',
    longDescription: 'Gourmet Restaurant is Kimberley\'s premier fine dining destination, offering exquisite cuisine prepared by our award-winning chefs. We provide an elegant atmosphere, exceptional service, and an extensive wine selection. Perfect for special occasions, business dinners, or a memorable evening out.',
    address: '987 Du Toitspan Road, Kimberley, 8301',
    phone: '+27 (53) 678-9012',
    email: 'reservations@gourmetrestaurant.co.za',
    website: 'www.gourmetrestaurant.co.za',
    rating: 4.9,
    reviews: 178,
    image: '/featured-listing/Healthcare-Facilities-372x240.jpg',
    featured: true,
    verified: true,
    tags: ['Restaurant', 'Fine Dining', 'Cuisine', 'Wine Bar', 'Events'],
    coordinates: { lat: -28.7400, lng: 24.7600 },
    hours: {
      monday: 'Closed',
      tuesday: '18:00 - 23:00',
      wednesday: '18:00 - 23:00',
      thursday: '18:00 - 23:00',
      friday: '18:00 - 00:00',
      saturday: '18:00 - 00:00',
      sunday: '12:00 - 22:00'
    },
    services: ['Fine Dining', 'Private Events', 'Wine Tasting', 'Catering', 'Reservations'],
    gallery: [
      '/featured-listing/Healthcare-Facilities-372x240.jpg',
      '/featured-listing/Local-Churches-372x240.jpg',
      '/featured-listing/Local-Taxi-Ranks-372x240.jpg'
    ]
  }
];

export default function ListingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState('overview');
  const [imageIndex, setImageIndex] = useState(0);
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch listing data from API
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listings/${id}`);

        if (!response.ok) {
          // If not found in database, try to find in mock data
          const mockListing = mockListings.find(l => l.id === id);
          if (mockListing) {
            setListing(mockListing);
          } else {
            setError('Listing not found');
          }
        } else {
          const data = await response.json();
          setListing(data);
        }
      } catch (err) {
        console.error('Error fetching listing:', err);
        // Fallback to mock data
        const mockListing = mockListings.find(l => l.id === id);
        if (mockListing) {
          setListing(mockListing);
        } else {
          setError('Failed to load listing');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center py-20">
          <FaSpinner className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
          <p className="text-gray-600 mb-8">The listing you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/listings" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.name,
        text: listing.description,
        url: window.location.href,
      });
    }
  };

  // Ensure gallery has at least the main image
  const displayGallery: string[] = listing.gallery && listing.gallery.length > 0
    ? listing.gallery
    : listing.image
      ? [listing.image]
      : ['/featured-listing/Healthcare-Facilities-372x240.jpg'];

  // Default values for optional fields
  const displayRating = listing.rating || 0;
  const displayReviews = listing.reviews || 0;

  return (
    <>
      <ListingSchema listing={listing} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-blue-600">Listings</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{listing.name}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Image Gallery */}
            <div className="lg:col-span-2">
              <div className="relative rounded-xl overflow-hidden shadow-xl mb-4">
                <Image
                  src={displayGallery[imageIndex]}
                  alt={`${listing.name} - Image ${imageIndex + 1}`}
                  width={800}
                  height={500}
                  className="w-full h-96 object-cover"
                  priority
                />
                {listing.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Featured
                  </div>
                )}
                {listing.verified && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-green-600 p-3 rounded-full shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {displayGallery.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${imageIndex === idx ? 'border-blue-600 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  {displayRating > 0 && (
                    <>
                      <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-lg">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="font-bold text-gray-900">{displayRating}</span>
                      </div>
                      <span className="text-gray-600">({displayReviews} reviews)</span>
                    </>
                  )}
                </div>
                <p className="text-blue-600 font-semibold text-lg mb-2">{listing.category}</p>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${listing.phone}`}
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-md hover:shadow-lg"
                >
                  <FaPhone />
                  <span>Call Now</span>
                </a>
                <a
                  href={`mailto:${listing.email}`}
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold shadow-md hover:shadow-lg"
                >
                  <FaEnvelope />
                  <span>Email</span>
                </a>
                {listing.website && (
                  <a
                    href={`https://${listing.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg"
                  >
                    <FaGlobe />
                    <span>Visit Website</span>
                  </a>
                )}
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center space-x-2 w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all font-semibold"
                >
                  <FaShare />
                  <span>Share</span>
                </button>
              </div>

              {/* Address */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">Address</p>
                    <p className="text-gray-900">{listing.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {['overview', 'services', 'hours', 'map'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold transition-all text-center ${activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About {listing.name}</h2>
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">{listing.longDescription}</p>
                    <p className="text-gray-700 leading-relaxed text-lg">{listing.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tags & Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.tags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200 font-medium hover:shadow-md transition-shadow"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {listing.services.map((service: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-900 font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hours Tab */}
              {activeTab === 'hours' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
                  <div className="space-y-3">
                    {Object.entries(listing.hours).map(([day, hours]: [string, any]) => (
                      <div key={day} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="font-semibold text-gray-900 capitalize">{day}</span>
                        <span className={`font-medium ${hours === 'Closed' ? 'text-red-600' : 'text-green-600'}`}>
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map Tab */}
              {activeTab === 'map' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                  <div className="rounded-lg overflow-hidden shadow-lg h-96">
                    <BusinessMap listings={[listing]} hoveredListingId={null} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Listings */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockListings
                .filter(l => l.category === listing.category && l.id !== listing.id)
                .slice(0, 3)
                .map(relatedListing => (
                  <Link
                    key={relatedListing.id}
                    href={`/listings/${relatedListing.id}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group border border-gray-100 hover:border-blue-200"
                  >
                    <div className="relative overflow-hidden h-48">
                      <Image
                        src={relatedListing.image}
                        alt={relatedListing.name}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedListing.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{relatedListing.category}</span>
                        {relatedListing.rating && (
                          <div className="flex items-center">
                            <FaStar className="text-yellow-500 mr-1" />
                            <span className="font-bold text-gray-900">{relatedListing.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
