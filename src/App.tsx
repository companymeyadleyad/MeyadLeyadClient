import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header/Header";
import Footer from "./components/Footer/Footer";
import RoutesComponent from "./components/Routes/RoutesComponent";
import "./App.css";
import { BrowserRouter, Navigate, useLocation } from "react-router-dom"; // Import useLocation
import { PopupProvider } from "./components/Common/Popup/PopupContext";
import { observer } from "mobx-react-lite";
import { userStore } from "stores/User.store";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import { UserService } from "services/userService";

const App: React.FC = observer(() => {
  const location = useLocation();  // מקבלים את המיקום הנוכחי
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const authenticateUser = async () => {
        const userService = new UserService();
        const response = await userService.authenticate();
        if (response?.success) {
          userStore.isLoggedIn = true;
          const currentUser = await userService.getCurrentUser();
          if(currentUser?.success){
            userStore.setUser(currentUser.data);
          }
          setIsAuthenticated(true);
        }
      };
        authenticateUser();
  }, [location.pathname]);  // שינוי במיקום גורם לטעינה מחדש של האפקט

  const handleLogout = () => {
    userStore.isLoggedIn = false; // עדכון הסטור במוביקס על יציאה
  };

  return (
    <PopupProvider>
      <div style={{ direction: "rtl" }}>
        <div className="main-content">
          <Header />
          <div className="container mt-4 nav-footer-spacing">
            <RoutesComponent />
          </div>
          <Footer />
          {userStore.isLoggedIn && <BottomNavBar />}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </PopupProvider>
  );
});

const Root: React.FC = () => {
  return (
    <BrowserRouter> {/* עטיפה של כל היישום ב-BrowserRouter */}
      <App />
    </BrowserRouter>
  );
};

export default Root;
