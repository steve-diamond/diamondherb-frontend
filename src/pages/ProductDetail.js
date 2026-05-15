import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FaShoppingCart, FaStar, FaCheck, FaMinus, FaPlus } from 'react-icons/fa';
import { productsAPI } from '../services/api';
import { useCartStore } from '../store';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();

  const { data, isLoading } = useQuery(
    ['product', slug],
    () => productsAPI.getBySlug(slug)
  );

  const product = data?.data?.product;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="btn-primary inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const images = product.images || [];
  const primaryImage = images[selectedImage]?.url || '/placeholder-product.jpg';

  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-green-700">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-green-700">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={primaryImage}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImage === idx ? 'border-green-700' : 'border-gray-200'
                    }`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-green-700 font-semibold mb-2">
              {product.category?.replace(/-/g, ' ').toUpperCase()}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            {product.ratings?.average > 0 && (
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-xl">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.round(product.ratings.average) ? 'fill-current' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.ratings.average.toFixed(1)} ({product.ratings.count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-4xl font-bold text-green-700">
                ₦{product.price.toLocaleString()}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₦{product.comparePrice.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-green-600 font-semibold flex items-center">
                  <FaCheck className="mr-2" /> In Stock ({product.stock} {product.unit}s available)
                </p>
              ) : (
                <p className="text-red-600 font-semibold">Out of Stock</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Benefits</h2>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Usage */}
            {product.usage && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">How to Use</h2>
                <p className="text-gray-700">{product.usage}</p>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-6 py-3 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <p className="text-gray-700">{product.ingredients.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
