"use client";

import React from 'react';

const ProgressBar = ({ percentage, color, height = 12 }) => {
  const getBarColor = () => {
    if (percentage < 50) return '#00bfa5';   // Hijau
    if (percentage < 80) return '#ffc107';   // Kuning
    return '#ff5252';                        // Merah
  };

  const displayPercentage = Math.min(percentage, 100);

  return (
    <div className="w-full mt-2">
      <div 
        className="w-full rounded-full overflow-hidden"
        style={{
          height: `${height}px`,
          backgroundColor: '#e0e0e0'
        }}
      >
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out relative"
          style={{
            width: `${displayPercentage}%`,
            backgroundColor: color || getBarColor()
          }}
        >
          {percentage > 100 && (
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-700 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;