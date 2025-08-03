import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "./HomeFeatures.css";

interface Feature {
  id: string;
  label: string;
}

const HomeFeatures: React.FC = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const features: Feature[] = [
    { id: "airConditioning", label: "מיזוג אוויר" },
    { id: "updatedKitchen", label: "מטבח מעוצב" },
    { id: "renovatedBathrooms", label: "חדרי רחצה משופצים" },
    { id: "gym", label: "חדר כושר" },
    { id: "sauna", label: "סאונה" },
    { id: "swimmingPool", label: "בריכת שחייה" },
  ];

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleNext = () => {
    // Handle next step logic here
    console.log("Selected features:", selectedFeatures);
  };

  const handleBack = () => {
    // Handle back navigation here
  };

  return (
    <Card className="home-features-card">
      <Card.Body>
        <div className="text-center mb-4">
          <h3>האם יש בנכס שלך תכונות נוספות?</h3>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`feature-item ${
                selectedFeatures.includes(feature.id) ? "selected" : ""
              }`}
              onClick={() => handleFeatureToggle(feature.id)}
            >
              <Form.Check
                type="checkbox"
                id={feature.id}
                label={feature.label}
                checked={selectedFeatures.includes(feature.id)}
                onChange={() => handleFeatureToggle(feature.id)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="primary" className="w-100" onClick={handleNext}>
            הבא
          </Button>

          <div className="text-center mt-3">
            <Button variant="link" className="back-button" onClick={handleBack}>
              ← חזור
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HomeFeatures;
