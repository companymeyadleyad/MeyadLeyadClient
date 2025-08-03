import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { UserService } from 'services/userService';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const userService = new UserService();
        const response = await userService.authenticate();
        setIsAuthenticated(response?.success === true);
      } catch (error) {
        console.error("Authentication validation failed:", error);
        setIsAuthenticated(false);
      }
    };

    validateAuth();
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  if (!isAuthenticated) {
    // Pass the current location to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
});

export default ProtectedRoute; 