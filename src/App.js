import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import HomePage from './HomePage';
import WebcamPage from './WebcamPage';
import Menu from './Menu';
import WhyWeDo from './WhyWeDo';
import AboutUs from './AboutUs';
import HandTracking from './HandTracking';

function App() {
  return (
    <Router>
      <Menu />
      <AnimatedRoutes />
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={300} classNames="fade">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/webcam" element={<WebcamPage />} />
          <Route path="/hand-tracking" element={<HandTracking />} />
          <Route path="/why-we-do" element={<WhyWeDo />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
