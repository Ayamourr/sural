import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchFilters = ({ onFilterChange, activeFilters, resultCount }) => {
  const [language, setLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(activeFilters);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (e) => {
      setLanguage(e?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  const translations = {
    en: {
      filters: 'Filters',
      category: 'Category',
      status: 'Status',
      sortBy: 'Sort By',
      minVotes: 'Minimum Votes',
      applyFilters: 'Apply Filters',
      clearFilters: 'Clear All',
      showingResults: 'Showing {{count}} results',
      allCategories: 'All Categories',
      allStatuses: 'All Statuses',
      relevance: 'Relevance',
      popularity: 'Most Popular',
      newest: 'Newest First',
      oldest: 'Oldest First',
      planned: 'Planned',
      inTransit: 'In Transit',
      available: 'Available',
      soldOut: 'Sold Out',
      electronics: 'Electronics',
      fashion: 'Fashion',
      home: 'Home & Garden',
      sports: 'Sports & Outdoors',
      books: 'Books & Media',
      toys: 'Toys & Games',
      beauty: 'Beauty & Health',
      automotive: 'Automotive',
    },
    ru: {
      filters: 'Фильтры',
      category: 'Категория',
      status: 'Статус',
      sortBy: 'Сортировка',
      minVotes: 'Минимум голосов',
      applyFilters: 'Применить',
      clearFilters: 'Очистить все',
      showingResults: 'Показано {{count}} результатов',
      allCategories: 'Все категории',
      allStatuses: 'Все статусы',
      relevance: 'По релевантности',
      popularity: 'Популярные',
      newest: 'Новые',
      oldest: 'Старые',
      planned: 'Запланировано',
      inTransit: 'В пути',
      available: 'Доступно',
      soldOut: 'Распродано',
      electronics: 'Электроника',
      fashion: 'Мода',
      home: 'Дом и сад',
      sports: 'Спорт',
      books: 'Книги и медиа',
      toys: 'Игрушки',
      beauty: 'Красота и здоровье',
      automotive: 'Автомобили',
    },
  };

  const t = translations?.[language];

  const categoryOptions = [
    { value: 'all', label: t?.allCategories },
    { value: 'electronics', label: t?.electronics },
    { value: 'fashion', label: t?.fashion },
    { value: 'home', label: t?.home },
    { value: 'sports', label: t?.sports },
    { value: 'books', label: t?.books },
    { value: 'toys', label: t?.toys },
    { value: 'beauty', label: t?.beauty },
    { value: 'automotive', label: t?.automotive },
  ];

  const statusOptions = [
    { value: 'all', label: t?.allStatuses },
    { value: 'planned', label: t?.planned },
    { value: 'in-transit', label: t?.inTransit },
    { value: 'available', label: t?.available },
    { value: 'sold-out', label: t?.soldOut },
  ];

  const sortOptions = [
    { value: 'relevance', label: t?.relevance },
    { value: 'popularity', label: t?.popularity },
    { value: 'newest', label: t?.newest },
    { value: 'oldest', label: t?.oldest },
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setIsExpanded(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: 'all',
      status: 'all',
      sortBy: 'relevance',
      minVotes: 0,
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = localFilters?.category !== 'all' || 
                          localFilters?.status !== 'all' || 
                          localFilters?.minVotes > 0;

  return (
    <>
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          fullWidth
          iconName={isExpanded ? 'X' : 'SlidersHorizontal'}
          iconPosition="left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {t?.filters}
          {hasActiveFilters && (
            <span className="ml-2 w-2 h-2 rounded-full bg-primary" />
          )}
        </Button>
      </div>
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block bg-card border border-border rounded-lg p-4 lg:p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="SlidersHorizontal" size={20} />
            {t?.filters}
          </h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
            >
              {t?.clearFilters}
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <Select
            label={t?.category}
            options={categoryOptions}
            value={localFilters?.category}
            onChange={(value) => handleFilterChange('category', value)}
          />

          <Select
            label={t?.status}
            options={statusOptions}
            value={localFilters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <Select
            label={t?.sortBy}
            options={sortOptions}
            value={localFilters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t?.minVotes}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={localFilters?.minVotes}
                onChange={(e) => handleFilterChange('minVotes', parseInt(e?.target?.value))}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-sm font-medium text-foreground w-12 text-right">
                {localFilters?.minVotes}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              {t?.showingResults?.replace('{{count}}', resultCount)}
            </p>
            <Button
              variant="default"
              fullWidth
              iconName="Check"
              iconPosition="left"
              onClick={handleApplyFilters}
            >
              {t?.applyFilters}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilters;