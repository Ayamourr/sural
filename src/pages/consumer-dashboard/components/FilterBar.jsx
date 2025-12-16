import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const FilterBar = ({ filters, onFilterChange, language }) => {
  const translations = {
    en: {
      filterByStatus: 'Filter by Status',
      filterByCategory: 'Filter by Category',
      searchRequests: 'Search requests...',
      allStatuses: 'All Statuses',
      allCategories: 'All Categories',
    },
    ru: {
      filterByStatus: 'Фильтр по статусу',
      filterByCategory: 'Фильтр по категории',
      searchRequests: 'Поиск запросов...',
      allStatuses: 'Все статусы',
      allCategories: 'Все категории',
    },
  };

  const t = translations?.[language];

  const statusOptions = [
    { value: 'all', label: t?.allStatuses },
    { value: 'Planned', label: 'Planned' },
    { value: 'In transit', label: 'In transit' },
    { value: 'Available', label: 'Available' },
    { value: 'Sold out', label: 'Sold out' },
  ];

  const categoryOptions = [
    { value: 'all', label: t?.allCategories },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Home & Garden', label: 'Home & Garden' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Books', label: 'Books' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
          <Input
            type="search"
            placeholder={t?.searchRequests}
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="pl-10"
          />
        </div>

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder={t?.filterByStatus}
        />

        <Select
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
          placeholder={t?.filterByCategory}
        />
      </div>
    </div>
  );
};

export default FilterBar;