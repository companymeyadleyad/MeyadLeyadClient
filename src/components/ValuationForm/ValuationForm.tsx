import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./ValuationForm.css";

const ValuationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    isContactAllowed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <Card className="valuation-form-card">
      <Card.Body>
        <div className="text-center mb-4">
          <img
            src="/realagent-logo.png"
            alt="RealAgent Logo"
            className="mb-3"
            style={{ width: "120px" }}
          />
          <h3>לאן נשלח את דוח הערכת השווי החינמי שלך?</h3>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="השם שלך"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="contact-info-box">
              <div className="contact-avatar">HC</div>
              <div className="contact-details">
                <div className="contact-label">פרטי התקשרות</div>
                <div className="contact-name">Harvey Carpenter</div>
              </div>
              <Button variant="link" className="edit-button">
                ✏️
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              placeholder="מספר טלפון"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              id="contactConsent"
              label="אני מסכים/ה לקבל פניות בדוא״ל או בטלפון בנוגע להצעות"
              checked={formData.isContactAllowed}
              onChange={(e) =>
                setFormData({ ...formData, isContactAllowed: e.target.checked })
              }
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ backgroundColor: "var(--site-primary)" }}
          >
            שלח לי את הדוח!
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ValuationForm;

// This makes the file a module
export {};
