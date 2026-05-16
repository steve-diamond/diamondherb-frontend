import React from 'react';
import { useQuery } from 'react-query';
import { suppliersAPI } from '../services/api';

const Suppliers = () => {
  const { data, isLoading } = useQuery(['suppliers'], () => suppliersAPI.getAll());
  const suppliers = data?.data?.suppliers || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Our Suppliers</h1>
      {isLoading ? (
        <p>Loading suppliers...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <div key={supplier._id} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{supplier.name}</h2>
              {supplier.country && (
                <p className="text-gray-500 text-sm mb-1">🌍 {supplier.country}</p>
              )}
              {supplier.description && (
                <p className="text-gray-600 text-sm mt-2">{supplier.description}</p>
              )}
            </div>
          ))}
          {suppliers.length === 0 && (
            <p className="text-gray-500 col-span-3">No suppliers listed yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Suppliers;
