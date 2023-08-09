import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import WebcamPage from './WebcamPage';
import Menu from './Menu';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/webcam" element={<WebcamPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
