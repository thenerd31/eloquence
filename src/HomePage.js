import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/webcam');
  };

  return (
    <div className="App">
      <Helmet>
        <title>Eloquence - Object detection in sign language</title>
        <meta name="description" content="Eloquence aims to make sign language accessible to everyone, bridging the communication gap, breaking down language barriers, and fostering inclusivity." />
        <meta name="keywords" content="sign language, object detection, accessibility, inclusivity" />
        <meta property="og:title" content="Eloquence - Object detection in sign language" />
        <meta property="og:description" content="Eloquence aims to make sign language accessible to everyone, bridging the communication gap, breaking down language barriers, and fostering inclusivity." />
        <meta property="og:image" content="/path/to/your/image.jpg" /> {/* Add path to your Open Graph image if available */}
        <meta property="og:type" content="website" />
      </Helmet>
      <header className="App-header">
        <div className="app-name">
          <h1>
            Eloquence
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
