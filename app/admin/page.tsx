"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaList, FaChartBar, FaCog, FaSpinner, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';

interface User {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
    createdAt: string;
}

interface Listing {
    _id: string;
    name: string;
    category: string;
    featured: boolean;
    verified: boolean;
    createdAt: string;
    userId: string;
}

interface Stats {
    totalUsers: number;
    totalListings: number;
    featuredListings: number;
    verifiedListings: number;
    pendingListings: number;
}

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'listings'>('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        totalListings: 0,
        featuredListings: 0,
        verifiedListings: 0,
        pendingListings: 0
    });
    const [users, setUsers] = useState<User[]>([]);
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth?mode=signin');
        } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
            // Not an admin, redirect to home
            alert('Access denied. Admin privileges required.');
            router.push('/');
        }
    }, [status, session, router]);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchData();
        }
    }, [status]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [statsRes, usersRes, listingsRes] = await Promise.all([
                fetch('/api/admin/stats'),
                fetch('/api/admin/users'),
                fetch('/api/admin/listings')
            ]);

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData);
            }

            if (usersRes.ok) {
                const usersData = await usersRes.json();
                setUsers(usersData.users || []);
            }

            if (listingsRes.ok) {
                const listingsData = await listingsRes.json();
                setListings(listingsData.listings || []);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter(u => u._id !== userId));
                alert('User deleted successfully');
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    const handleDeleteListing = async (listingId: string) => {
        if (!confirm('Are you sure you want to delete this listing?')) return;

        try {
            const response = await fetch(`/api/admin/listings/${listingId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setListings(listings.filter(l => l._id !== listingId));
                alert('Listing deleted successfully');
                fetchData(); // Refresh stats
            } else {
                alert('Failed to delete listing');
            }
        } catch (error) {
            console.error('Error deleting listing:', error);
            alert('Error deleting listing');
        }
    };

    const handleToggleFeatured = async (listingId: string, currentStatus: boolean) => {
        try {
            const response = await fetch(`/api/admin/listings/${listingId}/toggle-featured`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featured: !currentStatus })
            });

            if (response.ok) {
                setListings(listings.map(l =>
                    l._id === listingId ? { ...l, featured: !currentStatus } : l
                ));
                fetchData(); // Refresh stats
            }
        } catch (error) {
            console.error('Error toggling featured:', error);
        }
    };

    const handleToggleVerified = async (listingId: string, currentStatus: boolean) => {
        try {
            const response = await fetch(`/api/admin/listings/${listingId}/toggle-verified`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ verified: !currentStatus })
            });

            if (response.ok) {
                setListings(listings.map(l =>
                    l._id === listingId ? { ...l, verified: !currentStatus } : l
                ));
                fetchData(); // Refresh stats
            }
        } catch (error) {
            console.error('Error toggling verified:', error);
        }
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading admin panel...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
                    <p className="text-xl opacity-90">Manage users, listings, and site settings</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'overview'
                                ? 'border-b-2 border-purple-600 text-purple-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <FaChartBar className="mr-2" />
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'users'
                                ? 'border-b-2 border-purple-600 text-purple-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <FaUsers className="mr-2" />
                            Users ({users.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('listings')}
                            className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'listings'
                                ? 'border-b-2 border-purple-600 text-purple-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <FaList className="mr-2" />
                            Listings ({listings.length})
                        </button>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Total Users</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                                    </div>
                                    <FaUsers className="text-blue-500 text-3xl" />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Total Listings</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.totalListings}</p>
                                    </div>
                                    <FaList className="text-green-500 text-3xl" />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Featured</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.featuredListings}</p>
                                    </div>
                                    <FaStar className="text-yellow-500 text-3xl" />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Verified</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.verifiedListings}</p>
                                    </div>
                                    <FaCheckCircle className="text-purple-500 text-3xl" />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Pending</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.pendingListings}</p>
                                    </div>
                                    <FaTimesCircle className="text-orange-500 text-3xl" />
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Manage Users
                                </button>
                                <button
                                    onClick={() => setActiveTab('listings')}
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Manage Listings
                                </button>
                                <button
                                    onClick={fetchData}
                                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                                >
                                    Refresh Data
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                                                        {user.image ? (
                                                            <Image src={user.image} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-blue-600 font-bold">{user.name[0]}</span>
                                                        )}
                                                    </div>
                                                    <span className="ml-3 font-medium text-gray-900">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Listings Tab */}
                {activeTab === 'listings' && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">Listing Management</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Created</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {listings.map((listing) => (
                                        <tr key={listing._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{listing.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{listing.category}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleToggleFeatured(listing._id, listing.featured)}
                                                        className={`px-2 py-1 rounded text-xs font-medium ${listing.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                                                            }`}
                                                    >
                                                        {listing.featured ? 'Featured' : 'Not Featured'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleVerified(listing._id, listing.verified)}
                                                        className={`px-2 py-1 rounded text-xs font-medium ${listing.verified ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                                            }`}
                                                    >
                                                        {listing.verified ? 'Verified' : 'Pending'}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(listing.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/listings/${listing._id}`}
                                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteListing(listing._id)}
                                                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
