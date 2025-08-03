import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './SystemSelection.css';

export interface SystemOption {
  id: number | string;
  name: string;
  icon: IconDefinition;
}

interface SystemSelectionProps {
  options: SystemOption[];
  onOptionSelect: (optionId: number | string) => void;
  title?: string;
  className?: string;
}

const SystemSelection: React.FC<SystemSelectionProps> = ({
  options,
  onOptionSelect,
  title,
  className = ''
}) => {
  return (
    <div className={`system-selection-container ${className}`} style={{ direction: "rtl" }}>
      {title && <h1 className="system-selection-title">{title}</h1>}
      <div className="system-selection-grid">
        {options.map((option) => (
          <div
            key={option.id}
            className="system-selection-item"
            onClick={() => onOptionSelect(option.id)}
          >
            <div className="system-selection-content">
              <div className="system-selection-icon">
                <FontAwesomeIcon icon={option.icon} />
              </div>
              <div className="system-selection-text">{option.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemSelection; 