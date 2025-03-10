import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        full_name: fullName,
        email,
        password,
        phone_number: phoneNumber,
        location,
        role: "User",
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed! Try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar />
      <ToastContainer />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-xl w-full">
          <div className="bg-orange-500 px-6 text-center flex gap-18 items-center py-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">Q</div>
              <h1 className="text-3xl font-bold text-white">QuickEat</h1>
            </div>
            <p className="text-white">
              Are You a Restaurant Owner? <span className="cursor-pointer font-semibold hover:text-yellow-200">Click here</span>
            </p>
          </div>
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500" placeholder="Enter your Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Location</label>
                  <input type="text" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500" placeholder="City, Country" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                <input type="password" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                <input type="password" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <div className="flex items-center mb-6">
                <input type="checkbox" className="h-4 w-4 text-orange-500 border-gray-300 rounded" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
                <label className="ml-2 text-sm text-gray-700">
                  I agree to the <a href="#" className="text-orange-600 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-150">Create Account</button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account? <NavLink to="/login" className="font-medium text-orange-600 hover:text-orange-500">Sign in</NavLink>
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
