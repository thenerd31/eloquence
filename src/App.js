import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import WebcamPage from './WebcamPage';
import Menu from './Menu';
import WhyWeDo from './WhyWeDo';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/webcam" element={<WebcamPage/>} />
        <Route path="/why-we-do" element={<WhyWeDo />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
