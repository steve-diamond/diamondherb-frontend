import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Prescription from './pages/Prescription';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import Suppliers from './pages/Suppliers';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderTracking from './pages/OrderTracking';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminArticles from './pages/admin/Articles';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="products" element={<ProductListing />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="prescription" element={<Prescription />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<ArticleDetail />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="cart" element={<Cart />} />
        <Route path="track-order" element={<OrderTracking />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="order-success" element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="admin" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="admin/products" element={
          <ProtectedRoute adminOnly>
            <AdminProducts />
          </ProtectedRoute>
        } />
        <Route path="admin/orders" element={
          <ProtectedRoute adminOnly>
            <AdminOrders />
          </ProtectedRoute>
        } />
        <Route path="admin/articles" element={
          <ProtectedRoute adminOnly>
            <AdminArticles />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
