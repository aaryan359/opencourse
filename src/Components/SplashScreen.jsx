import React, { useEffect, useState } from 'react';
import '../SplashScreen.css'; 

const SplashScreen = ({ onLoadComplete }) => {
 
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadComplete();
    }, 1550); 
    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1 className="splash-title">Open Course</h1>
      </div>
    </div>
  );
};

export default SplashScreen;
