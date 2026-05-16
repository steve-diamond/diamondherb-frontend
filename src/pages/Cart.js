import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/index';

const Cart = () => {
  const { items: cart, removeItem: removeFromCart, updateQuantity: updateCartQuantity } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Add some herbal products to get started.</p>
        <Link
          to="/products"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product._id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
              {item.product.images?.[0] && (
                <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-green-600 font-bold">GH₵ {item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartQuantity(item.product._id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.product._id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>GH₵ {total.toFixed(2)}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>GH₵ {total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 font-semibold"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
