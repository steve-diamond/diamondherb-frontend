import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCartStore } from '../store';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url || '/placeholder-product.jpg';
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) 
    : 0;

  return (
    <div className="card group">
      <Link to={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg mb-4 h-64">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {hasDiscount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              -{discountPercent}%
            </span>
          )}
          {product.featured && (
            <span className="absolute top-2 left-2 bg-green-700 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Category */}
        <p className="text-sm text-green-700 font-medium mb-1">
          {product.category?.replace(/-/g, ' ').toUpperCase()}
        </p>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        {/* Short Description */}
        {product.shortDescription && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Rating */}
        {product.ratings?.average > 0 && (
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(product.ratings.average) ? 'fill-current' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.ratings.count})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline space-x-2 mb-3">
          <span className="text-2xl font-bold text-green-700">
            ₦{product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ₦{product.comparePrice.toLocaleString()}
            </span>
          )}
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
          product.stock === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-700 text-white hover:bg-green-800'
        }`}
      >
        <FaShoppingCart />
        <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
      </button>
    </div>
  );
};

export default ProductCard;
