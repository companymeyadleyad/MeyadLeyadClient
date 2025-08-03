import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import PageTitle from "../GlobalComponent/PageTitle";
import { TextField, PasswordField, PhoneField } from "../../Fields/FormFields";
import { UserService } from "services/userService";
import { RegisterRequest } from "types/LoginAndRegister/Registration/RegisterRequest";
import { usePopup } from "components/Common/Popup/PopupContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    FirstName: "",
    LastName: "",
    Email: "",
    Telephone: "",
    Password: "",
    ConfirmPassword: "",
  });
  const showPopup = usePopup();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userService = new UserService();
    const response = await userService.register(formData);
    if (response?.success) {
      showPopup({
        type: 'success',
        message: 'ההרשמה בוצעה בהצלחה',
        actionHandler: () => navigate("/"),
      });
    } else {
      showPopup({
        type: 'error',
        message: 'ההרשמה נכשלה',
      });
    }
    // Handle response here
  };

  const handleChange = (field: keyof RegisterRequest) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center">
        <Card
          className="shadow-lg"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <Card.Body className="p-4">
            <PageTitle text="הרשמה למערכת" className="text-center mb-4" />
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <TextField
                    label="שם פרטי"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange("FirstName")}
                    placeholder="הכנס שם פרטי"
                    required={true}
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="שם משפחה"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange("LastName")}
                    placeholder="הכנס שם משפחה"
                    required={true}
                  />
                </div>
              </div>

              <TextField
                label="אימייל"
                name="Email"
                value={formData.Email}
                onChange={handleChange("Email")}
                placeholder="הכנס אימייל"
                required={true}
              />

              <PhoneField
                label="טלפון"
                name="Telephone"
                value={formData.Telephone}
                onChange={handleChange("Telephone")}
                placeholder="הכנס מספר טלפון"
                required={true}
              />

              <div className="row">
                <div className="col-md-6">
                  <PasswordField
                    label="סיסמה"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange("Password")}
                    placeholder="הכנס סיסמה"
                    required={true}
                  />
                </div>
                <div className="col-md-6">
                  <PasswordField
                    label="אימות סיסמה"
                    name="ConfirmPassword"
                    value={formData.ConfirmPassword}
                    onChange={handleChange("ConfirmPassword")}
                    placeholder="הכנס סיסמה שוב"
                    required={true}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="btn btn-outline-primary btn-success p-2 w-100 mt-3"
                size="lg"
              >
                הרשמה
              </Button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link
                to="/login"
                style={{
                  color: 'var(--site-primary)',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  textDecoration: 'underline',
                  letterSpacing: '0.03em',
                  transition: 'color 0.2s',
                }}
              >
                להתחברות
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default RegisterPage;
