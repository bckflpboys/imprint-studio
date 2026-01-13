'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaUpload, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaClock, FaPlus, FaTimes, FaCheckCircle, FaStar, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Business hours interface with index signature to allow dynamic property access
interface BusinessHours {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    [key: string]: string;
}

export default function EditListingPage({ params }: { params: { id: string } }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        longDescription: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        image: '',
        featured: false,
        verified: false,
        tags: [] as string[],
        coordinates: { lat: 0, lng: 0 },
        hours: {
            monday: '09:00 - 17:00',
            tuesday: '09:00 - 17:00',
            wednesday: '09:00 - 17:00',
            thursday: '09:00 - 17:00',
            friday: '09:00 - 17:00',
            saturday: 'Closed',
            sunday: 'Closed'
        } as BusinessHours,
        services: [] as string[],
        gallery: [] as string[]
    });

    const [newTag, setNewTag] = useState('');
    const [newService, setNewService] = useState('');
    const [newGalleryImage, setNewGalleryImage] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [currentTab, setCurrentTab] = useState('basic');
    const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
    const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
    const [isSearchingAddress, setIsSearchingAddress] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth?mode=signin');
        }
    }, [status, router]);

    const fetchListing = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/dashboard/listings/${params.id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch listing');
            }

            const data = await response.json();
            const listing = data.listing;

            setFormData({
                name: listing.name || '',
                category: listing.category || '',
                description: listing.description || '',
                longDescription: listing.longDescription || '',
                address: listing.address || '',
                phone: listing.phone || '',
                email: listing.email || '',
                website: listing.website || '',
                image: listing.image || '',
                featured: listing.featured || false,
                verified: listing.verified || false,
                tags: listing.tags || [],
                coordinates: listing.coordinates || { lat: 0, lng: 0 },
                hours: listing.hours || {
                    monday: '09:00 - 17:00',
                    tuesday: '09:00 - 17:00',
                    wednesday: '09:00 - 17:00',
                    thursday: '09:00 - 17:00',
                    friday: '09:00 - 17:00',
                    saturday: 'Closed',
                    sunday: 'Closed'
                },
                services: listing.services || [],
                gallery: listing.gallery || []
            });
        } catch (err: any) {
            setError(err.message || 'Failed to load listing');
            toast.error(err.message || 'Failed to load listing');
            console.error('Error fetching listing:', err);
        } finally {
            setIsLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchListing();
        }
    }, [status, fetchListing]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleHoursChange = (day: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            hours: {
                ...prev.hours,
                [day]: value
            }
        }));
    };

    const handleAddressSearch = async (value: string) => {
        setFormData(prev => ({
            ...prev,
            address: value
        }));

        if (value.length < 3) {
            setAddressSuggestions([]);
            setShowAddressSuggestions(false);
            return;
        }

        setIsSearchingAddress(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`
            );
            const data = await response.json();
            setAddressSuggestions(data);
            setShowAddressSuggestions(true);
        } catch (error) {
            console.error('Error searching address:', error);
            setAddressSuggestions([]);
        } finally {
            setIsSearchingAddress(false);
        }
    };

    const handleSelectAddress = (suggestion: any) => {
        const lat = parseFloat(suggestion.lat);
        const lng = parseFloat(suggestion.lon);

        setFormData(prev => ({
            ...prev,
            address: suggestion.display_name,
            coordinates: { lat, lng }
        }));
        setShowAddressSuggestions(false);
        setAddressSuggestions([]);
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const addService = () => {
        if (newService.trim() && !formData.services.includes(newService.trim())) {
            setFormData(prev => ({
                ...prev,
                services: [...prev.services, newService.trim()]
            }));
            setNewService('');
        }
    };

    const removeService = (serviceToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.filter(service => service !== serviceToRemove)
        }));
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGalleryFiles(prev => [...prev, ...Array.from(e.target.files as FileList)]);
        }
    };

    const removeGalleryImage = (indexToRemove: number) => {
        setGalleryFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentTab !== 'media') {
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch(`/api/dashboard/listings/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update listing');
            }

            const result = await response.json();
            toast.success('Listing updated successfully!');
            router.push('/dashboard');
        } catch (err) {
            console.error('Error updating listing:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to update listing';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const daysOfWeek = [
        { id: 'monday', label: 'Monday' },
        { id: 'tuesday', label: 'Tuesday' },
        { id: 'wednesday', label: 'Wednesday' },
        { id: 'thursday', label: 'Thursday' },
        { id: 'friday', label: 'Friday' },
        { id: 'saturday', label: 'Saturday' },
        { id: 'sunday', label: 'Sunday' }
    ];

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <FaSpinner className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading listing...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-grey-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-4 shadow-lg shadow-primary-500/30">
                        <FaPlus className="text-grey-900 text-2xl" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-grey-900 mb-3">
                        Edit Business Listing
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Update your business information to keep your listing current and accurate.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 p-4 mb-8 rounded-lg shadow-sm">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            {['basic', 'contact', 'details', 'media'].map((tab, index) => (
                                <React.Fragment key={tab}>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentTab(tab)}
                                        className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${currentTab === tab
                                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                                            : ['basic', 'contact', 'details', 'media'].indexOf(currentTab) > index
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                            }`}
                                    >
                                        {['basic', 'contact', 'details', 'media'].indexOf(currentTab) > index ? (
                                            <FaCheckCircle className="text-lg" />
                                        ) : (
                                            index + 1
                                        )}
                                    </button>
                                    {index < 3 && (
                                        <div className={`h-1 w-12 rounded-full transition-all ${['basic', 'contact', 'details', 'media'].indexOf(currentTab) > index
                                            ? 'bg-green-500'
                                            : 'bg-gray-200'
                                            }`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                            Step {['basic', 'contact', 'details', 'media'].indexOf(currentTab) + 1} of 4
                        </span>
                    </div>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-100 bg-gray-50">
                        <nav className="flex overflow-x-auto">
                            {[
                                { id: 'basic', label: 'Basic Info', icon: '📋' },
                                { id: 'contact', label: 'Contact & Location', icon: '📍' },
                                { id: 'details', label: 'Details', icon: '✨' },
                                { id: 'media', label: 'Media', icon: '🖼️' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setCurrentTab(tab.id)}
                                    className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-all border-b-2 ${currentTab === tab.id
                                        ? 'border-blue-500 text-blue-600 bg-white'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="p-8"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if ((e.target as HTMLElement).tagName.toLowerCase() !== 'textarea') {
                                    e.preventDefault();
                                }
                            }
                        }}
                    >
                        {currentTab === 'basic' && (
                            <div className="space-y-8">
                                <div className="border-b border-gray-100 pb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg mr-3 text-sm font-bold">1</span>
                                        Basic Information
                                    </h3>
                                    <p className="mt-2 text-gray-600">Tell us about your business</p>
                                </div>

                                <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Business Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                                            placeholder="Enter your business name"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            required
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Home & Garden">Home & Garden</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Transportation">Transportation</option>
                                            <option value="Religious Organizations">Religious Organizations</option>
                                            <option value="Food & Dining">Food & Dining</option>
                                            <option value="Retail">Retail</option>
                                            <option value="Services">Services</option>
                                            <option value="Education">Education</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Short Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            required
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900 bg-white"
                                            placeholder="A brief description of your business (max 200 characters)"
                                            maxLength={200}
                                        />
                                        <div className="mt-2 flex justify-between items-center">
                                            <p className="text-xs text-gray-500">Brief overview of your business</p>
                                            <p className="text-xs font-medium text-gray-600">
                                                {formData.description.length}/200
                                            </p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="longDescription" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Detailed Description
                                        </label>
                                        <textarea
                                            id="longDescription"
                                            name="longDescription"
                                            rows={5}
                                            value={formData.longDescription}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900 bg-white"
                                            placeholder="Tell customers what makes your business unique, your services, and why they should choose you."
                                        />
                                        <p className="mt-2 text-xs text-gray-500">Detailed information helps attract more customers</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentTab === 'contact' && (
                            <div className="space-y-8">
                                <div className="border-b border-gray-100 pb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg mr-3 text-sm font-bold">2</span>
                                        Contact & Location
                                    </h3>
                                    <p className="mt-2 text-gray-600">How can customers reach you?</p>
                                </div>

                                <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Address <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400 h-4 w-4" />
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                required
                                                value={formData.address}
                                                onChange={(e) => handleAddressSearch(e.target.value)}
                                                onFocus={() => formData.address.length >= 3 && setShowAddressSuggestions(true)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                                                placeholder="Search for an address..."
                                            />
                                            {isSearchingAddress && (
                                                <div className="absolute right-4 top-3.5 text-gray-400">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                </div>
                                            )}

                                            {showAddressSuggestions && addressSuggestions.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                                                    {addressSuggestions.map((suggestion, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            onClick={() => handleSelectAddress(suggestion)}
                                                            className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                                        >
                                                            <p className="text-sm font-medium text-gray-900">{suggestion.display_name}</p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                Lat: {parseFloat(suggestion.lat).toFixed(4)}, Lng: {parseFloat(suggestion.lon).toFixed(4)}
                                                            </p>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {formData.coordinates.lat !== 0 && formData.coordinates.lng !== 0 && (
                                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                <p className="text-sm font-semibold text-blue-900 mb-1">📍 Coordinates</p>
                                                <p className="text-sm text-blue-800">
                                                    Latitude: <span className="font-mono font-bold">{formData.coordinates.lat.toFixed(6)}</span>
                                                </p>
                                                <p className="text-sm text-blue-800">
                                                    Longitude: <span className="font-mono font-bold">{formData.coordinates.lng.toFixed(6)}</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Phone <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-4 top-3.5 text-gray-400 h-4 w-4" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                                                placeholder="+27 (123) 456-7890"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-4 top-3.5 text-gray-400 h-4 w-4" />
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                                                placeholder="contact@business.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Website
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-500 text-sm font-medium">https://</span>
                                            <input
                                                type="text"
                                                name="website"
                                                id="website"
                                                value={formData.website}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const cleanValue = value.replace(/^https?:\/\//, '');
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        website: cleanValue
                                                    }));
                                                }}
                                                className="w-full pl-24 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                                                placeholder="www.yourbusiness.com or yourbusiness.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-900 mb-4">Business Hours</label>
                                        <div className="space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                                            {daysOfWeek.map((day) => (
                                                <div key={day.id} className="grid grid-cols-12 gap-3 items-center">
                                                    <label className="col-span-4 text-sm font-medium text-gray-700">{day.label}</label>
                                                    <div className="col-span-8">
                                                        <input
                                                            type="text"
                                                            value={formData.hours[day.id as keyof BusinessHours]}
                                                            onChange={(e) => handleHoursChange(day.id, e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all text-gray-900 bg-white"
                                                            placeholder="e.g. 09:00 - 17:00"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentTab === 'details' && (
                            <div className="space-y-8">
                                <div className="border-b border-gray-100 pb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg mr-3 text-sm font-bold">3</span>
                                        Business Details
                                    </h3>
                                    <p className="mt-2 text-gray-600">Additional information about your business</p>
                                </div>

                                <div className="space-y-8">
                                    {/* Featured & Verified Options */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                                            <div className="flex items-start">
                                                <input
                                                    id="featured"
                                                    name="featured"
                                                    type="checkbox"
                                                    checked={formData.featured}
                                                    onChange={handleChange}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                                                />
                                                <div className="ml-4">
                                                    <label htmlFor="featured" className="block text-sm font-semibold text-gray-900 cursor-pointer">
                                                        <FaStar className="inline mr-2 text-yellow-500" />
                                                        Featured Listing
                                                    </label>
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        Appear at the top of search results and on the homepage
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-6 hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer">
                                            <div className="flex items-start">
                                                <input
                                                    id="verified"
                                                    name="verified"
                                                    type="checkbox"
                                                    checked={formData.verified}
                                                    onChange={handleChange}
                                                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                                                />
                                                <div className="ml-4">
                                                    <label htmlFor="verified" className="block text-sm font-semibold text-gray-900 cursor-pointer">
                                                        <FaCheckCircle className="inline mr-2 text-green-500" />
                                                        Verified Business
                                                    </label>
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        Get a verification badge to build trust with customers
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags Section */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            Business Tags
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                                                placeholder="e.g., Web Design, SEO, Consulting"
                                            />
                                            <button
                                                type="button"
                                                onClick={addTag}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                                            >
                                                <FaPlus className="inline mr-2" />
                                                Add
                                            </button>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {formData.tags.map((tag) => (
                                                <span key={tag} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTag(tag)}
                                                        className="ml-2 inline-flex items-center justify-center h-5 w-5 text-blue-600 hover:bg-blue-200 hover:text-blue-700 rounded-full transition-all"
                                                    >
                                                        <FaTimes className="h-3 w-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Services Section */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            Services
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newService}
                                                onChange={(e) => setNewService(e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                                                placeholder="e.g., Web Design, SEO, Consulting"
                                            />
                                            <button
                                                type="button"
                                                onClick={addService}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                                            >
                                                <FaPlus className="inline mr-2" />
                                                Add
                                            </button>
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            {formData.services.map((service) => (
                                                <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                                                    <span className="text-sm font-medium text-gray-900">{service}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeService(service)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <FaTimes className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentTab === 'media' && (
                            <div className="space-y-8">
                                <div className="border-b border-gray-100 pb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg mr-3 text-sm font-bold">4</span>
                                        Media & Gallery
                                    </h3>
                                    <p className="mt-2 text-gray-600">Add images to showcase your business</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                                        Main Image
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <FaUpload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="image-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageFileChange} accept="image/*" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                    {imageFile && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-900">Preview:</p>
                                            <Image
                                                src={URL.createObjectURL(imageFile)}
                                                alt="Main image preview"
                                                width={200}
                                                height={200}
                                                className="mt-2 w-48 h-48 object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                                        Gallery Images
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <FaUpload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="gallery-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Upload files</span>
                                                    <input id="gallery-upload" name="gallery-upload" type="file" className="sr-only" onChange={handleGalleryFilesChange} accept="image/*" multiple />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {galleryFiles.map((file, index) => (
                                            <div key={index} className="relative group">
                                                <Image
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Gallery image ${index + 1}`}
                                                    width={200}
                                                    height={200}
                                                    className="w-full h-32 object-cover rounded-lg shadow-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryImage(index)}
                                                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTimes className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="border-t border-gray-100 pt-8 mt-8">
                            <div className="flex justify-between items-center">
                                {currentTab !== 'basic' ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const tabs = ['basic', 'contact', 'details', 'media'];
                                            const currentIndex = tabs.indexOf(currentTab);
                                            setCurrentTab(tabs[currentIndex - 1]);
                                        }}
                                        className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                                    >
                                        ← Previous
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {currentTab !== 'media' ? (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const tabs = ['basic', 'contact', 'details', 'media'];
                                            const currentIndex = tabs.indexOf(currentTab);
                                            setCurrentTab(tabs[currentIndex + 1]);
                                        }}
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                                    >
                                        Next →
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="inline-block animate-spin mr-2">⏳</span>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <FaCheckCircle className="mr-2" />
                                                Update Listing
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
