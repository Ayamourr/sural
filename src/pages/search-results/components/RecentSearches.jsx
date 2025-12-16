import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentSearches = ({ onSearchClick }) => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [recentSearches, setRecentSearches] = useState([
    'Wireless Headphones',
    'Smart Watch',
    'Laptop Stand',
    'USB-C Cable',
    'Mechanical Keyboard',
  ]);

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
      recentSearches: 'Recent Searches',
      clearAll: 'Clear All',
      popularCategories: 'Popular Categories',
      electronics: 'Electronics',
      fashion: 'Fashion',
      home: 'Home & Garden',
      sports: 'Sports & Outdoors',
      books: 'Books & Media',
      toys: 'Toys & Games',
    },
    ru: {
      recentSearches: 'Недавние поиски',
      clearAll: 'Очистить все',
      popularCategories: 'Популярные категории',
      electronics: 'Электроника',
      fashion: 'Мода',
      home: 'Дом и сад',
      sports: 'Спорт',
      books: 'Книги и медиа',
      toys: 'Игрушки',
    },
  };

  const t = translations?.[language];

  const popularCategories = [
    { name: t?.electronics, icon: 'Laptop', value: 'electronics' },
    { name: t?.fashion, icon: 'Shirt', value: 'fashion' },
    { name: t?.home, icon: 'Home', value: 'home' },
    { name: t?.sports, icon: 'Dumbbell', value: 'sports' },
    { name: t?.books, icon: 'Book', value: 'books' },
    { name: t?.toys, icon: 'Gamepad2', value: 'toys' },
  ];

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleRemoveSearch = (index) => {
    setRecentSearches(prev => prev?.filter((_, i) => i !== index));
  };

  const handleCategoryClick = (category) => {
    navigate(`/search-results?category=${category}`);
  };

  if (recentSearches?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 mb-8">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Icon name="Clock" size={18} />
            {t?.recentSearches}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
          >
            {t?.clearAll}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {recentSearches?.map((search, index) => (
            <button
              key={index}
              onClick={() => onSearchClick(search)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 text-sm text-foreground transition-colors duration-150 group"
            >
              <Icon name="Search" size={14} className="text-muted-foreground" />
              <span>{search}</span>
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  handleRemoveSearch(index);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              >
                <Icon name="X" size={14} className="text-muted-foreground hover:text-foreground" />
              </button>
            </button>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="TrendingUp" size={18} />
          {t?.popularCategories}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {popularCategories?.map((category) => (
            <button
              key={category?.value}
              onClick={() => handleCategoryClick(category?.value)}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-150"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={category?.icon} size={20} color="var(--color-primary)" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {category?.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;