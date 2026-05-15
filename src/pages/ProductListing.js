import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: '-createdAt',
  });
  const [page, setPage] = useState(1);

  // Fetch products
  const { data, isLoading } = useQuery(
    ['products', filters, page],
    () => productsAPI.getAll({ ...filters, page, limit: 12 }),
    { keepPreviousData: true }
  );

  // Fetch categories
  const { data: categoriesData } = useQuery(
    ['product-categories'],
    () => productsAPI.getCategories()
  );

  const products = data?.data?.products || [];
  const totalPages = data?.data?.pages || 1;
  const categories = categoriesData?.data?.categories || [];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover authentic African herbs for your health needs</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name.replace(/-/g, ' ')} ({cat.count})
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="input-field"
            >
              <option value="-createdAt">Newest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
              <option value="-name">Name: Z-A</option>
            </select>
          </form>

          {/* Price Range */}
          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center space-x-2 md:col-span-2">
              <FaFilter className="text-gray-500" />
              <span className="text-gray-700 font-medium">Price Range:</span>
            </div>
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner"></div>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
            <button
              onClick={() => setFilters({ search: '', category: '', minPrice: '', maxPrice: '', sort: '-createdAt' })}
              className="btn-primary mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
