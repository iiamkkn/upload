import React from 'react';

export const ErrorLoading = () => {
  let error;
  return (
    <div className="loadingDiv">
      {error}
      <h1>Network Error</h1>
      <br />

      <span>
        {' '}
        <h3>An uninterrupted error occured. Please try again later.</h3>
      </span>
    </div>
  );
};
