import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ConsumerDashboard from './pages/consumer-dashboard';
import AdminPanel from './pages/admin-panel';
import SearchResults from './pages/search-results';
import ProductRequestCreation from './pages/product-request-creation';
import Login from './pages/login';
import LandingPage from './pages/landing-page';
import CourierDashboard from './pages/courier-dashboard';
import BusinessAnalytics from './pages/business-analytics';
import UserProfile from './pages/user-profile';
import ProductRequestDetails from './pages/product-request-details';
import Register from './pages/register';
import DeliverySchedule from './pages/delivery-schedule';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/product-request-creation" element={<ProductRequestCreation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/courier-dashboard" element={<CourierDashboard />} />
        <Route path="/business-analytics" element={<BusinessAnalytics />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/product-request-details" element={<ProductRequestDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/delivery-schedule" element={<DeliverySchedule />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
