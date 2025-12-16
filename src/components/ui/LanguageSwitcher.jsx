import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const LanguageSwitcher = ({ className = '' }) => {
  const [language, setLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const currentLanguage = languages?.find(lang => lang?.code === language);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-switcher"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLanguage?.code?.toUpperCase()}</span>
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[190]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-[200] overflow-hidden">
            {languages?.map((lang) => (
              <button
                key={lang?.code}
                onClick={() => handleLanguageChange(lang?.code)}
                className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 flex items-center gap-3 ${
                  language === lang?.code ? 'bg-primary/10 text-primary' : 'text-foreground'
                }`}
              >
                <span className="text-lg">{lang?.flag}</span>
                <span className="text-sm font-medium">{lang?.label}</span>
                {language === lang?.code && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;