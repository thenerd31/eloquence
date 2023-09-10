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
        <title>Eloquence -  Artificial intelligence in sign language</title>
        <meta name="description" content="Eloquence aims to make sign language accessible to everyone through state-of-the-art machine learning, bridging the communication gap, breaking down language barriers, and fostering inclusivity." />
        <meta name="keywords" content="Eloquence, eloquence, Eloquence.live, sign language, object detection, hand tracking, mediapipe, tensorflow, accessibility, inclusivity, machine learning, sign language translation, eloquence, eloquence.live, sign" />
        <meta property="og:title" content="Eloquence - Object detection in sign language" />
        <meta property="og:description" content="Eloquence aims to make sign language accessible to everyone, bridging the communication gap, breaking down language barriers, and fostering inclusivity." />
        <meta property="og:image" content="/path/to/your/image.jpg" /> {/* Add path to your Open Graph image if available */}
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.eloquence.live" />
        <meta http-equiv="content-language" content="en" />
      </Helmet>
      <header className="App-header">
        <div className="app-name">
          <h1>
            Eloquence
          </h1>
          <h2 className="app-description">
            Artificial intelligence in sign language.
          </h2>
          <p className="mission-statement">
            Our mission is to make sign language accessible to everyone, bridging the communication gap, breaking down language barriers, and fostering inclusivity.
          </p>
        </div>
        <button onClick={handleGetStarted} className="get-started-button">
          Get Started
        </button>
      </header>
      <div className="developer-credit">
        Developed by <a href="https://www.linkedin.com/in/aswinsurya/" target="_blank" rel="noopener noreferrer" className="developer-link">Aswin Surya</a> &copy; {new Date().getFullYear()}. All Rights Reserved.
      </div>
    </div>

  );
};

export default HomePage;
