import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import Hero from '../Components/Hero/Hero'
import HowItWorks from '../Components/HowItWorks/HowItWorks'
import TestiMonial from '../Components/TestiMonial/TestiMonial'

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <TestiMonial />
      <Footer />
    </div>
  )
}

export default Landing
