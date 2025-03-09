import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import how1 from '../../assets/how1.png';
import how2 from '../../assets/how2.png';
import how3 from '../../assets/how3.png';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="py-16 px-4 text-center" ref={ref}>
      <motion.h2 
        className="text-4xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        How It Works
      </motion.h2>
      
      <motion.p 
        className="text-gray-600 max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Our simple three-step process brings the best local restaurants straight to your door, making meal time convenient and delicious.
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Step 1 */}
        <motion.div 
          className="flex flex-col items-center"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="relative mb-6">
            <motion.img 
              src={how1} 
              alt="Select Restaurant" 
              className="h-40 w-auto"
              variants={imageVariants}
              whileHover="hover"
            />
            <motion.div 
              className="absolute -left-4 -top-6 text-gray-200 text-7xl font-bold"
              variants={numberVariants}
            >
              01
            </motion.div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Select Restaurant
          </h3>
          <p className="text-gray-600">
            Browse our curated selection of top-rated restaurants in your area and find exactly what you're craving today.
          </p>
        </motion.div>
        
        {/* Step 2 */}
        <motion.div 
          className="flex flex-col items-center"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="relative mb-6">
            <motion.img 
              src={how2} 
              alt="Select Menu" 
              className="h-40 w-auto"
              variants={imageVariants}
              whileHover="hover"
            />
            <motion.div 
              className="absolute -left-4 -top-6 text-gray-200 text-7xl font-bold"
              variants={numberVariants}
            >
              02
            </motion.div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Select Menu
          </h3>
          <p className="text-gray-600">
            Explore full restaurant menus with photos, descriptions, and reviews to help you choose the perfect meal.
          </p>
        </motion.div>
        
        {/* Step 3 */}
        <motion.div 
          className="flex flex-col items-center"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="relative mb-6">
            <motion.img 
              src={how3} 
              alt="Wait for Delivery" 
              className="h-40 w-auto"
              variants={imageVariants}
              whileHover="hover"
            />
            <motion.div 
              className="absolute -left-4 -top-6 text-gray-200 text-7xl font-bold"
              variants={numberVariants}
            >
              03
            </motion.div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Wait for Delivery
          </h3>
          <p className="text-gray-600">
            Track your order in real-time as our delivery partners bring your food fresh and hot straight to your doorstep.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;