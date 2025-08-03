import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "components/Common/ProtectedRoute/ProtectedRoute";
import MediationPage from "components/Mediation/MediationPage";
import CategorySelectionPage from "components/AdPosting/CategorySelectionPage";
import LoginPage from "../LoginAndRegister/LoginPage/LoginPage";
import HomePage from "../HomePage/HomePage";
import RegisterPage from "../LoginAndRegister/RegisterPage/RegisterPage";
import FieldsShowcase from "../TempComponnents/FieldsShowcase";
import ApartmentsForRent from "../Apartments/Rent/ApartmentsForRent";
import ApartmentsForSale from "../Apartments/Sale/ApartmentsForSale";
import ShabbatHouses from "../Apartments/Shabbat/ShabbatHouses";
import HomeAddress from "../HomeAddress/HomeAddress";
import HomeFeatures from "../HomeFeatures/HomeFeatures";
import ValuationForm from "../ValuationForm/ValuationForm";
import AdPostingForm from "components/PostingProperty/Steps/AdPostingForm";
import Profile from "../Profile/Profile";
import BusinessPosting from "../BusinessPosting/BusinessPosting";
import UploadExcelPage from '../UploadExcelPage';

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homePage" element={<HomePage />} />
      <Route path="/fields-showcase" element={<FieldsShowcase />} />
      <Route path="/rent/:location" element={<ApartmentsForRent />} />
      <Route path="/sales/:location" element={<ApartmentsForSale />} />
      <Route path="/shabbat/:location" element={<ShabbatHouses />} />
      <Route path="/home-address" element={<HomeAddress />} />
      <Route path="/home-features" element={<HomeFeatures />} />
      <Route path="/valuation" element={<ValuationForm />} />      
      <Route path="/upload-excel" element={<UploadExcelPage />} />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-ad"
        element={
          <ProtectedRoute>
            <AdPostingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mediation"
        element={
          <ProtectedRoute>
            <MediationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/select-category"
        element={
          <ProtectedRoute>
            <CategorySelectionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/business-post"
        element={
          <ProtectedRoute>
            <BusinessPosting />
          </ProtectedRoute>
        }
      />

      {/* Add more protected routes as needed */}
    </Routes>
  );
};

export default RoutesComponent;
