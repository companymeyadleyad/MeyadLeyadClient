import React, { useState, useEffect } from 'react';

interface PropertyFiltersProps {
  category: "for-rent" | "for-sale" | "for-shabbat";
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ category }) => {
  const [filters, setFilters] = useState<{ cities: string[]; priceRanges: string[]; bedrooms: string[] }>({
    cities: [],
    priceRanges: [],
    bedrooms: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [city, setCity] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("/Data/filtersData.json");
        if (!response.ok) throw new Error("Failed to load filter data");
        
        const data = await response.json();
        setFilters(data[category] || { cities: [], priceRanges: [], bedrooms: [] });
        setError(null);
      } catch (err) {
        setError("שגיאה בטעינת הנתונים");
        console.error("Error loading filters data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, [category]);

  if (loading) return <div className="text-center p-5 fw-bold">טוען נתונים...</div>;
  if (error) return <div className="text-center p-5 text-danger fw-bold">{error}</div>;


  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-2">
        <div 
          className="bg-light p-4 rounded shadow-lg d-flex flex-column align-items-center gap-3 w-100" 
          style={{ maxWidth: "600px" }}
        >
          <div className="d-flex w-100 gap-3">
            {/* בחירת עיר */}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-select border border-warning text-end flex-grow-1"
            >
              <option value="">בחר עיר</option>
              {filters.cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>

            {/* טווח מחירים */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="form-select border border-warning text-end flex-grow-1"
            >
              <option value="">בחר טווח מחירים</option>
              {filters.priceRanges.map((range, index) => (
                <option key={index} value={range}>{range}</option>
              ))}
            </select>

            {/* מספר חדרים */}
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="form-select border border-warning text-end flex-grow-1"
            >
              <option value="">בחר מספר חדרים</option>
              {filters.bedrooms.map((room, index) => (
                <option key={index} value={room}>{room}</option>
              ))}
            </select>
          </div>

          {/* כפתור חיפוש */}
          <button className="btn btn-primary w-100 mt-3">
            חפש
          </button>
        </div>
        </div>
    </>
  );
};

export default PropertyFilters;
