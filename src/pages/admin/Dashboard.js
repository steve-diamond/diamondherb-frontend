import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { productsAPI, ordersAPI, articlesAPI } from '../../services/api';

const AdminDashboard = () => {
  const { data: productsData } = useQuery(['admin-products'], () => productsAPI.getAll());
  const { data: ordersData } = useQuery(['admin-orders'], () => ordersAPI.getAll());
  const { data: articlesData } = useQuery(['admin-articles'], () => articlesAPI.getAll());

  const stats = [
    { label: 'Products', count: productsData?.data?.total || 0, link: '/admin/products', color: 'bg-green-100 text-green-800' },
    { label: 'Orders', count: ordersData?.data?.total || 0, link: '/admin/orders', color: 'bg-blue-100 text-blue-800' },
    { label: 'Articles', count: articlesData?.data?.total || 0, link: '/admin/articles', color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link} className={`rounded-lg p-6 ${stat.color} hover:opacity-90`}>
            <p className="text-4xl font-bold mb-2">{stat.count}</p>
            <p className="text-lg font-medium">{stat.label}</p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/products" className="block bg-white rounded-lg shadow p-4 hover:shadow-md text-center font-semibold text-green-700">Manage Products</Link>
        <Link to="/admin/orders" className="block bg-white rounded-lg shadow p-4 hover:shadow-md text-center font-semibold text-blue-700">Manage Orders</Link>
        <Link to="/admin/articles" className="block bg-white rounded-lg shadow p-4 hover:shadow-md text-center font-semibold text-purple-700">Manage Articles</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
