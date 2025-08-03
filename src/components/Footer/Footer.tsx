import React from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer
      className="text-white text-center p-4 mt-4"
      style={{ backgroundColor: "var(--site-primary-light)" }}
    >
      <Container>
        <Row>
          {/* קישורים לדפים במערכת */}
          <Col md={4} className="mb-3">
            <h5>ניווט מהיר</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-white">
                דף הבית
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-white">
                <Button variant="outline-light" className="w-100 mb-2">
                  התחברות למערכת
                </Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-white">
                הרשמה
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-white">
                אודות
              </Nav.Link>
              <Nav.Link as={Link} to="/fields-showcase" className="text-white">
                Fields Showcase (Dev)
              </Nav.Link>
              <Nav.Link as={Link} to="/post-ad" className="text-white">
                Ad Posting Form (Dev)
              </Nav.Link>
              <Nav.Link as={Link} to="/home-address" className="text-white">
                כתובת הנכס
              </Nav.Link>
              <Nav.Link as={Link} to="/home-features" className="text-white">
                תכונות הנכס
              </Nav.Link>
              <Nav.Link as={Link} to="/valuation" className="text-white">
                הערכת שווי נכס
              </Nav.Link>
              <Nav.Link as={Link} to="/profile" className="text-white">
                פרופיל
              </Nav.Link>
            </Nav>
          </Col>

          {/* פרטי יצירת קשר */}
          <Col md={4} className="mb-3">
            <h5>צור קשר</h5>
            <p>info@myapp.com</p>
            <p>+1 (555) 123-4567</p>
          </Col>

          {/* מדיה חברתית */}
          <Col md={4} className="mb-3">
            <h5>עקבו אחרינו</h5>
            <Nav className="justify-content-center">
              <Nav.Link href="#" className="text-white">
                Facebook
              </Nav.Link>
              <Nav.Link href="#" className="text-white">
                Twitter
              </Nav.Link>
              <Nav.Link href="#" className="text-white">
                Instagram
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p>© 2025 HomeFinder. כל הזכויות שמורות.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
