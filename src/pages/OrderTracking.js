import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ordersAPI } from '../services/api';
import toast from 'react-hot-toast';

const OrderTracking = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await ordersAPI.track(data.orderId);
      setOrder(res.data.order);
    } catch {
      toast.error('Order not found. Please check your order ID.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Track Your Order</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
          <input
            {...register('orderId', { required: 'Order ID is required' })}
            placeholder="Enter your order ID"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.orderId && <p className="text-red-500 text-sm mt-1">{errors.orderId.message}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Track Order'}
        </button>
      </form>

      {order && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Order #{order._id?.slice(-8).toUpperCase()}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
              {order.status}
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <div className="space-y-2">
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{item.product?.name || 'Product'} × {item.quantity}</span>
                <span>GH₵ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>GH₵ {order.total?.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
