import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import WebcamPage from './WebcamPage';
import Menu from './Menu';
import WhyWeDo from './WhyWeDo';
import AboutUs from './AboutUs';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/webcam" element={<WebcamPage/>} />
        <Route path="/why-we-do" element={<WhyWeDo />} /> 
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
