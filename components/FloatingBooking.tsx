"use client";

import React, { useState } from "react";
import { FaCamera, FaVideo, FaFilm, FaPhotoVideo, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBuilding, FaTree, FaCheck, FaTimes } from "react-icons/fa";

const services = [
    { id: "photography", title: "Photography", icon: <FaCamera /> },
    { id: "videography", title: "Videography", icon: <FaVideo /> },
    { id: "editing", title: "Editing", icon: <FaFilm /> },
    { id: "studio", title: "Studio Rental", icon: <FaPhotoVideo /> },
];

const timeSlots = [
    "08:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM"
];

const FloatingBooking = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        service: "",
        location: "", // 'studio' or 'outdoor'
        date: null as number | null,
        time: "",
        name: "",
        email: "",
        phone: "",
        notes: ""
    });

    const daysInMonth = 30;
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleServiceSelect = (id: string) => setBookingData({ ...bookingData, service: id });
    const handleLocationSelect = (loc: string) => setBookingData({ ...bookingData, location: loc });
    const handleDateSelect = (day: number) => setBookingData({ ...bookingData, date: day });
    const handleTimeSelect = (time: string) => setBookingData({ ...bookingData, time: time });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Booking Submitted:", bookingData);
        alert("Booking Request Sent! We will contact you shortly.");
        setStep(1);
        setBookingData({
            service: "",
            location: "",
            date: null,
            time: "",
            name: "",
            email: "",
            phone: "",
            notes: ""
        });
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-blue-600 text-white p-3 md:p-4 rounded-l-xl shadow-2xl hover:bg-blue-700 transition-all duration-300 flex flex-col items-center gap-2 group ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
            >
                <FaCalendarAlt className="text-xl md:text-2xl group-hover:scale-110 transition-transform" />
                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
                    Book Now
                </span>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Panel */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-800 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/95 backdrop-blur absolute top-0 left-0 right-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-white">Book Your Session</h2>
                        <p className="text-xs text-gray-400">Step {step} of 3</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="h-full overflow-y-auto pt-24 pb-24 px-6">

                    {/* Step 1: Date & Time */}
                    {step === 1 && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2"><FaCalendarAlt /> Select Date</h3>
                                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                                    <div className="text-center mb-4 font-bold text-white">October 2025</div>
                                    <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-500 mb-2">
                                        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {calendarDays.map((day) => (
                                            <button
                                                key={day}
                                                onClick={() => handleDateSelect(day)}
                                                className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${bookingData.date === day ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/50' : 'hover:bg-gray-700 text-gray-300'}`}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2"><FaClock /> Select Time</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeSelect(time)}
                                            className={`py-3 px-2 rounded-lg border text-sm transition-all ${bookingData.time === time ? 'border-purple-500 bg-purple-500/20 text-white' : 'border-gray-700 hover:border-gray-500 text-gray-400'}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Service & Location */}
                    {step === 2 && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2"><FaMapMarkerAlt /> Select Location</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        onClick={() => handleLocationSelect('studio')}
                                        className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-300 ${bookingData.location === 'studio' ? 'border-purple-500 bg-purple-500/20 text-white' : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'}`}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-purple-400">
                                            <FaBuilding className="text-xl" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-white">Studio Session</div>
                                            <div className="text-xs text-gray-400">Professional lighting & backdrops</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handleLocationSelect('outdoor')}
                                        className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-300 ${bookingData.location === 'outdoor' ? 'border-green-500 bg-green-500/20 text-white' : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'}`}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-green-400">
                                            <FaTree className="text-xl" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-white">Outdoor / On-Location</div>
                                            <div className="text-xs text-gray-400">Natural light & scenic views</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2"><FaCamera /> Select Service</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {services.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => handleServiceSelect(s.id)}
                                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-300 ${bookingData.service === s.id ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'}`}
                                        >
                                            <div className="text-2xl text-gray-300">{s.icon}</div>
                                            <span className="font-medium text-sm">{s.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Details & Confirm */}
                    {step === 3 && (
                        <div className="animate-fade-in space-y-6">
                            <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-4 flex items-center gap-2"><FaCheck /> Final Details</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
                                    <input type="text" name="name" value={bookingData.name} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
                                    <input type="email" name="email" value={bookingData.email} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone Number</label>
                                    <input type="tel" name="phone" value={bookingData.phone} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>

                            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                                <h4 className="text-sm font-bold mb-3 text-white">Booking Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between border-b border-gray-700 pb-2">
                                        <span className="text-gray-400">Date & Time</span>
                                        <span className="font-medium text-white">{bookingData.date ? `Oct ${bookingData.date}` : "-"} at {bookingData.time || "-"}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-700 pb-2">
                                        <span className="text-gray-400">Location</span>
                                        <span className="font-medium capitalize text-white">{bookingData.location || "-"}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-700 pb-2">
                                        <span className="text-gray-400">Service</span>
                                        <span className="font-medium capitalize text-white">{bookingData.service || "-"}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5">Additional Notes</label>
                                <textarea name="notes" value={bookingData.notes} onChange={handleInputChange} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Tell us more about your vision..."></textarea>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Navigation */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-900 border-t border-gray-800 flex justify-between items-center z-10">
                    {step > 1 ? (
                        <button onClick={prevStep} className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-sm font-medium">
                            Back
                        </button>
                    ) : (
                        <div />
                    )}

                    {step < 3 ? (
                        <button
                            onClick={nextStep}
                            disabled={
                                (step === 1 && (!bookingData.date || !bookingData.time)) ||
                                (step === 2 && (!bookingData.service || !bookingData.location))
                            }
                            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30 text-sm"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button onClick={handleSubmit} className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 transform hover:scale-105 text-sm">
                            Confirm
                        </button>
                    )}
                </div>

            </div>
        </>
    );
};

export default FloatingBooking;
