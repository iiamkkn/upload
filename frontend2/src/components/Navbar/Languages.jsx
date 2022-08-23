import React from 'react';
import './Languages.css';

export const Languages = () => {
  const options_custom_language = (option) => {
    localStorage.setItem('lang', option.target.value);
    window.location.reload();
  };
  const lang = localStorage.getItem('lang' || 'HU');
  return (
    <>
      <div>
        <select
          className="round"
          onChange={options_custom_language}
          value={lang}
        >
          <option value="HU">HUN</option>
          <option value="EN">ENG</option>
        </select>
      </div>
    </>
  );
};
