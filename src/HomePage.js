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
            Welcome to Eloquent! We provide an interactive and intuitive way to learn and understand sign language.
          </p>
          <p className="mission-statement">
            Our mission is to make sign language accessible to everyone, bridging the communication gap and fostering inclusivity.
          </p>
        </div>
        <button onClick={handleGetStarted} className="get-started-button">
          Get Started
        </button>
      </header>
      <div className="developer-credit">
        Developed by Aswin Surya
      </div>
    </div>

  );
};

export default HomePage;
