import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = (event) => {
      setLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const pageTitle = language === 'en' ? "sur'AL - Kazakhstan's Demand-Driven Marketplace" : "sur'AL - Платформа Спроса Казахстана";

  const pageDescription = language === 'en' ? "Request unavailable products, vote to demonstrate demand, and receive scheduled delivery through Kazakhstan's first demand-driven marketplace platform." :"Запрашивайте недоступные продукты, голосуйте для демонстрации спроса и получайте запланированную доставку через первую платформу спроса Казахстана.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <RoleBasedHeader isAuthenticated={false} />

      <main className="main-content">
        <HeroSection language={language} />
        <FeaturesSection language={language} />
        <HowItWorksSection language={language} />
        <TestimonialsSection language={language} />
        <TrustSignalsSection language={language} />
        <CTASection language={language} />
        <Footer language={language} />
      </main>
    </>
  );
};

export default LandingPage;