import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FaLeaf, FaHeartbeat, FaShoppingBag, FaUserMd, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { productsAPI, articlesAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // Fetch featured products
  const { data: productsData } = useQuery(
    ['featured-products'],
    () => productsAPI.getAll({ featured: true, limit: 8 })
  );

  // Fetch recent articles
  const { data: articlesData } = useQuery(
    ['recent-articles'],
    () => articlesAPI.getAll({ limit: 3 })
  );

  const products = productsData?.data?.products || [];
  const articles = articlesData?.data?.articles || [];

  return (
    <div className="Home">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Natural Healing with African Herbs
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Discover the power of traditional herbal medicine for your health and wellness journey
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center">
                  Shop Now <FaArrowRight className="ml-2" />
                </Link>
                <Link to="/prescription" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors">
                  Get Prescription
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <img src="/hero-herbs.jpg" alt="African Herbs" className="rounded-lg shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FaLeaf, title: '100% Natural', desc: 'Pure organic herbs' },
              { icon: FaHeartbeat, title: 'Health First', desc: 'Tested and certified' },
              { icon: FaShoppingBag, title: 'Easy Shopping', desc: 'Fast delivery' },
              { icon: FaUserMd, title: 'Expert Advice', desc: 'Free consultations' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-4xl text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Discover our most popular herbal remedies
            </p>
          </div>
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/products" className="btn-primary inline-block">
                  View All Products
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">Loading products...</p>
          )}
        </div>
      </section>

      {/* CTA Section - Prescription */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <FaUserMd className="text-6xl mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Get Personalized Herbal Prescription</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Answer a few questions about your health concerns and receive tailored herbal recommendations
          </p>
          <Link to="/prescription" className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block">
            Start Questionnaire
          </Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Health Tips & Articles</h2>
            <p className="section-subtitle">
              Learn about the benefits of traditional herbal medicine
            </p>
          </div>
          {articles.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link key={article._id} to={`/blog/${article.slug}`} className="card group">
                    {article.featuredImage && (
                      <img
                        src={article.featuredImage.url}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity"
                      />
                    )}
                    <p className="text-sm text-green-700 font-medium mb-2">
                      {article.category.replace(/-/g, ' ').toUpperCase()}
                    </p>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <span className="text-green-700 font-semibold flex items-center">
                      Read More <FaArrowRight className="ml-2" />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/blog" className="btn-primary inline-block">
                  View All Articles
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">Loading articles...</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Adaeze O.', text: 'The herbs have greatly improved my digestion. Highly recommended!', rating: 5 },
              { name: 'Chukwu M.', text: 'Natural and effective. I love the personalized prescription service.', rating: 5 },
              { name: 'Folake S.', text: 'Fast delivery and excellent customer service. Will order again!', rating: 5 },
            ].map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-green-700">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
