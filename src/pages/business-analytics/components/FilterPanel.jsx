import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onExport, onRefresh }) => {
  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion & Apparel' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'beauty', label: 'Beauty & Personal Care' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'almaty', label: 'Almaty' },
    { value: 'astana', label: 'Astana' },
    { value: 'shymkent', label: 'Shymkent' },
    { value: 'karaganda', label: 'Karaganda' },
    { value: 'aktobe', label: 'Aktobe' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'planned', label: 'Planned' },
    { value: 'in-transit', label: 'In Transit' },
    { value: 'available', label: 'Available' },
    { value: 'sold-out', label: 'Sold Out' }
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Filters & Controls</h3>
          <p className="text-sm text-muted-foreground mt-1">Customize your analytics view</p>
        </div>
        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={onRefresh}
        >
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => onFilterChange('dateRange', value)}
        />

        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />

        <Select
          label="Region"
          options={regionOptions}
          value={filters?.region}
          onChange={(value) => onFilterChange('region', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
          onClick={() => onExport('csv')}
        >
          Export CSV
        </Button>

        <Button
          variant="outline"
          iconName="FileText"
          iconPosition="left"
          onClick={() => onExport('pdf')}
        >
          Export PDF
        </Button>

        <Button
          variant="ghost"
          iconName="X"
          iconPosition="left"
          onClick={() => onFilterChange('reset')}
        >
          Clear Filters
        </Button>

        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last updated: {new Date()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;