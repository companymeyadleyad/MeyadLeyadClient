import React from "react";
import { ApartmentCard} from '../../types/Property/Property';
import { useNavigate } from "react-router-dom";

const PropertyCard: React.FC<{ property: ApartmentCard }> = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div 
      className="card shadow-lg border-0 rounded-lg overflow-hidden w-80 text-end cursor-pointer"
      onClick={handleClick}
      style={{
        height: "410px", // גובה קבוע לכרטיס
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // אפקט מעבר חלק
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} // הגדלת הכרטיס כשמעבירים עליו את העכבר
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} // החזרת הגודל המקורי כשהעכבר יוצא
    >
      {/* תמונה מקומית */}
      <img 
        src="/images/living room.jpg"  
        alt={property.title} 
        className="card-img-top"
        style={{
          height: "170px", 
          objectFit: "cover",
        }} 
      />
      <div className="card-body" style={{ direction: "rtl" }}>
        <h3 className="card-title text-dark">{property.title}</h3>
        <p className="text-muted">{property.location}</p>
        <p className="text-primary fw-bold fs-5 mt-2">{property.price}</p>
        <p className="text-secondary mt-2 small">{property.shortDescription}</p>
      </div>
    </div>
  );
};

export default PropertyCard;