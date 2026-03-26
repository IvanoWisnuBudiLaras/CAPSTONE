"use client";

import React from 'react';
import { availableColors } from '@/data/dummyCategories';

const ColorPicker = ({ selectedColor, onChange }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {availableColors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={`w-10 h-10 rounded-xl transition-all duration-200 hover:scale-110 ${
            selectedColor === color 
              ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' 
              : 'hover:shadow-md'
          }`}
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  );
};

export default ColorPicker;