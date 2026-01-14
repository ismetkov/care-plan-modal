/**
 * Card Header Component
 * Header section for visit type cards with icon and title
 */

import React from 'react';

interface CardHeaderProps {
  icon: React.ReactNode;
  title: string;
  isSelected?: boolean;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  icon,
  title,
  isSelected = false,
}) => {
  return (
    <header className="bg-purple-50 px-6 py-5">
      <div className="flex items-center gap-3">
        <span
          className={`${
            isSelected
              ? 'text-purple-primary'
              : 'text-purple-dark group-hover:text-purple-primary'
          }`}
        >
          {icon}
        </span>
        <h3
          className={`text-xl font-semibold ${
            isSelected
              ? 'text-purple-primary'
              : 'text-purple-dark group-hover:text-purple-primary'
          }`}
        >
          {title}
        </h3>
      </div>
    </header>
  );
};

export default CardHeader;
