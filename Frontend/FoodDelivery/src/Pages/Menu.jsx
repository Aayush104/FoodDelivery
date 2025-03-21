import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

const Menu = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState([
    'All', 'Pizza', 'Rice', 'Chicken', 'Breakfast', 'Vegetarian'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/menu/get-Menu");
        
        // Transform the API data to match our component's expected format
        const transformedData = response.data.menu.map(item => ({
          id: item.id,
          name: item.foodName,
          price: parseFloat(item.price),
          category: capitalizeFirstLetter(item.category),
          rating: 4, // Default rating since it's not in API
          image: item.photo.startsWith('http') 
            ? item.photo 
            : `http://localhost:3000/${item.photo}`,
          description: item.description
        }));
        
        setFoodItems(transformedData);
        
        // Update categories based on available data
        const apiCategories = ['All', ...new Set(transformedData.map(item => 
          capitalizeFirstLetter(item.category)
        ))];
        
        setCategories(apiCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu data:", err);
        setError("Failed to load menu items. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to capitalize category names
  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Filter food items based on search term and category
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const existingItem = cartItems.find(item => item.id === itemId);
    
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Fallback image in case of loading errors
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop";
  };

  // Create a formatted order name from cart items
  const createOrderName = () => {
    if (cartItems.length === 0) return "Food Order";
    
    if (cartItems.length === 1) {
      return `${cartItems[0].name} (${cartItems[0].quantity})`;
    }
    
    // If multiple items, list first item + count of others
    return `${cartItems[0].name} and ${cartItems.length - 1} more items`;
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("LoginFirst to place an order");
      navigate("/login");
      return;
    }

    try {
      const initiatePayment = await axios.post(
        "http://localhost:3000/payment/khalti",
        {
          'purchase_order_name': createOrderName(),
          "orderId": "123456",
          "amount": totalPrice
        }
      );
      
      console.log('Payment initiated');
      // Handle the payment response
      if (initiatePayment.data) {
        // Redirect to payment gateway or handle as needed
        window.location.href = initiatePayment.data.payment_url;
        console.log(initiatePayment.data.payment_url);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  // Clear cart after successful payment (would need to be integrated with payment callback)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <div className="relative">
      <div className={`min-h-screen bg-gray-100 ${showCart ? 'overflow-hidden' : ''}`}>
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <motion.h1 
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-gray-800">QUICK</span>
              <span className="text-amber-500">EAT</span>
            </motion.h1>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium">Home</a>
              <NavLink to="/AboutUs" className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium">
                About Us
              </NavLink>
              <NavLink to='/Menu' className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium">
                Menu
              </NavLink>
              <NavLink to="/FAQ" className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium">
                FAQ
              </NavLink>
              <NavLink to="/Contact" className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium">
                Contacts
              </NavLink>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '300px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="text"
                  placeholder="Search foods..."
                  className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </motion.div>
              
              {/* Cart Button */}
              <motion.button
                className="relative p-2 text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCart(!showCart)}
              >
                🛒
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Category Filter */}
          <motion.div 
            className="mb-8 overflow-x-auto whitespace-nowrap pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-2 mr-2 rounded-full ${
                  selectedCategory === category 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 text-xl">{error}</p>
              <button 
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Food Items Grid */}
          {!loading && !error && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  variants={itemVariants}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <span className="font-bold text-red-500">Rs. {item.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex my-2">
                      {renderRating(item.rating)}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 h-12 overflow-hidden">
                      {item.description}
                    </p>
                    
                    <motion.button
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => addToCart(item)}
                    >
                      <span>ADD TO CART</span>
                      <span>🛒</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && !error && filteredItems.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-500">No items found matching your search.</p>
            </motion.div>
          )}
        </main>

        {/* Translucent Overlay when cart is open */}
        {showCart && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
          />
        )}
      </div>

      {/* Shopping Cart Sidebar */}
      <motion.div
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: showCart ? '0%' : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowCart(false)}
            >
              ✕
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                      onError={handleImageError}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-red-500">Rs.{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => removeFromCart(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">Rs.{totalPrice.toFixed(2)}</span>
                </div>
                <motion.button
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckOut}
                >
                  CHECKOUT
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Menu;