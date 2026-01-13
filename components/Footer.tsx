import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-4 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-2xl font-bold tracking-wider">
              IMPRINT<span className="text-blue-500">STUDIO</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Imprint Media Studio is a premier photography and videography service provider. We specialize in capturing life&apos;s most precious moments with creativity and passion.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="#services" className="hover:text-blue-400 transition">Photography</Link></li>
            <li><Link href="#services" className="hover:text-blue-400 transition">Videography</Link></li>
            <li><Link href="#services" className="hover:text-blue-400 transition">Editing</Link></li>
            <li><Link href="#services" className="hover:text-blue-400 transition">Studio Rental</Link></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link href="#gallery" className="hover:text-blue-400 transition">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Get in Touch</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>Email: <a href="mailto:info@imprintstudio.com" className="hover:text-blue-400">info@imprintstudio.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-blue-400">+1 (234) 567-890</a></li>
            <li>Location: 123 Creative Ave, Design City</li>
          </ul>
          <div className="flex gap-4 mt-6">
            <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition text-white"><FaFacebookF /></a>
            <a href="#" className="bg-gray-800 hover:bg-pink-600 p-2 rounded-full transition text-white"><FaInstagram /></a>
            <a href="#" className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition text-white"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Imprint Media Studio. All rights reserved.
      </div>
    </footer>
  );
}
