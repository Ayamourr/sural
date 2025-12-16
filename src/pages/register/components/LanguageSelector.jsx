import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧', nativeLabel: 'English' },
    { code: 'ru', label: 'Russian', flag: '🇷🇺', nativeLabel: 'Русский' },
  ];

  return (
    <div className="space-y-3">
      {languages?.map((lang) => (
        <button
          key={lang?.code}
          type="button"
          onClick={() => onLanguageChange(lang?.code)}
          className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 ${
            selectedLanguage === lang?.code
              ? 'border-primary bg-primary/5 shadow-sm'
              : 'border-border bg-card hover:border-muted-foreground/30'
          }`}
        >
          <span className="text-2xl">{lang?.flag}</span>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-foreground">{lang?.nativeLabel}</p>
            <p className="text-xs text-muted-foreground">{lang?.label}</p>
          </div>
          {selectedLanguage === lang?.code && (
            <Icon name="Check" size={20} color="var(--color-primary)" />
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;