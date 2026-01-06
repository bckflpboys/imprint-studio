import React from "react";
import { Metadata } from "next";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import FloatingBooking from "@/components/FloatingBooking";

// Directly define metadata
export const metadata: Metadata = {
  title: "Contact Us - Imprint Media Studio",
  description: "Get in touch with Imprint Media Studio for professional photography, videography, and studio services.",
  openGraph: {
    title: "Contact Us - Imprint Media Studio",
    description: "Get in touch with Imprint Media Studio for professional photography, videography, and studio services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Imprint Media Studio",
    description: "Get in touch with Imprint Media Studio for professional photography, videography, and studio services.",
  },
};

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <FloatingBooking />

      {/* Header Section */}
      <section className="relative w-full py-24 mb-12 overflow-hidden border-b-2 border-gray-300 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 opacity-60 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-sm">Contact Us</h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Ready to capture your moments? Reach out to us for bookings, inquiries, or just to say hello.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 h-full shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="mr-4 p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Studio Address</h3>
                    <p className="text-gray-600 mt-1">123 Creative Avenue, Suite 101<br />Kimberley, South Africa</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="mr-4 p-3 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Phone</h3>
                    <p className="text-gray-600 mt-1">+27 123 456 7890</p>
                    <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am-5pm</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="mr-4 p-3 bg-pink-50 rounded-lg text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
                    <p className="text-gray-600 mt-1">hello@imprintstudio.co.za</p>
                    <p className="text-xs text-gray-500 mt-1">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="mr-4 p-3 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Hours</h3>
                    <p className="text-gray-600 mt-1">Mon - Fri: 09:00 - 17:00</p>
                    <p className="text-gray-600">Sat: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm">Full Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400" placeholder="John Doe" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">Email Address</label>
                    <input type="email" id="email" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400" placeholder="john@example.com" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2 text-sm">Subject</label>
                  <select id="subject" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Request</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="support">Support</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-sm">Message</label>
                  <textarea id="message" rows={6} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400" placeholder="Tell us more about your project..." required></textarea>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-12 mb-12">
        <div className="container mx-auto px-4">
          <div className="w-full h-96 bg-gray-100 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-300 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3573.692258991536!2d24.765957315079!3d-28.741966982378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e955fe657f41547%3A0x841c4e7b6d4f4d4e!2sKimberley%2C%20Northern%20Cape%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1635791234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
