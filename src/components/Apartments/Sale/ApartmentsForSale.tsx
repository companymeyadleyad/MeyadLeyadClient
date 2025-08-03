import React from "react";
import PropertyList from "../../Property/PropertyList";
import SectionHeader from "../GlobalComponent/SectionHeader";
import PropertyFilters from "../../Property/PropertyFilters";

const ApartmentsForSale: React.FC = () => {
  return (
    <div className="p-6">
      <SectionHeader
        title="דירות למכירה"
        subtitle="מצאו את הדירה המושלמת לקנייה"
      />
      <PropertyFilters category="for-sale" />
      <PropertyList category="for-sale" />
    </div>
  );
};

export default ApartmentsForSale;
