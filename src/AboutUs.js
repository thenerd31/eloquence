import React from 'react';
import { Helmet } from 'react-helmet';



const AboutUs = () => {
  return (
    <div className="about-us">
      <Helmet>
        <title>About Us - Eloquence</title>
        <meta name="description" content="Learn about Aswin Surya, the founder of Eloquence, and his mission to bridge the gap between the hearing and the deaf communities through AI-driven solutions." />
        <meta name="keywords" content="Aswin Surya, aswin, Aswin, surya, Eloquence, AI, sign language, healthcare, technology" />
        <meta property="og:title" content="About Us - Eloquence" />
        <meta property="og:description" content="Learn about Aswin Surya, the founder of Eloquence, and his mission to bridge the gap between the hearing and the deaf communities through AI-driven solutions." />
        {/* Add the Open Graph image if available */}
      </Helmet>
      <h1>About Us</h1>
      <img src="/aswin.jpeg" alt="Aswin Surya" className="founder-image" />
      <h2>Aswin Surya, Founder</h2>
      <div className="bio">
        
        <p>
        Aswin Surya is an Indian-American teen researcher, developer, and advocate for those hard of hearing. 
        Driven by his own experiences and challenges, Aswin's passion for AI fuels his ambition to create innovative solutions within healthcare.
        Currently a senior at Bellarmine College Prep in California, his work is focused on integrating technology with empathy, 
        aiming to bridge the gap between the hearing and the deaf communities. Aswin's resilience and commitment 
        to his goals inspire his continual pursuit of excellence in the field of science and technology. 
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
