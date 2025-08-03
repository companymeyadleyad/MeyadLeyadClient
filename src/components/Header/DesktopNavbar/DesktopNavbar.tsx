import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Category } from "types/Categories/Category";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";
import { City } from "types/Cities/City";
import { useHeaderHooks } from "../Hooks/useHeaderHooks";
import { userStore } from "stores/User.store";
import UserMenuPopup from "./UserMenuPopup";
import "./DesktopNavbar.css";
import AuthModal from "./AuthModal";

interface DesktopNavbarProps {
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = observer(({ }) => {
  const {
    handleStartAdPosting,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    openDropdown,
  } = useHeaderHooks();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = () => {
    userStore.clearUser();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className="shadow-sm d-none d-lg-flex header-navbar"
    >
      <div className="container-fluid px-4">
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <img
            src="/images/logo6.png"
            alt="Hand to Hand Logo"
            style={{ height: "50px", width: "auto" }}
          />
        </Navbar.Brand>
        <Nav className="mx-auto category-nav">
          {categoriesStore.categories?.map((category: Category) => (
            <div
              key={category.categoryNumber}
              onMouseEnter={() =>
                handleMouseEnter(`nav-dropdown-${category.categoryNumber}`)
              }
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown
                title={category.categoryName}
                id={`nav-dropdown-${category.categoryNumber}`}
                className="custom-dropdown mx-2"
                show={
                  openDropdown === `nav-dropdown-${category.categoryNumber}`
                }
                onClick={() =>
                  handleClick(`nav-dropdown-${category.categoryNumber}`)
                }
              >
                {(category?.cities ?? []).map((city: City) => (
                  <NavDropdown.Item key={city.cityId} href="#">
                    {city.cityName}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
          ))}
        </Nav>
        <div className="align-items-center d-flex m-0 me-1">
          <AuthModal
            show={showAuthModal}
            onHide={() => setShowAuthModal(false)}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
          <Button
            variant="outline-primary"
            className="btn-success"
            onClick={handleStartAdPosting}
          >
            + פרסום מודעה
          </Button>
          <div className="me-2">
          {userStore.isLoggedIn &&<UserMenuPopup
              onProfile={handleProfileClick}
              onLogout={handleLogout}
              onLogin={handleLogin}
              onRegister={handleRegister}
            />}
            {!userStore.isLoggedIn && (
              <Button
              variant="primary"
              className="me-2"
              onClick={() => setShowAuthModal(true)}
            >
              התחברות / הרשמה
            </Button>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
});

export default DesktopNavbar;
