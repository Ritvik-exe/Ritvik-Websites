import React from 'react';
import logoImg from '../assets/images/my_home_logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoImg}
        alt="My Home Supply Logo"
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-300 hover:scale-105 select-none shrink-0`}
      />
    </div>
  );
};

