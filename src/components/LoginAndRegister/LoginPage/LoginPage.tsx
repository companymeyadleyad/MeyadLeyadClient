import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import PageTitle from "../GlobalComponent/PageTitle";
import { TextField, PasswordField } from "../../Fields/FormFields";
import { LoginRequest } from "types/LoginAndRegister/Login/LoginRequest";
import { userStore } from "stores/User.store";
import { UserService } from "services/userService";
import { usePopup } from "../../Common/Popup/PopupContext";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const showPopup = usePopup();

  // Get the previous location from state, or default to home page
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userService = new UserService();
    const response = await userService.login(formData);
    if (response?.success) {
      userStore.setToken(response.data.token);
      userStore.setUser(response.data.user);
      console.log(userStore.user);
      showPopup({
        type: 'success',
        message: 'ההתחברות בוצעה בהצלחה',
        title: '',
        actionHandler: () => navigate(from, { replace: true })
      });
    } else {
      showPopup({
        type: 'error',
        message: 'ההתחברות נכשלה. אנא נסה שוב.',
        title: '',
      });
    }
  };

  const handleChange = (field: keyof LoginRequest) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <Card
            className="shadow-lg"
            style={{ width: "100%", maxWidth: "500px" }}
          >
            <Card.Body className="p-4">
              <PageTitle text="התחברות" className="text-center mb-4" />
              <form onSubmit={handleSubmit}>
                <TextField
                  label="אימייל"
                  name="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="הכנס אימייל"
                  required={true}
                />
                <PasswordField
                  label="סיסמה"
                  name="password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="הכנס סיסמה"
                  required={true}
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-outline-primary btn-success p-2 w-100 mt-3"
                  size="lg"
                >
                  התחבר
                </Button>
              </form>
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Link
                  to="/register"
                  style={{
                    color: 'var(--site-primary)',
                    fontWeight: 600,
                    fontSize: '1.08rem',
                    textDecoration: 'underline',
                    letterSpacing: '0.03em',
                    transition: 'color 0.2s',
                  }}
                >
                  להרשמה
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
