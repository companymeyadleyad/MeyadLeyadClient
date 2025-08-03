import React from "react";
import { useNavigate } from "react-router-dom";
import "./BottomNavBar.css";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/user.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";

const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav-bar">
      <div className="nav-item" onClick={() => navigate("/profile")}> 
        <ProfileIcon className="nav-icon" />
        <span>פרופיל</span>
      </div>
      <div className="nav-item" onClick={() => navigate("/ad-history")}> 
        <HistoryIcon className="nav-icon" />
        <span>היסטוריית מודעות</span>
      </div>
      <div className="nav-item" onClick={() => navigate("/")}> 
        <HomeIcon className="nav-icon" />
        <span>עמוד הבית</span>
      </div>
    </nav>
  );
};

export default BottomNavBar; 