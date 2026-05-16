import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaLeaf, FaChevronDown, FaSearch } from 'react-icons/fa';
import { useAuthStore } from '../store';
import { useCartStore } from '../store';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const navigate = useNavigate();
  const cartCount = getItemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/prescription', label: 'Prescription' },
    { path: '/blog', label: 'Blog' },
    { path: '/suppliers', label: 'Suppliers' },
    { path: '/track-order', label: 'Track Order' },
  ];

  const activeLinkClass = 'text-green-600 font-semibold';
  const normalLinkClass = 'text-gray-700 hover:text-green-600 transition-colors font-medium';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-sm'}`}>
      {/* Top Bar */}
      <div className="bg-green-700 text-white text-xs py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>🌿 Free herbal prescription with every order above ₦10,000</span>
          <div className="flex gap-6">
            <a href="tel:+2348012345678" className="hover:text-green-200 transition-colors">📞 +234 801 234 5678</a>
            <a href="mailto:info@stevediamondherbal.com" className="hover:text-green-200 transition-colors">✉️ info@stevediamondherbal.com</a>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-green-600 p-2 rounded-lg">
              <FaLeaf className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-green-700 leading-tight">Steve Diamond</h1>
              <p className="text-xs text-gray-500 leading-tight tracking-wide">HERBAL LIFE</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {user?.firstName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden md:block text-sm font-semibold">{user?.firstName}</span>
                  <FaChevronDown className={`text-xs transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b mb-1">
                      <p className="text-sm font-bold text-gray-800">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">
                      <FaUser className="text-xs" /> My Profile
                    </Link>
                    <Link to="/track-order" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">
                      🔍 Track Order
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">
                        ⚙️ Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="hidden md:inline-block text-green-700 font-semibold hover:text-green-500 transition-colors text-sm">
                  Login
                </Link>
                <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-100">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `block py-2.5 px-2 rounded-lg text-sm font-medium mb-1 ${isActive ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-2 mt-3 pt-3 border-t">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center border border-green-600 text-green-600 py-2 rounded-lg text-sm font-semibold">Login</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg text-sm font-semibold">Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

