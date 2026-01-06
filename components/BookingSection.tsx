"use client";

import React, { useState } from "react";
import { FaCamera, FaVideo, FaFilm, FaPhotoVideo, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBuilding, FaTree, FaCheck } from "react-icons/fa";

const services = [
    { id: "photography", title: "Photography", icon: <FaCamera /> },
    { id: "videography", title: "Videography", icon: <FaVideo /> },
    { id: "editing", title: "Editing", icon: <FaFilm /> },
    { id: "studio", title: "Studio Rental", icon: <FaPhotoVideo /> },
];

const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "13:00 PM", "14:00 PM", "15:00 PM", "16:00 PM", "17:00 PM"
];

const BookingSection = () => {
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

    // Calendar Logic
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    const daysInCurrentMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, today.getMonth(), 1).getDay(); // 0 = Sunday

    const calendarDays = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

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
        // Reset or redirect
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
    };

    return (
        <section id="booking" className="py-20 bg-gray-900 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Book Your Session</h2>
                    <p className="text-gray-400 text-lg">Follow the steps to reserve your spot with Imprint Media Studio.</p>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}>1</div>
                        <div className={`w-16 h-1 bg-gray-700 ${step >= 2 ? 'bg-blue-600' : ''}`} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}>2</div>
                        <div className={`w-16 h-1 bg-gray-700 ${step >= 3 ? 'bg-blue-600' : ''}`} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}>3</div>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 md:p-10 shadow-2xl min-h-[500px]">

                    {/* Step 1: Date & Time */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /> Select Date</h3>
                                <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
                                    <div className="text-center mb-4 font-bold text-lg">{currentMonth} {currentYear}</div>
                                    <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-400 mb-2">
                                        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {/* Empty slots for start of month */}
                                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                            <div key={`empty-${i}`} />
                                        ))}

                                        {calendarDays.map((day) => {
                                            const isPast = day < currentDay;
                                            return (
                                                <button
                                                    key={day}
                                                    disabled={isPast}
                                                    onClick={() => handleDateSelect(day)}
                                                    className={`aspect-square rounded-lg flex items-center justify-center transition-all 
                                                        ${bookingData.date === day
                                                            ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/50'
                                                            : isPast
                                                                ? 'text-gray-600 cursor-not-allowed'
                                                                : 'hover:bg-gray-700 text-gray-300'
                                                        }`}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2"><FaClock className="text-purple-500" /> Select Time</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeSelect(time)}
                                            className={`py-3 px-4 rounded-lg border transition-all ${bookingData.time === time ? 'border-purple-500 bg-purple-500/20 text-white' : 'border-gray-700 hover:border-gray-500 text-gray-400'}`}
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
                                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2"><FaMapMarkerAlt className="text-purple-500" /> Select Location</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => handleLocationSelect('studio')}
                                        className={`p-6 rounded-xl border-2 flex items-center justify-center gap-4 transition-all duration-300 ${bookingData.location === 'studio' ? 'border-purple-500 bg-purple-500/20 text-white' : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'}`}
                                    >
                                        <FaBuilding className="text-3xl" />
                                        <div className="text-left">
                                            <div className="font-bold text-lg">Studio Session</div>
                                            <div className="text-sm opacity-70">Controlled lighting & professional backdrops</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handleLocationSelect('outdoor')}
                                        className={`p-6 rounded-xl border-2 flex items-center justify-center gap-4 transition-all duration-300 ${bookingData.location === 'outdoor' ? 'border-green-500 bg-green-500/20 text-white' : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'}`}
                                    >
                                        <FaTree className="text-3xl" />
                                        <div className="text-left">
                                            <div className="font-bold text-lg">Outdoor / On-Location</div>
                                            <div className="text-sm opacity-70">Natural light & scenic environments</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2"><FaCamera className="text-blue-500" /> Select Service</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {services.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => handleServiceSelect(s.id)}
                                            className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-300 ${bookingData.service === s.id ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'}`}
                                        >
                                            <div className="text-3xl">{s.icon}</div>
                                            <span className="font-medium">{s.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Details & Confirm */}
                    {step === 3 && (
                        <div className="animate-fade-in">
                            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2"><FaCheck className="text-green-500" /> Final Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                        <input type="text" name="name" value={bookingData.name} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                        <input type="email" name="email" value={bookingData.email} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                                        <input type="tel" name="phone" value={bookingData.phone} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 h-fit">
                                    <h4 className="text-lg font-bold mb-4 text-gray-200">Booking Summary</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between border-b border-gray-700 pb-2">
                                            <span className="text-gray-400">Date</span>
                                            <span className="font-medium">{bookingData.date ? `October ${bookingData.date}, 2025` : "Not selected"}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-700 pb-2">
                                            <span className="text-gray-400">Time</span>
                                            <span className="font-medium">{bookingData.time || "Not selected"}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-700 pb-2">
                                            <span className="text-gray-400">Location</span>
                                            <span className="font-medium capitalize">{bookingData.location || "Not selected"}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-700 pb-2">
                                            <span className="text-gray-400">Service</span>
                                            <span className="font-medium capitalize">{bookingData.service || "Not selected"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Additional Notes</label>
                                <textarea name="notes" value={bookingData.notes} onChange={handleInputChange} rows={3} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Tell us more about your vision..."></textarea>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10 pt-6 border-t border-gray-700">
                        {step > 1 ? (
                            <button onClick={prevStep} className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors font-medium">
                                Back
                            </button>
                        ) : (
                            <div></div>
                        )}

                        {step < 3 ? (
                            <button
                                onClick={nextStep}
                                disabled={
                                    (step === 1 && (!bookingData.date || !bookingData.time)) ||
                                    (step === 2 && (!bookingData.service || !bookingData.location))
                                }
                                className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 transform hover:scale-105">
                                Confirm Booking
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BookingSection;
