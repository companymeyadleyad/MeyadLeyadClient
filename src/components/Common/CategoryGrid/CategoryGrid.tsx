import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './CategoryGrid.css';

export interface Category {
  id: number | string;
  name: string;
  icon: IconDefinition;
}

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (categoryId: number | string) => void;
  title?: string;
  className?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onCategorySelect,
  title,
  className = ''
}) => {
  return (
    <div className={`category-grid-container ${className}`} style={{ direction: "rtl" }}>
      {title && <h1 className="category-grid-title">{title}</h1>}
      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-grid-item"
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="category-grid-content">
              <div className="category-grid-icon">
                <FontAwesomeIcon icon={category.icon} />
              </div>
              <div className="category-grid-title">{category.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid; 