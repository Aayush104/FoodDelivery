import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import TestiMonial from '../Components/TestiMonial/TestiMonial';

// Main App Component
const Aboutus = () => {

  localStorage.removeItem("cartItems")
  return (
    <div className="font-sans">
    <Navbar />
      <Hero />
      <About />
      <ChefSection />
      <SpecialOffer />
      <MenuSection />
      <TestiMonial />
      <Footer />
    </div>
  );
};

// Hero Component
const Hero = () => {
  return (
    <div id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Delicious Food for Every Mood
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the taste of perfection with our carefully crafted dishes made from the freshest ingredients.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#menu" className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition">View Our Menu</a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3" alt="Restaurant interior" className="rounded-lg shadow-xl h-[45rem] w-full" />
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 ">About Us</h2>
            <div className="w-16 h-1 bg-red-600 mb-6"></div>
            <p className="text-gray-600 mb-6">
              Welcome to FreshEat, where culinary excellence meets warm hospitality. Established in 2015, 
              our restaurant has been serving delightful dishes made from locally-sourced ingredients.
            </p>
            <p className="text-gray-600 mb-6">
              Our philosophy is simple - we believe in real food, prepared with passion and served with care. 
              Every dish that leaves our kitchen is a testament to our dedication to quality and flavor.
            </p>
            <p className="text-gray-600 mb-8">
              With a team of expert chefs led by our Main Chef Marvin McKinney, we strive to create 
              memorable dining experiences that keep our customers coming back for more.
            </p>
            <a href="#chefs" className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition">Meet Our Team</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Chef Section Component
const ChefSection = () => {
  const chefs = [
    {
      name: "Devon Lane",
      position: "President of Sales",
      image: "https://www.learningroutes.in/_next/image?url=https%3A%2F%2Faskusedu.com%2Fblogdashboard%2Fwp-content%2Fuploads%2F2024%2F03%2Fgeneral-manger.webp&w=1920&q=75",
      bio: "With over 15 years in the culinary industry, Devon brings his expertise in both cooking and business management."
    },
    {
      name: "Ralph Edwards",
      position: "Chef Manager",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3",
      bio: "Ralph coordinates our kitchen operations with precision and creativity, ensuring every dish meets our high standards."
    },
    {
      name: "Marvin McKinney",
      position: "Main Chef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3",
      bio: "Marvin's innovative approach to traditional cuisine has earned our restaurant numerous culinary awards."
    }
  ];
  
  return (
    <section id="chefs" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Meet Our Expert Chefs</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our talented team of culinary professionals brings passion, creativity, and expertise to every dish they prepare.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {chefs.map((chef, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <img src={chef.image} alt={chef.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{chef.name}</h3>
                <p className="text-gray-500 mb-4">{chef.position}</p>
                <p className="text-gray-600">{chef.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Special Offer Component
const SpecialOffer = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">TODAY SPECIAL FOOD</h2>
            <div className="w-16 h-1 bg-red-600 mb-6"></div>
            <p className="text-xl mb-6">WELCOME FRESHEAT</p>
            <p className="text-2xl font-bold text-yellow-500 mb-8">Limited Time Offer</p>
            <div className="inline-block">
              <motion.div
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <span>ORDER NOW</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3" alt="Pizza special" className="rounded-lg" />
            <motion.div 
              className="absolute -top-5 right-0 md:-right-5 bg-white text-orange-500 font-bold text-2xl rounded-full w-20 h-20 flex items-center justify-center"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              45% Off
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Menu Section Component
const MenuSection = () => {
  const [category, setCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'starters', name: 'Starters' },
    { id: 'main', name: 'Main Course' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Drinks' }
  ];
  
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'main', price: 12.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3' },
    { id: 2, name: 'Caesar Salad', category: 'starters', price: 8.99, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3' },
    { id: 3, name: 'Chocolate Lava Cake', category: 'desserts', price: 6.99, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3' },
    { id: 4, name: 'Spaghetti Carbonara', category: 'main', price: 14.99, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BhZ2hldHRpJTIwY2FyYm9uYXJhfGVufDB8fDB8fHww' },
    { id: 5, name: 'Fresh Mojito', category: 'drinks', price: 5.99, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3' },
    { id: 6, name: 'Garlic Bread', category: 'starters', price: 4.99, image: 'https://images.unsplash.com/photo-1593527270723-834c53a3fed4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D' }
  ];
  
  const filteredItems = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);
  
  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Our Delicious Menu</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of mouth-watering dishes prepared by our expert chefs using the freshest ingredients.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                className={`px-6 py-2 rounded-full ${
                  category === cat.id ? 'bg-red-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-lg font-bold text-red-600">${item.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                  <button className="text-green-600 hover:text-green-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.button
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Menu
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;