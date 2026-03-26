"use client";

import React from 'react';
import { availableIcons } from '@/data/dummyCategories';

const IconPicker = ({ selectedIcon, onChange }) => {
  return (
    <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2">
      {availableIcons.map((icon) => (
        <button
          key={icon}
          type="button"
          onClick={() => onChange(icon)}
          className={`w-10 h-10 rounded-xl text-2xl flex items-center justify-center transition-all duration-200 hover:bg-gray-100 ${
            selectedIcon === icon 
              ? 'bg-[#00bfa5] bg-opacity-20 ring-2 ring-[#00bfa5] scale-110' 
              : 'bg-gray-50'
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default IconPicker;