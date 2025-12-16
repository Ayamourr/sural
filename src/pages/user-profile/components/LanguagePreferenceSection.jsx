import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguagePreferenceSection = ({ currentLanguage, onLanguageChange, language }) => {
  const translations = {
    en: {
      title: 'Language Preference',
      description: 'Choose your preferred language for the interface',
      label: 'Interface Language',
    },
    ru: {
      title: 'Языковые настройки',
      description: 'Выберите предпочитаемый язык интерфейса',
      label: 'Язык интерфейса',
    },
  };

  const t = translations?.[language];

  const languageOptions = [
    { value: 'en', label: 'English', description: 'English interface' },
    { value: 'ru', label: 'Русский', description: 'Русский интерфейс' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Globe" size={20} color="var(--color-primary)" />
        <h2 className="text-lg font-semibold text-foreground">{t?.title}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{t?.description}</p>
      <Select
        label={t?.label}
        options={languageOptions}
        value={currentLanguage}
        onChange={onLanguageChange}
      />
    </div>
  );
};

export default LanguagePreferenceSection;