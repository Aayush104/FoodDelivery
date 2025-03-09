import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion, useInView } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import TestimonialImage from '../../assets/Testimonials.png';

const TestiMonial = () => {
  // Create refs for the elements we want to animate when in view
  const leftSectionRef = useRef(null);
  const headingRef = useRef(null);
  const rightSectionRef = useRef(null);
  const imageRef = useRef(null);
  
  // Check if elements are in view
  const isLeftSectionInView = useInView(leftSectionRef, { once: false, amount: 0.3 });
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.3 });
  const isRightSectionInView = useInView(rightSectionRef, { once: false, amount: 0.3 });
  const isImageInView = useInView(imageRef, { once: false, amount: 0.3 });

  const testimonials = [
    {
      id: 1,
      text: "Dapibus ultrices in iaculis nunc sed augue lacus viverra vitae. Mauris a diam maecenas sed enim. Egestas diam in arcu cursus euismod quis. Quam quisque id diam vel.",
      author: "Thomas Adamson",
      rating: 5
    },
    {
      id: 2,
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation.",
      author: "Sarah Johnson",
      rating: 5
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
      author: "Michael Chen",
      rating: 4
    },
    {
      id: 4,
      text: "Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque.",
      author: "Jessica Lee",
      rating: 5
    },
    {
      id: 5,
      text: "Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Feugiat vivamus at augue eget arcu dictum varius duis at consectetur.",
      author: "Robert Martinez",
      rating: 4
    },
    {
      id: 6,
      text: "Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. A arcu cursus vitae congue mauris rhoncus. Amet risus nullam eget felis eget nunc lobortis.",
      author: "Emily Davis",
      rating: 5
    },
    {
      id: 7,
      text: "Consequat mauris nunc congue nisi vitae suscipit. Euismod elementum nisi quis eleifend quam adipiscing vitae proin. Ut sem nulla pharetra diam sit amet nisl suscipit.",
      author: "Daniel Thompson",
      rating: 4
    }
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Section - Testimonials */}
        <motion.div 
          ref={leftSectionRef}
          className="w-full md:w-1/2 p-4"
          initial={{ opacity: 0, x: -50 }}
          animate={isLeftSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            ref={headingRef}
            className="text-4xl font-bold text-gray-800 mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={isHeadingInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            What customers say about us
          </motion.h2>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className="min-h-64"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="p-6 bg-gray-100 rounded-xl shadow-md"
                >
                  <p className="text-lg text-gray-600 italic mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center mt-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden mr-4">
                      <span className="text-white text-lg font-bold">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.author}</p>
                      <div className="flex">{renderStars(testimonial.rating)}</div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div 
          ref={rightSectionRef}
          className="w-full md:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={isRightSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative z-10 bg-white rounded-3xl overflow-hidden shadow-lg">
            <motion.img 
              ref={imageRef}
              src={TestimonialImage}
              alt="Customer using product"
              className="w-full h-full object-cover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isImageInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestiMonial;