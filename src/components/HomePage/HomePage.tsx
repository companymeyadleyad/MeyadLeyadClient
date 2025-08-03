import React from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { postData } from "../../services/apiService";
import RandomQuote from "./RandomQuote";

interface LoginResponse {
  token: string;
  ok: string;
}

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <RandomQuote />
      {/* Add your homepage content here */}
    </div>
  );
};

export default HomePage;
