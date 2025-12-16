import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NoResultsState = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (e) => {
      setLanguage(e?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translations = {
    en: {
      noResults: 'No results found',
      noResultsDesc: 'We couldn\'t find any products matching "{{query}}". Try adjusting your search or filters.',
      suggestions: 'Suggestions:',
      checkSpelling: 'Check your spelling',
      tryDifferent: 'Try different keywords',
      removeFilters: 'Remove some filters',
      browseCategories: 'Browse popular categories',
      createRequest: 'Create New Request',
      createRequestDesc: 'Can\'t find what you\'re looking for? Create a product request and let others vote!',
      popularCategories: 'Popular Categories',
      electronics: 'Electronics',
      fashion: 'Fashion',
      home: 'Home & Garden',
      sports: 'Sports & Outdoors',
    },
    ru: {
      noResults: 'Ничего не найдено',
      noResultsDesc: 'Мы не смогли найти товары по запросу "{{query}}". Попробуйте изменить поиск или фильтры.',
      suggestions: 'Предложения:',
      checkSpelling: 'Проверьте правописание',
      tryDifferent: 'Попробуйте другие ключевые слова',
      removeFilters: 'Удалите некоторые фильтры',
      browseCategories: 'Просмотрите популярные категории',
      createRequest: 'Создать запрос',
      createRequestDesc: 'Не можете найти то, что ищете? Создайте запрос на товар и позвольте другим проголосовать!',
      popularCategories: 'Популярные категории',
      electronics: 'Электроника',
      fashion: 'Мода',
      home: 'Дом и сад',
      sports: 'Спорт',
    },
  };

  const t = translations?.[language];

  const popularCategories = [
    { name: t?.electronics, icon: 'Laptop', path: '/search-results?category=electronics' },
    { name: t?.fashion, icon: 'Shirt', path: '/search-results?category=fashion' },
    { name: t?.home, icon: 'Home', path: '/search-results?category=home' },
    { name: t?.sports, icon: 'Dumbbell', path: '/search-results?category=sports' },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon name="SearchX" size={48} className="text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
        {t?.noResults}
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        {t?.noResultsDesc?.replace('{{query}}', searchQuery)}
      </p>
      <div className="card p-6 mb-8 max-w-md w-full">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Lightbulb" size={16} />
          {t?.suggestions}
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{t?.checkSpelling}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{t?.tryDifferent}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{t?.removeFilters}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{t?.browseCategories}</span>
          </li>
        </ul>
      </div>
      <div className="card p-6 mb-8 max-w-md w-full bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="Plus" size={24} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-2">
              {t?.createRequest}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t?.createRequestDesc}
            </p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/product-request-creation')}
            >
              {t?.createRequest}
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-2xl w-full">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          {t?.popularCategories}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCategories?.map((category) => (
            <button
              key={category?.name}
              onClick={() => navigate(category?.path)}
              className="card p-4 hover:shadow-md transition-all duration-200 flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={category?.icon} size={24} color="var(--color-primary)" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">
                {category?.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoResultsState;