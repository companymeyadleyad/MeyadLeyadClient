import { Navbar, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // ייבוא ה-hook של הניווט
import { useHeaderHooks } from "../Hooks/useHeaderHooks";
import { userStore } from "stores/User.store";
import { observer } from "mobx-react-lite";
import "./MobileNavbar.css";

interface MobileNavbarProps {
  toggleMobileMenu: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = observer(({
  toggleMobileMenu
}) => {
  const navigate = useNavigate(); // יצירת פונקציה לניווט
const { handleStartAdPosting } = useHeaderHooks();

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className="d-flex d-lg-none header-navbar"
    >
      <Container>
        {/* כפתור תפריט (3 פסים) בצד ימין */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleMobileMenu}
          children={<span className="navbar-toggler-icon"><span></span></span>}
        />

        {/* לוגו במרכז */}
        <Navbar.Brand href="#" className="mx-auto">
        <img
            src="/images/logo6.png"
            alt="Hand to Hand Logo"
            style={{ height: "38px", width: "auto" }}
          />
        </Navbar.Brand>

        {/* כפתור פרסום בצד שמאל */}
        <div className="d-flex align-items-center">
          <Button
            variant="outline-primary"
            className="btn-success p-2"
            onClick={handleStartAdPosting}
          >
            + פרסום מודעה
          </Button>
        </div>

        {/* תמונת משתמש */}
        <div className="d-flex justify-content-center">
          {userStore.isLoggedIn ? (
            <div className="me-2 user-avatar">
              {userStore.user?.firstName ? (
                <div className="avatar-circle">
                  {userStore.user.firstName.charAt(0)}
                </div>
              ) : (
                <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
              )}
            </div>
          ) : (
            <div className="me-2 user-avatar">
              <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
});

export default MobileNavbar;
