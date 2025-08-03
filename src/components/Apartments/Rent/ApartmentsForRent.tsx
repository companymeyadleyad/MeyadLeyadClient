import React from "react";
import PropertyList from "../../Property/PropertyList";
import SectionHeader from "../GlobalComponent/SectionHeader";
import PropertyFilters from "../../Property/PropertyFilters";

const ApartmentsForRent: React.FC = () => {
  return (
    <div className="p-6">
      <SectionHeader
        title="דירות להשכרה"
        subtitle="מצאו את הדירה המושלמת עבורכם"
      />
      <PropertyFilters category="for-rent" />
      <PropertyList category="for-rent" />
    </div>
  );
};

export default ApartmentsForRent;
