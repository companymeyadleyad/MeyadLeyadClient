import React from "react";
import { Card, Row, Col } from "react-bootstrap";

interface Apartment {
  apartment_id: number;
  floor: number;
  rooms: number;
  price: number;
  size_m2: number;
  balcony: boolean;
  parking: boolean;
  furnished: boolean;
  for_shabbat: boolean;
  street: string;
}

interface ApartmentListProps {
  apartments: Apartment[];
}

const ApartmentList: React.FC<ApartmentListProps> = ({ apartments }) => {
  return (
    <div className="apartment-list">
      {apartments.length > 0 ? (
        <Row>
          {apartments.map((apartment) => (
            <Col
              key={apartment.apartment_id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <Card className="apartment-card">
                <Card.Body>
                  <Card.Title>דירה {apartment.apartment_id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    מחיר: {apartment.price} ש"ח
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>חדרים:</strong> {apartment.rooms}
                    <br />
                    <strong>קומה:</strong> {apartment.floor}
                    <br />
                    <strong>גודל:</strong> {apartment.size_m2} מ"ר
                    <br />
                    <strong>מרפסת:</strong> {apartment.balcony ? "כן" : "לא"}
                    <br />
                    <strong>חנייה:</strong> {apartment.parking ? "כן" : "לא"}
                    <br />
                    <strong>לשבתות:</strong>{" "}
                    {apartment.for_shabbat ? "כן" : "לא"}
                    <br />
                    <strong>רחוב:</strong> {apartment.street}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>אין דירות להצגה</p>
      )}
    </div>
  );
};

export default ApartmentList;
