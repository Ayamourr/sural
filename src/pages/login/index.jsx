import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import LoginBanner from './components/LoginBanner';
import Icon from '../../components/AppIcon';

const Login = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');

    if (isAuthenticated === 'true' && userRole) {
      switch (userRole) {
        case 'consumer': navigate('/consumer-dashboard');
          break;
        case 'business': navigate('/business-analytics');
          break;
        case 'courier': navigate('/courier-dashboard');
          break;
        case 'admin': navigate('/admin-panel');
          break;
        default:
          navigate('/consumer-dashboard');
      }
    }
  }, [navigate]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
  };

  const translations = {
    en: {
      backToHome: 'Back to Home'
    },
    ru: {
      backToHome: 'Вернуться на главную'
    }
  };

  const t = translations?.[language];

  return (
    <div className="min-h-screen bg-background flex">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate('/landing-page')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-colors duration-150"
        >
          <Icon name="ArrowLeft" size={20} />
          <span className="text-sm font-medium">{t?.backToHome}</span>
        </button>
      </div>
      <div className="absolute top-4 right-4 z-50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-150 ${
              language === 'en' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            EN
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            onClick={() => handleLanguageChange('ru')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-150 ${
              language === 'ru' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            RU
          </button>
        </div>
      </div>
      <LoginBanner language={language} />
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <LoginForm language={language} />
          <SocialLogin language={language} />
        </div>
      </div>
    </div>
  );
};

export default Login;