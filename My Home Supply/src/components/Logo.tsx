import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const USER_COPPER_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHQ8PoIER_pQ1RWzZQq3lwS1bMJBRibel2UO6Al8ri159W1etxV-6VQnhfw-2zneHy4VhaChTRCNuR_Ka8NuMxuUJATSHXqGX06hln96ijji8U0MgsFzQG5EDFTv8wtkvDWZcvjJLOyMQloxzol1nKRup403YkoETwl4y4_3MyP_sMkficy5PxL87q16uKbyNOrOYyi_TUNyCQWm2VyTwfqSmc0LmwlGVrgluGAOCCpKZWwPo2yR3eTn0JqObfaw8o9w';

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = false }) => {
  const sizeClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={USER_COPPER_LOGO}
        alt="My Home Supply Copper Logo"
        referrerPolicy="no-referrer"
        className={`${sizeClasses[size]} w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105 select-none shrink-0`}
      />
      {showText && (
        <span className="font-eb-garamond text-xl sm:text-2xl font-bold tracking-tight text-[#b55c3f]">
          My Home Supply
        </span>
      )}
    </div>
  );
};

