import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/webcam');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-name">
          <h1>
            Eloquent
          </h1>
          <p className="app-description">
            Object detection in sign language.
          </p>
          <p className="mission-statement">
            Our mission is to make sign language accessible to everyone, bridging the communication gap, breaking down language barriers, and fostering inclusivity.
          </p>
        </div>
        <button onClick={handleGetStarted} className="get-started-button">
          Get Started
        </button>
      </header>
      <div className="developer-credit">
        Developed by Aswin Surya &copy; {new Date().getFullYear()}. All Rights Reserved.
      </div>
    </div>

  );
};

export default HomePage;
