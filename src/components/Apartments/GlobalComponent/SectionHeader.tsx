import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center my-6 ${className}`}>
      <h1 className="text-4xl font-bold text-blue-600">{title}</h1>
      {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
