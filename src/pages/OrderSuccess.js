import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-green-800 mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your order. We'll process it shortly and keep you updated.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/track-order"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Track Order
        </Link>
        <Link
          to="/products"
          className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
