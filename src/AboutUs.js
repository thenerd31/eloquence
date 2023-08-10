import React from 'react';
import myImage from '/Users/aswin/eloquent/src/aswin.jpeg';


const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <img src={myImage} alt="Aswin Surya" className="founder-image" />
      <h2>Aswin Surya, Founder</h2>
      <div className="bio">
        
        <p>
        Aswin Surya is an Indian-American teen researcher, developer, and advocate for those hard of hearing. 
        Driven by his own personal experience with microtia atresia, a condition that led to hearing loss, 
        Aswin's passion for STEM and AI fuels his ambition to create innovative solutions. Currently a senior 
        at Bellarmine College Prep in California, his work is focused on integrating technology with empathy, 
        aiming to bridge the gap between the hearing and the deaf communities. Aswin's resilience and commitment 
        to his goals inspire his continual pursuit of excellence in the field of science and technology. 
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
