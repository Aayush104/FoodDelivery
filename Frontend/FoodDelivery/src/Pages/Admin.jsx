import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import AllMenus from '../Components/AllMenus';
import axios from 'axios';
// import AddMenu from './AddMenu'; // Import the AddMenu component
// import Menu from './Menu';

const Admin = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  localStorage.removeItem("cartItems");

  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/payment/get-Order");
        
        if (response.data && response.data.status === "success" && response.data.data.orders) {
          setOrders(response.data.data.orders);
        } else {
          setError("Failed to fetch orders or invalid data format");
        }
      } catch (err) {
        setError("Error fetching orders: " + err.message);
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  
  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
  }
  
  // Function to render the appropriate content based on activeItem
  const renderContent = () => {
    switch(activeItem) {
      case 'addMenu':
        return <MenuItem />;
      case 'orders':
        return <OrdersList orders={orders} loading={loading} error={error} />;
      case 'allMenus':
        return <AllMenus />;
      case 'home':
      default:
        return <Dashboard orders={orders} loading={loading} error={error} />;
    }
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-orange-500 text-white flex flex-col fixed h-screen">
        <div className="p-5 text-2xl font-bold flex items-center space-x-3 border-b border-orange-400 border-opacity-30 mb-6">
          <span>🍔</span>
          <span>QuickEat</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-orange-400 ${activeItem === 'home' ? 'bg-orange-400' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <span>🏠</span>
          <span>Home</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-orange-400 ${activeItem === 'orders' ? 'bg-orange-400' : ''}`}
          onClick={() => handleNavClick('orders')}
        >
          <span>📋</span>
          <span>All Orders</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-orange-400 ${activeItem === 'addMenu' ? 'bg-orange-400' : ''}`}
          onClick={() => handleNavClick('addMenu')}
        >
          <span>➕</span>
          <span>Add Menu</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-orange-400 ${activeItem === 'allMenus' ? 'bg-orange-400' : ''}`}
          onClick={() => handleNavClick('allMenus')}
        >
          <span>🍽️</span>
          <span>All Menus</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-orange-400 mt-auto mb-6`}
          onClick={() => handleLogOut()}
        >
          <span>🚪</span>
          <span>LogOut</span>
        </div>
      </div>
      
      {/* Main Content - with left margin to account for fixed sidebar */}
      <div className="flex-1 p-8 ml-64">
        {renderContent()}
      </div>
    </div>
  );
};

// Dashboard component for the home view
const Dashboard = ({ orders, loading, error }) => {
  // Get today's date in ISO format for comparison
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate dashboard metrics
  const todaysOrders = orders.filter(order => 
    order.orderDate.split('T')[0] === today
  ).length;
  
  const pendingOrders = orders.length; // Replace with actual logic once you have status
  
  // Calculate total revenue
  const totalRevenue = orders.reduce((sum, order) => 
    sum + parseFloat(order.totalAmount), 
    0
  ).toFixed(2);
  
  // Latest 5 orders for the table
  const recentOrders = [...orders].sort((a, b) => 
    new Date(b.orderDate) - new Date(a.orderDate)
  ).slice(0, 5);

  // Helper function to format date to time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome back, Admin!</h1>
        <span className="text-gray-600">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>
      
      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">TODAY'S ORDERS</div>
          <div className="text-3xl font-bold text-gray-800">{todaysOrders}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">PENDING ORDERS</div>
          <div className="text-3xl font-bold text-gray-800">{pendingOrders}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">TOTAL REVENUE</div>
          <div className="text-3xl font-bold text-gray-800">${totalRevenue}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">ACTIVE MENU ITEMS</div>
          <div className="text-3xl font-bold text-gray-800">42</div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">Error loading orders</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Order ID</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Customer</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Items</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Total</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Time</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 px-4 border-b border-gray-100">#{order.id.substring(0, 8)}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{order.foodName}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{order.quantity} item(s)</td>
                    <td className="py-3 px-4 border-b border-gray-100">Rs.{parseFloat(order.totalAmount).toFixed(2)}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{formatTime(order.orderDate)}</td>
                    <td className="py-3 px-4 border-b border-gray-100">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Preparing
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

// OrdersList component for the orders view
const OrdersList = ({ orders, loading, error }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Orders</h1>
      
      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Order ID</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Customer</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Quantity</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Total</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Delivery Address</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Order Date</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Status</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 px-4 border-b border-gray-100">#{order.id.substring(0, 8)}</td>
                  <td className="py-3 px-4 border-b border-gray-100">{order.foodName}</td>
                  <td className="py-3 px-4 border-b border-gray-100">{order.quantity}</td>
                  <td className="py-3 px-4 border-b border-gray-100">${parseFloat(order.totalAmount).toFixed(2)}</td>
                  <td className="py-3 px-4 border-b border-gray-100">{order.deliveryAddress}</td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    {new Date(order.orderDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      Preparing
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;