import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 mt-auto border-t border-blue-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-10 w-auto relative">
              <Image
                src="/logo.png"
                alt="MMID Logo"
                width={200}
                height={80}
                style={{ width: 'auto', height: '100%' }}
                className="object-contain"
                unoptimized
              />
            </div>

          </div>
          <p className="text-gray-400 text-sm">Your trusted directory for local businesses, services, and more. Helping you connect and grow in your community.</p>
        </div>
        {/* Useful Links */}
        <div>
          <h4 className="text-blue-300 font-semibold mb-3">Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/about" className="hover:text-blue-400 transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            <li><Link href="/blog" className="hover:text-blue-400 transition">Blog</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h4 className="text-blue-300 font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email: <a href="mailto:info@mmid.com" className="hover:text-blue-400">info@mmid.co.za</a></li>
            <li>Phone: <a href="tel:+27123456789" className="hover:text-blue-400">+27 12 345 6789</a></li>
            <li>Location: Kimberley, South Africa</li>
          </ul>
        </div>
        {/* Social Media */}
        <div>
          <h4 className="text-blue-300 font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <a href="#" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition"><FaFacebookF /></a>
            <a href="#" className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full transition"><FaTwitter /></a>
            <a href="#" className="bg-pink-500 hover:bg-pink-600 p-2 rounded-full transition"><FaInstagram /></a>
            <a href="#" className="bg-blue-700 hover:bg-blue-800 p-2 rounded-full transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} MMID. All rights reserved.
      </div>
    </footer>
  );
}
