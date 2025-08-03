import React from "react";
import PropertyList from "../../Property/PropertyList";
import SectionHeader from "../GlobalComponent/SectionHeader";
import PropertyFilters from "../../Property/PropertyFilters";

const ShabbatHouses: React.FC = () => {
  return (
    <div className="p-6">
      <SectionHeader title="בתים לשבת" subtitle="בתים נוחים ומאובזרים לשבת" />
      <PropertyFilters category="for-shabbat" />
      <PropertyList category="for-shabbat" />
    </div>
  );
};

export default ShabbatHouses;
