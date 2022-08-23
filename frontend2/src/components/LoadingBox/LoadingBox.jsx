import React from 'react';
import './spinner.css';

export const LoadingBox = () => {
  return (
    <div className="loadingDiv">
      Loading...!
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingBox;
