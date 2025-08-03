import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userStore } from "stores/User.store";
import { Container, Row, Col, Card } from "react-bootstrap";
import SystemField from "components/Fields/SystemFields/SystemField";
import { FieldType } from "types/Fields/FieldType";
import "./Profile.css";

const Profile: React.FC = observer(() => {
  const navigate = useNavigate();
  const { user } = userStore;

  // בדיקה אם המשתמש מחובר
  // React.useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleChange = (fieldName: string) => (value: any) => {
    // כרגע אין צורך לעדכן ערכים כי השדות הם readOnly
    console.log(`Field ${fieldName} changed to:`, value);
  };

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="profile-card">
            <Card.Header className="profile-header">
              <h2>פרופיל משתמש</h2>
            </Card.Header>
            <Card.Body>
              <div className="profile-fields">
                <SystemField
                  fieldType={FieldType.TextField}
                  label="שם פרטי"
                  name="firstName"
                  value={user.firstName || ""}
                  onChange={handleChange("firstName")}
                />

                <SystemField
                  fieldType={FieldType.TextField}
                  label="שם משפחה"
                  name="lastName"
                  value={user.lastName || ""}
                  onChange={handleChange("lastName")}
                />

                <SystemField
                  fieldType={FieldType.TextField}
                  label="כתובת אימייל"
                  name="email"
                  value={user.emailAdress || ""}
                  onChange={handleChange("emailAdress")}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default Profile;
