import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const metricCards = [
    {
      label: 'Today\'s Deliveries',
      value: metrics?.todayDeliveries,
      total: metrics?.todayTotal,
      icon: 'Package',
      color: 'primary',
      trend: '+12%'
    },
    {
      label: 'Completion Rate',
      value: `${metrics?.completionRate}%`,
      icon: 'TrendingUp',
      color: 'success',
      trend: '+5%'
    },
    {
      label: 'Customer Rating',
      value: metrics?.rating,
      icon: 'Star',
      color: 'warning',
      trend: '+0.2'
    },
    {
      label: 'Today\'s Earnings',
      value: `₸${metrics?.earnings?.toLocaleString()}`,
      icon: 'Wallet',
      color: 'accent',
      trend: '+₸450'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      accent: 'bg-accent/10 text-accent'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards?.map((metric, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-12 h-12 rounded-lg ${getColorClasses(metric?.color)} flex items-center justify-center`}>
              <Icon name={metric?.icon} size={24} />
            </div>
            {metric?.trend && (
              <span className="text-xs font-medium text-success flex items-center gap-1">
                <Icon name="TrendingUp" size={12} />
                {metric?.trend}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">{metric?.label}</p>
          <p className="text-2xl font-bold text-foreground">
            {metric?.value}
            {metric?.total && (
              <span className="text-sm font-normal text-muted-foreground">/{metric?.total}</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMetrics;