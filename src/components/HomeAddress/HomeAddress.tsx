import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./HomeAddress.css";

const HomeAddress: React.FC = () => {
  const [address, setAddress] = useState("");

  const handleNext = () => {
    // Handle next step logic here
    console.log("Address:", address);
  };

  const handleBack = () => {
    // Handle back navigation here
  };

  return (
    <Card className="home-address-card">
      <Card.Body>
        <div className="text-center mb-4">
          <h2 className="title">
            גלה את השווי האמיתי של הנכס שלך עם דוח מוכר חינם
          </h2>
          <p className="subtitle">
            קבל הערכת שווי מדויקת המבוססת על נתוני שוק עדכניים
          </p>
        </div>

        <div className="address-input-container">
          <Form.Group>
            <Form.Label>מה הכתובת של הנכס שלך?</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="הכנס את כתובת הנכס"
              className="address-input"
            />
          </Form.Group>
        </div>

        <div className="mt-4">
          <Button
            variant="primary"
            className="w-100 next-button"
            onClick={handleNext}
          >
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

export default HomeAddress;
