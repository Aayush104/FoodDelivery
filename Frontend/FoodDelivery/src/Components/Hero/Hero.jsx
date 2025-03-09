import React from 'react';
import { motion } from 'framer-motion';
import herobg from '../../assets/HeroBg.png';

const Hero = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center px-4 py-8 md:py-16 w-full justify-between gap-20 px-16"
      style={{ background: 'linear-gradient(135deg, #fff9f9 0%, #ffefef 50%, #fff5f2 100%)' }}
    >
      {/* Left content with text */}
      <motion.div
        className="w-full md:w-1/2 mb-8 md:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          The Best Restaurants In Your Home
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Enjoy your favorite dishes from the best local restaurants delivered fresh to your doorstep. 
          Fast delivery, easy ordering, and endless culinary options await!
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="relative w-full sm:w-64">
            <select className="appearance-none bg-gray-100 border border-gray-200 text-gray-500 py-3 px-4 pr-8 rounded w-full focus:outline-none">
              <option>Choose a Restaurant</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <motion.button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ORDER NOW
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Right content with image */}
      <motion.div
        className="w-full px-20 md:w-1/2 relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative z-10 h-full">
          <div className="p-4 md:p-8">
            <motion.img
              src={herobg}
              alt="Delivery person smiling with delivery bag"
              className="h-[70vh] rounded-2xl border-2 border-orange-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;