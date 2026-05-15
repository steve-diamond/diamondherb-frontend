import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaLeaf className="text-2xl text-green-400" />
              <h3 className="text-xl font-bold">Steve Diamond Herbal Life</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted source for authentic African herbs and natural remedies. 
              Promoting wellness through traditional herbal medicine.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaWhatsapp className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-green-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/prescription" className="text-gray-300 hover:text-green-400 transition-colors">
                  Get Prescription
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-green-400 transition-colors">
                  Blog & Resources
                </Link>
              </li>
              <li>
                <Link to="/suppliers" className="text-gray-300 hover:text-green-400 transition-colors">
                  Find Suppliers
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-300 hover:text-green-400 transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-green-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-green-400 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-green-400 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-green-400 mt-1" />
                <span className="text-gray-300 text-sm">
                  123 Herbal Street, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-green-400" />
                <a href="tel:+2348012345678" className="text-gray-300 hover:text-green-400">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-green-400" />
                <a href="mailto:info@stevediamond.com" className="text-gray-300 hover:text-green-400">
                  info@stevediamond.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Steve Diamond Herbal Life. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="text-gray-400 hover:text-green-400 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-green-400 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
