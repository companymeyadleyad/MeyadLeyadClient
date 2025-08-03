import { useEffect, useState } from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./MobileMenuOverlay.css";
import { Category } from "types/Categories/Category";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom"; // ייבוא ה-hook של הניווט
import { City } from "types/Cities/City";
import MobileAuthModal from "./MobileAuthModal";
import { userStore } from "stores/User.store";

interface MobileMenuOverlayProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  openCategory: string | null;
  handleCategoryClick: (category: string) => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = observer(
  ({
    isMobileMenuOpen,
    toggleMobileMenu,
    openCategory,
    handleCategoryClick,
  }) => {
    const navigate = useNavigate();
    const [showMobileAuth, setShowMobileAuth] = useState(false);

    const handleStartAdPosting = () => {
      // Navigate to category selection page
      navigate("/select-category");
      // Close the mobile menu
      toggleMobileMenu();
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        (event.target as HTMLElement).classList.contains("mobile-menu-overlay")
      ) {
        toggleMobileMenu();
      }
    };

    return (
      <>
        {/* Mobile Auth Modal OUTSIDE the sidebar */}
        <MobileAuthModal
          show={showMobileAuth}
          onClose={() => setShowMobileAuth(false)}
          onLogin={() => {
            setShowMobileAuth(false);
            navigate("/login");
          }}
          onRegister={() => {
            setShowMobileAuth(false);
            navigate("/register");
          }}
        />

        {/* Sidebar overlay */}
        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
          onClick={handleOverlayClick}
        >
          <div
            className="mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* אייקון סגירה (X) */}
            <span className="close-icon" onClick={toggleMobileMenu}>
              ✖
            </span>
            <div className="mobile-menu-inner-container">
              {!userStore.isLoggedIn ? (
                <Button
                  className="mobile-menu-top-btn"
                  onClick={() => {
                    setShowMobileAuth(true);
                    toggleMobileMenu();
                  }}
                >
                  כניסה / הרשמה
                </Button>
              ) : (
                <Button
                  className="mobile-menu-top-btn"
                  onClick={handleStartAdPosting}
                >
                  + פרסום מודעה
                </Button>
              )}
              {/* קטגוריות */}
              <Nav
                className="flex-column text-center rtl"
                style={{ marginTop: "40px", direction: "ltr" }}
              >
                {categoriesStore.categories.map((category: Category) => (
                  <div key={category.categoryNumber} className="category-item">
                    <div
                      className="category-content"
                      onClick={() => handleCategoryClick(category.categoryName)}
                    >
                      {/* שם הקטגוריה */}
                      <div className="category-title">{category.categoryName}</div>
                      {/* אייקון */}
                      <FontAwesomeIcon icon={faHome} className="category-icon" />
                    </div>
                    <div
                      className={`me-3 submenu text-end ${
                        openCategory === category.categoryName ? "open" : ""
                      }`}
                    >
                      {(category?.cities ?? []).map((city: City) => (
                        <NavDropdown.Item key={city.cityId} href="#">
                          {city.cityName}
                        </NavDropdown.Item>
                      ))}
                    </div>
                  </div>
                ))}
              </Nav>
              {/* Logout button at the bottom if logged in */}
              {userStore.isLoggedIn && (
                <button
                  className="mobile-menu-logout-btn"
                  onClick={() => {
                    userStore.clearUser();
                    toggleMobileMenu();
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                  התנתק
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default MobileMenuOverlay;
