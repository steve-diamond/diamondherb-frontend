import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { ordersAPI } from '../../services/api';

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['admin-orders'], () => ordersAPI.getAll());
  const orders = data?.data?.orders || [];

  const updateMutation = useMutation(({ id, status }) => ordersAPI.updateStatus(id, status), {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders']);
      toast.success('Order status updated.');
    },
    onError: () => toast.error('Failed to update order.'),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Manage Orders</h1>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Customer</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Total</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm">#{order._id?.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3">{order.user?.name || 'Guest'}</td>
                  <td className="px-4 py-3">GH₵ {order.total?.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateMutation.mutate({ id: order._id, status: e.target.value })}
                      className={`px-2 py-1 rounded text-sm font-medium border-0 focus:ring-2 focus:ring-green-500 ${statusColors[order.status] || 'bg-gray-100'}`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
