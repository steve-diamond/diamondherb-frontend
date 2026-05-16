import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  FaLeaf, FaHeartbeat, FaShoppingBag, FaUserMd, FaArrowRight,
  FaChevronLeft, FaChevronRight, FaStar, FaTruck, FaShieldAlt,
  FaFlask, FaMapMarkerAlt, FaQuoteLeft
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { productsAPI, articlesAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
const slides = [
  {
    id: 1,
    headline: 'Natural Healing with African Herbs',
    sub: 'Discover the power of traditional herbal medicine passed down through generations for your complete health and wellness journey.',
    cta1: { label: 'Shop Products', to: '/products' },
    cta2: { label: 'Get Prescription', to: '/prescription' },
    bg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80',
    tag: '100% Natural & Organic',
  },
  {
    id: 2,
    headline: 'Personalized Herbal Prescriptions',
    sub: 'Answer a few questions about your health concerns and receive expert-tailored herbal recommendations — completely free.',
    cta1: { label: 'Start Questionnaire', to: '/prescription' },
    cta2: { label: 'Learn More', to: '/blog' },
    bg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1600&q=80',
    tag: 'Expert Consultation',
  },
  {
    id: 3,
    headline: 'Pure, Tested & Certified Products',
    sub: 'Every product on our platform is sourced from verified suppliers and tested for purity, potency, and safety — so you can shop with full confidence.',
    cta1: { label: 'View Products', to: '/products' },
    cta2: { label: 'Our Suppliers', to: '/suppliers' },
    bg: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1600&q=80',
    tag: 'Quality Guaranteed',
  },
  {
    id: 4,
    headline: 'Fast & Reliable Nationwide Delivery',
    sub: 'Order from the comfort of your home and receive your herbal products delivered swiftly to your doorstep anywhere across the country.',
    cta1: { label: 'Shop Now', to: '/products' },
    cta2: { label: 'Track Order', to: '/track-order' },
    bg: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80',
    tag: 'Doorstep Delivery',
  },
  {
    id: 5,
    headline: 'Join Our Wellness Community',
    sub: 'Read expert health articles, discover wellness tips, and connect with a growing community of people who choose nature as their first medicine.',
    cta1: { label: 'Read Our Blog', to: '/blog' },
    cta2: { label: 'Find Suppliers', to: '/suppliers' },
    bg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80',
    tag: 'Health & Community',
  },
];

const features = [
  { icon: FaLeaf, title: '100% Natural', desc: 'Pure, organic herbs with no artificial additives or preservatives.', color: 'bg-green-100 text-green-700' },
  { icon: FaFlask, title: 'Lab Tested', desc: 'Every product is scientifically tested for purity and potency.', color: 'bg-emerald-100 text-emerald-700' },
  { icon: FaTruck, title: 'Fast Delivery', desc: 'Nationwide delivery to your doorstep within 2–5 business days.', color: 'bg-teal-100 text-teal-700' },
  { icon: FaUserMd, title: 'Expert Advice', desc: 'Free personalized herbal prescriptions from certified herbalists.', color: 'bg-cyan-100 text-cyan-700' },
  { icon: FaShieldAlt, title: 'Secure Payments', desc: 'All transactions are encrypted and 100% secure.', color: 'bg-blue-100 text-blue-700' },
  { icon: FaMapMarkerAlt, title: 'Local Suppliers', desc: 'Supporting authentic African herb farmers and local communities.', color: 'bg-lime-100 text-lime-700' },
];

const testimonials = [
  { name: 'Adaeze Okonkwo', role: 'Lagos, Nigeria', text: 'The herbal blend for my digestion issues has been life-changing. After just 3 weeks I feel so much better. Truly nature\'s best!', rating: 5, avatar: 'https://i.pravatar.cc/80?img=47' },
  { name: 'Kwame Mensah', role: 'Accra, Ghana', text: 'The personalized prescription service is amazing. They understood my health concerns and the recommended herbs worked perfectly.', rating: 5, avatar: 'https://i.pravatar.cc/80?img=12' },
  { name: 'Folake Adeyemi', role: 'Abuja, Nigeria', text: 'Fast delivery and excellent packaging. The moringa capsules are authentic and the quality is far better than what I find locally.', rating: 5, avatar: 'https://i.pravatar.cc/80?img=32' },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data: productsData } = useQuery(
    ['featured-products'],
    () => productsAPI.getAll({ featured: true, limit: 8 })
  );
  const { data: articlesData } = useQuery(
    ['recent-articles'],
    () => articlesAPI.getAll({ limit: 3 })
  );

  const products = productsData?.data?.products || [];
  const articles = articlesData?.data?.articles || [];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (i) => { setCurrentSlide(i); setIsAutoPlaying(false); };
  const prevSlide = () => { setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); setIsAutoPlaying(false); };
  const nextSlide = () => { setCurrentSlide((prev) => (prev + 1) % slides.length); setIsAutoPlaying(false); };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen">

      {/* ── HERO SLIDER ── */}
      <section className="relative h-screen min-h-[600px] max-h-[850px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slide.bg}
              alt={slide.headline}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + '-content'}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="max-w-2xl"
              >
                <span className="inline-block bg-green-500/20 border border-green-400/50 text-green-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
                  🌿 {slide.tag}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 drop-shadow-lg">
                  {slide.headline}
                </h1>
                <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                  {slide.sub}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={slide.cta1.to}
                    className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2 transition-all duration-300 shadow-lg shadow-green-900/40 hover:shadow-green-500/30 hover:-translate-y-0.5"
                  >
                    {slide.cta1.label} <FaArrowRight />
                  </Link>
                  <Link
                    to={slide.cta2.to}
                    className="border-2 border-white/70 text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-green-800 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {slide.cta2.label}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-sm">
          <FaChevronLeft />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-sm">
          <FaChevronRight />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-green-400' : 'w-2.5 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 right-6 z-20 text-white/60 text-sm font-mono">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-green-700 text-white py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            {['✅ 100% Natural Herbs', '🚚 Nationwide Delivery', '🔬 Lab Tested & Certified', '👨‍⚕️ Free Herbal Prescription', '🔒 Secure Payments'].map((t, i) => (
              <span key={i} className="opacity-90">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Your Wellness is Our Priority</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">We blend ancient African herbal wisdom with modern science to bring you the best nature has to offer.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${f.color} group-hover:scale-110 transition-transform`}>
                  <f.icon className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Our Products</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-1">Featured Herbal Products</h2>
              <p className="text-gray-500 mt-2">Handpicked bestsellers trusted by thousands of customers.</p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-500 transition-colors">
              View All <FaArrowRight className="text-sm" />
            </Link>
          </div>
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center mt-10 md:hidden">
                <Link to="/products" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  View All Products <FaArrowRight />
                </Link>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PRESCRIPTION CTA BANNER ── */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1600&q=80"
          alt="Herbal prescription"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900/80" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <FaUserMd className="text-6xl mx-auto mb-5 text-green-300" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Get Your Free Herbal Prescription</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Tell us about your health concerns and our certified herbalists will create a personalized natural remedy plan — completely free of charge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/prescription" className="bg-green-400 hover:bg-green-300 text-green-900 font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-xl">
              Start Free Consultation
            </Link>
            <Link to="/blog" className="border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all">
              Read Health Articles
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOG SECTION ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Our Blog</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-1">Health Tips & Wellness Articles</h2>
              <p className="text-gray-500 mt-2">Learn from our herbalists and wellness experts.</p>
            </div>
            <Link to="/blog" className="hidden md:inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-500 transition-colors">
              All Articles <FaArrowRight className="text-sm" />
            </Link>
          </div>
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/blog/${article.slug}`} className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="h-52 overflow-hidden">
                      <img
                        src={article.featuredImage?.url || `https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-green-600 font-bold uppercase tracking-widest">{article.category?.replace(/-/g, ' ') || 'Wellness'}</span>
                      <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">{article.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Read More <FaArrowRight />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Trusted by Thousands</h2>
            <p className="text-gray-500 mt-3">Real stories from real customers who transformed their health naturally.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <FaQuoteLeft className="text-green-300 text-3xl mb-4" />
                <p className="text-gray-600 italic leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-800">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                  <div className="ml-auto flex text-yellow-400 text-sm">
                    {[...Array(t.rating)].map((_, j) => <FaStar key={j} />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 bg-green-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Ready to Start Your Natural Healing Journey?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">Join thousands of people who have chosen nature as their first medicine.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors">
              Browse Products
            </Link>
            <Link to="/register" className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-green-800 transition-colors">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
