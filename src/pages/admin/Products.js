import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { productsAPI } from '../../services/api';

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['admin-products'], () => productsAPI.getAll());
  const products = data?.data?.products || [];

  const deleteMutation = useMutation((id) => productsAPI.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products']);
      toast.success('Product deleted.');
    },
    onError: () => toast.error('Failed to delete product.'),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-800">Manage Products</h1>
      </div>
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Price</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Stock</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">GH₵ {product.price?.toFixed(2)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this product?')) {
                          deleteMutation.mutate(product._id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
