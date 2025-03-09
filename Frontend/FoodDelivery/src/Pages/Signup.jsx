import React, { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { NavLink } from 'react-router-dom';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt with:', { 
      fullName, 
      email, 
      password, 
      confirmPassword, 
      phoneNumber, 
      location, 
      agreeTerms 
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-xl w-full">
          {/* Restaurant Owner CTA */}
          
          
          {/* Signup Header */}
          <div className="bg-orange-500 px-6 text-center flex gap-18 items-center px-2  py-3">
          <div className='flex gap-3'>
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">Q</div>
            <h1 className="text-3xl font-bold text-white">QuickEat</h1>
            </div>
            <p className='text-white '>Are You a restaurant Owner? <span className='cursor-pointer font-semibold hover:text-yellow-200'>Click here</span></p>
           
            
          </div>
          
          {/* Signup Form */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit}>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="Enter your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
           
              <div className="flex items-center mb-6">
                <input
                  id="agree-terms"
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-orange-600 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150"
              >
                Create Account
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <NavLink to= '/login'>
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                  Sign in
                </a>
                </NavLink>
              </p>
            </div>
            
           
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;