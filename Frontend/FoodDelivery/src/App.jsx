import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Aboutus from './Pages/Aboutus';
import Contact from './Pages/Contact';
import FAQSection from './Pages/FAQSection';
import Menu from './Pages/Menu';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AboutUs" element={<Aboutus />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/FAQ" element={<FAQSection />} />
        <Route path="/Menu" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;
