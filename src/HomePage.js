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
            Eloquent <span role="img" aria-label="sign-language">🤟</span>
          </h1>
        </div>
        <button onClick={handleGetStarted} className="get-started-button">
          Get Started
        </button>
      </header>
    </div>
  );
};

export default HomePage;
