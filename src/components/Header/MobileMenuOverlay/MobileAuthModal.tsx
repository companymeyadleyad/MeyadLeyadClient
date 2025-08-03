import React from "react";
import "./MobileMenuOverlay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";

interface MobileAuthModalProps {
  show: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const MobileAuthModal: React.FC<MobileAuthModalProps> = ({
  show,
  onClose,
  onLogin,
  onRegister,
}) => {
  if (!show) return null;
  return (
    <div className="mobile-auth-modal-overlay">
      <div className="mobile-auth-modal">
        {/* כותרת צבעונית */}
        <div className="mobile-auth-modal-header">
          <span>התחברות / הרשמה</span>
          <button
            className="mobile-auth-modal-close"
            onClick={onClose}
            aria-label="סגור"
          >
            ×
          </button>
        </div>
        <div className="mobile-auth-modal-body">
          {/* בלוק הרשמה */}
          <div className="mobile-auth-section">
            <div className="mobile-auth-title">עוד אין לי חשבון</div>
            <button className="mobile-auth-btn" onClick={onRegister}>
              הרשמה לאתר
            </button>
          </div>
          <hr className="mobile-auth-divider" />
          {/* בלוק התחברות */}
          <div className="mobile-auth-section">
            <div className="mobile-auth-title">כבר יש לי חשבון</div>
            <button className="mobile-auth-btn" onClick={onLogin}>
              התחברות
            </button>
            <div className="mobile-auth-social">
              <span className="mobile-auth-social-label">להמשיך עם</span>
              <div className="mobile-auth-social-icons">
                <button
                  className="mobile-auth-social-btn"
                  onClick={() => alert("Google login not implemented")}
                  aria-label="התחברות עם גוגל"
                >
                  <FontAwesomeIcon icon={faGoogle} color="#ea4335" />
                </button>
                <button
                  className="mobile-auth-social-btn"
                  onClick={() => alert("Facebook login not implemented")}
                  aria-label="התחברות עם פייסבוק"
                >
                  <FontAwesomeIcon icon={faFacebookF} color="#1877f3" />
                </button>
              </div>
              <div className="mobile-auth-social-labels">
                <span>גוגל</span>
                <span>פייסבוק</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAuthModal;
