import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { UserService } from "services/userService";

export const useHeaderHooks = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isAuthenticated = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return false;
    }

    try {
      const userService = new UserService();
      const response = await userService.authenticate();
      return response?.success === true;
    } catch (error) {
      console.error("Authentication validation failed:", error);
      return false;
    }
  }, []);

  const handleStartAdPosting = useCallback(async () => {
      navigate("/select-category");
  }, [isAuthenticated, navigate]);

  const handleMouseEnter = useCallback((id: string) => {
    setOpenDropdown(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  const handleClick = useCallback((id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  }, []);

  return {
    openDropdown,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleStartAdPosting,
    isAuthenticated
  };
};