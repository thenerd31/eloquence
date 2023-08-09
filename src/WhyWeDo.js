import React from 'react';
import { useNavigate } from 'react-router-dom';


const WhyWeDo = () => {

  return (
    <div className="why-we-do">
      <h1>Why and What We Do</h1>
      <p>
        The concept of Eloquent was designed after a visit to India, where I saw
        hundreds of people with severe hearing impairments, unable to communicate
        with their families. India is home to 63 million people with hearing loss,
        but there are only 250 sign language interpreters in the entire country!
        These communication barriers still hamper access to basic public services
        like healthcare and education. I personally witnessed this, as my own
        grandfather suffers from partial hearing loss. The entire purpose of
        Eloquent is to break down these barriers, and today, I hope I’ve shown you
        a glimpse into the future where physical impairments don’t need to keep us
        apart. Thank you!
      </p>
      {/* Add statistics here if necessary */}
    </div>
  );
};

export default WhyWeDo;
