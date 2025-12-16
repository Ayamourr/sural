import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ icon, label, value, trend, trendValue }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name={icon} size={20} color="var(--color-primary)" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend === 'up' ? 'text-success' : 'text-error'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatsCard;