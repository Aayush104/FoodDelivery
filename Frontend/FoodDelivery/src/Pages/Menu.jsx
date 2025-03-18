import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState([
    'All', 'Pizza', 'Rice', 'Chicken', 'Breakfast', 'Vegetarian'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Sample food items with data from Unsplash images
  const foodItems = [
    {
      id: 1,
      name: 'Chicken Pizza',
      price: 24.00,
      category: 'Pizza',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop',
      description: 'Delicious pizza topped with grilled chicken, bell peppers, and mozzarella cheese'
    },
    {
      id: 2,
      name: 'Egg And Cucumber',
      price: 28.00,
      category: 'Breakfast',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&auto=format&fit=crop',
      description: 'Fried egg served with quinoa and fresh cucumber slices'
    },
    {
      id: 3,
      name: 'Chicken Fried Rice',
      price: 20.00,
      category: 'Rice',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop',
      description: 'Wok-fried rice with chicken, vegetables, and special house seasonings'
    },
    {
      id: 4,
      name: 'Chicken Leg Piece',
      price: 58.00,
      category: 'Chicken',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop',
      description: 'Crispy fried chicken legs served with dipping sauce'
    },
    {
      id: 5,
      name: 'Vegetable Pizza',
      price: 22.00,
      category: 'Pizza',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop',
      description: 'Fresh pizza loaded with seasonal vegetables and herbs'
    },
    {
      id: 6,
      name: 'Avocado Toast',
      price: 18.00,
      category: 'Breakfast',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=500&auto=format&fit=crop',
      description: 'Whole grain toast topped with smashed avocado, cherry tomatoes, and microgreens'
    },
    {
      id: 7,
      name: 'Vegetable Stir Fry',
      price: 19.00,
      category: 'Vegetarian',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop',
      description: 'Mixed vegetables stir-fried in aromatic sauce served with steamed rice'
    },
    {
      id: 8,
      name: 'BBQ Chicken Wings',
      price: 32.00,
      category: 'Chicken',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&auto=format&fit=crop',
      description: 'Spicy BBQ glazed chicken wings with blue cheese dip'
    },
  ];

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

  return (
    <>
 
    <div className="min-h-screen bg-gray-100">
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
            <NavLink to= "/AboutUs">
            <a href="#" className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium">About Us</a>
            </NavLink>
           

           <NavLink to = '/Menu'>
            <a href="#" className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium">Menu</a>
            </NavLink>
            
            <NavLink to = "/FAQ" >
            <a href="#" className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium">FAQ</a>
            </NavLink>
            <NavLink to = "/Contact" >
            <a href="#" className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium">Contacts</a>
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

        {/* Food Items Grid */}
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
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <span className="font-bold text-red-500">${item.price.toFixed(2)}</span>
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

        {filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-gray-500">No items found matching your search.</p>
          </motion.div>
        )}
      </main>

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
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-red-500">${item.price.toFixed(2)}</p>
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
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <motion.button
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  CHECKOUT
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Overlay when cart is open */}
      {showCart && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCart(false)}
        />
      )}
    </div>
    <Footer />

    </>
  );
};

export default Menu;