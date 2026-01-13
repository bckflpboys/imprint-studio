"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCamera, FaVideo, FaFilm, FaPhotoVideo, FaMicrophone, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBuilding, FaTree, FaCheck, FaGripHorizontal } from "react-icons/fa";

const services = [
    { id: "photography", title: "Photo", icon: <FaCamera /> },
    { id: "videography", title: "Video", icon: <FaVideo /> },
    { id: "editing", title: "Edit", icon: <FaFilm /> },
    { id: "studio", title: "Studio", icon: <FaPhotoVideo /> },
    { id: "podcast", title: "Podcast", icon: <FaMicrophone /> },
];

const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "13:00 PM", "14:00 PM", "15:00 PM", "16:00 PM", "17:00 PM"
];

const FloatingBooking = () => {
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

    // Draggable state
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    // Initialize position on mount (bottom right default)
    // Initialize position on mount (centered vertically on the right)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const widgetHeight = 600; // Approximate height of the widget
            const yPos = Math.max(24, (window.innerHeight - widgetHeight) / 2); // Center vertically, min 24px from top

            setPosition({
                x: window.innerWidth - 380, // 350px width + 30px margin
                y: yPos
            });
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (cardRef.current) {
            setIsDragging(true);
            const rect = cardRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    }, [isDragging, dragOffset]);

    const handleMouseUp = React.useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);


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
        <div
            ref={cardRef}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            className="fixed w-[350px] max-h-[85vh] overflow-y-auto bg-gray-900/95 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl z-50 hidden lg:block scrollbar-hide transition-shadow duration-300"
        >

            {/* Header (Drag Handle) */}
            <div
                onMouseDown={handleMouseDown}
                className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur border-b border-gray-800 cursor-move select-none"
            >
                {/* Drag Bar */}
                <div className="w-full h-8 bg-grey-800/50 flex items-center justify-center gap-2 group hover:bg-grey-800 transition-colors">
                    <FaGripHorizontal className="text-xs text-gray-500 group-hover:text-primary-400 transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-primary-400 transition-colors">Drag to Move</span>
                    <FaGripHorizontal className="text-xs text-gray-500 group-hover:text-primary-400 transition-colors" />
                </div>

                {/* Title */}
                <div className="px-5 py-3">
                    <h2 className="text-lg font-bold text-white">Quick Book</h2>
                    <p className="text-xs text-gray-400">Step {step} of 3</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">

                {/* Step 1: Date & Time */}
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <h3 className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-3 flex items-center gap-2"><FaCalendarAlt /> Select Date</h3>
                            <div className="bg-grey-800 p-3 rounded-xl border border-grey-700">
                                <div className="text-center mb-3 font-bold text-white text-sm">{currentMonth} {currentYear}</div>
                                <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-500 mb-2">
                                    <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                                </div>
                                <div className="grid grid-cols-7 gap-1">
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
                                                className={`aspect-square rounded-md flex items-center justify-center text-xs transition-all 
                          ${bookingData.date === day
                                                        ? 'bg-primary-500 text-grey-900 font-bold shadow-lg shadow-primary-500/50'
                                                        : isPast
                                                            ? 'text-gray-600 cursor-not-allowed'
                                                            : 'hover:bg-grey-700 text-gray-300'
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
                            <h3 className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-3 flex items-center gap-2"><FaClock /> Select Time</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className={`py-2 px-2 rounded-lg border text-xs transition-all ${bookingData.time === time ? 'border-primary-500 bg-primary-500/20 text-primary-400' : 'border-grey-700 hover:border-grey-500 text-gray-400'}`}
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
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <h3 className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-3 flex items-center gap-2"><FaMapMarkerAlt /> Location</h3>
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={() => handleLocationSelect('studio')}
                                    className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all duration-300 ${bookingData.location === 'studio' ? 'border-primary-500 bg-primary-500/20 text-white' : 'border-grey-600 hover:border-grey-500 text-gray-400 hover:text-white'}`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-grey-800 flex items-center justify-center text-primary-400 shrink-0">
                                        <FaBuilding />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white text-sm">Studio</div>
                                        <div className="text-[10px] text-gray-400">Professional lighting</div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleLocationSelect('outdoor')}
                                    className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all duration-300 ${bookingData.location === 'outdoor' ? 'border-neon-blue bg-neon-blue/20 text-white' : 'border-grey-600 hover:border-grey-500 text-gray-400 hover:text-white'}`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-grey-800 flex items-center justify-center text-neon-blue shrink-0">
                                        <FaTree />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white text-sm">Outdoor</div>
                                        <div className="text-[10px] text-gray-400">Natural light</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-3 flex items-center gap-2"><FaCamera /> Service</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {services.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => handleServiceSelect(s.id)}
                                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-300 ${bookingData.service === s.id ? 'border-primary-500 bg-primary-500/20 text-white' : 'border-grey-600 hover:border-grey-500 text-gray-400 hover:text-white'}`}
                                    >
                                        <div className="text-xl text-gray-300">{s.icon}</div>
                                        <span className="font-medium text-xs">{s.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Details & Confirm */}
                {step === 3 && (
                    <div className="animate-fade-in space-y-4">
                        <h3 className="text-xs font-semibold text-neon-blue uppercase tracking-wider mb-3 flex items-center gap-2"><FaCheck /> Final Details</h3>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 mb-1">Full Name</label>
                                <input type="text" name="name" value={bookingData.name} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 mb-1">Email</label>
                                <input type="email" name="email" value={bookingData.email} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 mb-1">Phone</label>
                                <input type="tel" name="phone" value={bookingData.phone} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="+1 (555) 000-0000" />
                            </div>
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                            <h4 className="text-xs font-bold mb-2 text-white">Summary</h4>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between border-b border-gray-700 pb-1">
                                    <span className="text-gray-400">Time</span>
                                    <span className="font-medium text-white">{bookingData.date ? `Oct ${bookingData.date}` : "-"} at {bookingData.time || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-1">
                                    <span className="text-gray-400">Loc</span>
                                    <span className="font-medium capitalize text-white">{bookingData.location || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-1">
                                    <span className="text-gray-400">Svc</span>
                                    <span className="font-medium capitalize text-white">{bookingData.service || "-"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer / Navigation */}
            <div className="p-5 bg-gray-900/50 border-t border-gray-800 flex justify-between items-center sticky bottom-0">
                {step > 1 ? (
                    <button onClick={prevStep} className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-xs font-medium">
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
                        className="px-6 py-2 rounded-lg bg-primary-500 text-grey-900 font-bold hover:bg-primary-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30 text-xs"
                    >
                        Next
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-400 text-grey-900 font-bold hover:from-primary-400 hover:to-primary-300 transition-all shadow-lg shadow-primary-500/30 transform hover:scale-105 text-xs">
                        Confirm
                    </button>
                )}
            </div>

        </div>
    );
};

export default FloatingBooking;
