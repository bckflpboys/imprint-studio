import React from "react";
import { Metadata } from "next";

// Directly define metadata
export const metadata: Metadata = {
  title: "Contact Us - MMID",
  description: "Get in touch with MMID for any inquiries, support, or partnership opportunities.",
  openGraph: {
    title: "Contact Us - MMID",
    description: "Get in touch with MMID for any inquiries, support, or partnership opportunities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - MMID",
    description: "Get in touch with MMID for any inquiries, support, or partnership opportunities.",
  },
};

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative w-full bg-blue-700 text-white py-16 mb-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMCAxIDEgMiAyIDJoMnYtNGgtMmMtMSAwLTIgMS0yIDJ6TTMwIDRDMTMuNDMxIDQgMCAxNy40MzEgMCAzNHMxMy40MzEgMzAgMzAgMzAgMzAtMTMuNDMxIDMwLTMwUzQ2LjU2OSA0IDMwIDR6TTEwLjIyNSA0Mi42OGMtNS41NTYtOS45NDItMi4zLTIyLjUyNyA3LjY0MS0yOC4wODJDMjcuODA5IDkuMDQyIDQwLjM5NSAxMi4yOTcgNDUuOTUgMjIuMjM5YzUuNTU2IDkuOTQzIDIuMyAyMi41MjgtNy42NDEgMjguMDgyLTkuOTQyIDUuNTU1LTIyLjUyNyAyLjMtMjguMDg0LTcuNjQxeiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat repeat" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Contact Us</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-3xl">We&apos;re here to help with any questions or concerns. Reach out to us and we&apos;ll get back to you as soon as possible.</p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="container mx-auto px-4 py-16 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-8 h-full border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">123 Business Avenue, Suite 456, Kimberley, South Africa</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.268a2 2 0 012 1.268l1.732 8.66A2 2 0 0111.732 15H8.268A2 2 0 017 13.732L5.268 5A2 2 0 013 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5h10v4H7V5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2v-6a2 2 0 012-2h2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+27 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 8l4 4 4-4"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">info@mmid.co.za</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-semibold text-gray-800 mb-3">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your Name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your Email" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Subject" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your Message" required></textarea>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-16 bg-gray-100 mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find Us</h2>
          <div className="w-full h-80 bg-gray-300 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            {/* Placeholder for map - replace with actual map integration */}
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
