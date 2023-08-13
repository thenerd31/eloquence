import React from 'react';
import { Helmet } from 'react-helmet';


const WhyWeDo = () => {

  return (
    <div className="why-we-do">
      <Helmet>
        <title>Our Mission - Eloquence</title>
        <meta name="description" content="Eloquence bridges the gap between silence and sound, gestures and words, using cutting-edge technology. We recognize hand signs and translate them into words in an instant, fostering inclusivity and empowering a community often left unheard." />
        <meta name="keywords" content="sign language, object detection, inclusivity, communication, connection" />
        <meta property="og:title" content="Why and What We Do - Eloquence" />
        <meta property="og:description" content="Eloquence bridges the gap between silence and sound, gestures and words, using cutting-edge technology. We recognize hand signs and translate them into words in an instant, fostering inclusivity and empowering a community often left unheard." />
        {/* Add the Open Graph image if available */}
      </Helmet>
      <h1>Why and What We Do</h1>
      <p>
      More than 70 million people around the world use sign language to communicate. 
      <br></br>
      <br></br>
      In a world filled with voices, silence carries a profound meaning. But silence 
      should never equate to a lack of communication. Eloquence was designed to bridge 
      the gap between silence and sound, gestures and words, using cutting-edge technology.
      <br></br>
      <br></br>
      With Eloquence's real-time object detection machine learning software, we recognize 
      hand signs and translate them into segmented words in an instant. We're not merely 
      facilitating conversation; we're igniting understanding, fostering inclusivity, and 
      empowering a community often left unheard. 
      <br></br>
      <br></br>
      Eloquence isn't just a product; it's a movement towards a world where communication 
      knows no bounds, and every sign is a symbol of connection.
      <br></br>
      <br></br>
      Join us today and fight for change.
      </p>
      {/* Add statistics here if necessary */}
    </div>
  );
};

export default WhyWeDo;
