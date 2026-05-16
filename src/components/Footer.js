import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Newsletter Strip */}
      <div className="bg-green-700 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Stay Updated with Herbal Wellness</h3>
              <p className="text-green-100 text-sm">Get health tips, product launches & exclusive offers delivered to your inbox.</p>
            </div>
            <form className="flex w-full md:w-auto gap-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 md:w-72 px-4 py-3 rounded-lg text-gray-800 text-sm focus:outline-none"
              />
              <button type="submit" className="bg-white text-green-700 font-bold px-5 py-3 rounded-lg hover:bg-green-50 transition-colors text-sm whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <FaLeaf className="text-white text-lg" />
              </div>
              <div>
                <p className="font-extrabold text-white text-lg leading-tight">Steve Diamond</p>
                <p className="text-xs text-green-400 tracking-widest">HERBAL LIFE</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Your trusted source for authentic African herbs and natural remedies. Promoting wellness through traditional herbal medicine since 2020.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
                { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
                { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
                { href: 'https://wa.me/2348012345678', icon: FaWhatsapp, label: 'WhatsApp' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-5 text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/products', label: 'Browse Products' },
                { to: '/prescription', label: 'Get Free Prescription' },
                { to: '/blog', label: 'Health Blog' },
                { to: '/suppliers', label: 'Find Suppliers' },
                { to: '/track-order', label: 'Track My Order' },
                { to: '/cart', label: 'Shopping Cart' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center gap-1.5">
                    <span className="text-green-600 text-xs">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account & Help */}
          <div>
            <h3 className="text-base font-bold mb-5 text-white">Account & Help</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/register', label: 'Create Account' },
                { to: '/login', label: 'Login' },
                { to: '/profile', label: 'My Profile' },
                { to: '/track-order', label: 'Order Tracking' },
                { to: '/blog', label: 'FAQ & Resources' },
                { to: '/prescription', label: 'Health Consultation' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center gap-1.5">
                    <span className="text-green-600 text-xs">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold mb-5 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">123 Herbal Street, Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex gap-3 items-center">
                <FaPhone className="text-green-500 shrink-0" />
                <a href="tel:+2348012345678" className="text-gray-400 hover:text-green-400 transition-colors text-sm">+234 801 234 5678</a>
              </li>
              <li className="flex gap-3 items-center">
                <FaEnvelope className="text-green-500 shrink-0" />
                <a href="mailto:info@stevediamondherbal.com" className="text-gray-400 hover:text-green-400 transition-colors text-sm">info@stevediamondherbal.com</a>
              </li>
              <li className="flex gap-3 items-center">
                <FaWhatsapp className="text-green-500 shrink-0" />
                <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors text-sm">WhatsApp Us</a>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 font-medium mb-1">Business Hours</p>
              <p className="text-sm text-gray-300">Mon – Fri: 8am – 6pm</p>
              <p className="text-sm text-gray-300">Sat: 9am – 4pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {currentYear} Steve Diamond Herbal Life. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/blog" className="hover:text-green-400 transition-colors">Privacy Policy</Link>
            <Link to="/blog" className="hover:text-green-400 transition-colors">Terms of Service</Link>
            <Link to="/blog" className="hover:text-green-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
