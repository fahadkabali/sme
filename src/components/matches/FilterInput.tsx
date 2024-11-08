import React, { InputHTMLAttributes } from 'react';

interface FilterInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<{ className?: string }>;
}

const FilterInput: React.FC<FilterInputProps> = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
    <input
      {...props}
      className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

export default FilterInput;
