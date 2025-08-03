import React, { useRef, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faUserCircle,
  faSignInAlt,
  faUserPlus,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { userStore } from "stores/User.store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

interface UserMenuPopupProps {
  onProfile: () => void;
  onLogout: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const UserMenuPopup: React.FC<UserMenuPopupProps> = observer(({
  onProfile,
  onLogout,
  onLogin,
  onRegister,
}) => {
  
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu-container" ref={menuRef}>
      <div
        className="user-avatar"
        onClick={() => setShowUserMenu((prev) => !prev)}
      >
        {userStore.isLoggedIn ? (
          userStore.user?.firstName ? (
            <div className="avatar-circle">
              {userStore.user.firstName.charAt(0)}
            </div>
          ) : (
            <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
          )
        ) : (
          <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
        )}
      </div>
      {userStore.isLoggedIn && showUserMenu && (
        <div className="user-menu">
          {true ? (
            <>
              <Button
                variant="link"
                className="menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  onProfile();
                }}
              >
                <FontAwesomeIcon icon={faUserCircle} className="menu-icon" />
                פרופיל
              </Button>
              <Button
                variant="link"
                className="menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  onLogout();
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                התנתק
              </Button>
            {userStore.user?.isAdmin && <Button
                variant="link"
                className="menu-item"
                onClick={() => {
                  navigate("/business-post");
                }}
              >
                <FontAwesomeIcon icon={faFileAlt} className="menu-icon" />
                פרסום עסקים
              </Button>}
              {userStore.user?.isAdmin &&<Button
              variant="link"
              className="menu-item"
              onClick={() => {
                setShowUserMenu(false);
                navigate("/upload-excel");
              }}
            >
              <FontAwesomeIcon icon={faFileAlt} className="menu-icon" />
              העלאת קובץ
            </Button>}
            </>
          ) : (
            <>
              <Button
                variant="link"
                className="menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  onLogin();
                }}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="menu-icon" />
                התחברות
              </Button>
              <Button
                variant="link"
                className="menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  onRegister();
                }}
              >
                <FontAwesomeIcon icon={faUserPlus} className="menu-icon" />
                הרשמה
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default UserMenuPopup;

const styles = `
  .avatar-circle {
    width: 30px;
    height: 30px;
    background-color: var(--site-primary-light);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
