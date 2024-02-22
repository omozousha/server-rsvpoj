import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import './Loader2.css';

const Loader = () => {
  useEffect(() => {
    const animationContainer = document.getElementById('animation-container');
    const animationDataUrl = 'https://lottie.host/ff5bdd41-11cb-438d-aaf9-5dcf09c2de5a/wb4CcYbpYE.json';

    lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: animationDataUrl
    });
  }, []);

  return (
    <div id="animation-container" className="loader-container"></div>
  );
};

export default Loader;