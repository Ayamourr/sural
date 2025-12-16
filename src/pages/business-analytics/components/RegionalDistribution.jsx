import React from 'react';
import Icon from '../../../components/AppIcon';

const RegionalDistribution = ({ regions }) => {
  const maxRequests = Math.max(...regions?.map(r => r?.requests));

  const getGrowthIcon = (growth) => {
    if (growth > 0) return { name: 'TrendingUp', color: 'text-success' };
    if (growth < 0) return { name: 'TrendingDown', color: 'text-error' };
    return { name: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Regional Distribution</h3>
        <p className="text-sm text-muted-foreground">Product requests across Kazakhstan regions</p>
      </div>
      <div className="space-y-4">
        {regions?.map((region) => {
          const percentage = (region?.requests / maxRequests) * 100;
          const growthIcon = getGrowthIcon(region?.growth);

          return (
            <div key={region?.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="MapPin" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{region?.name}</p>
                    <p className="text-xs text-muted-foreground">{region?.requests} requests</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name={growthIcon?.name} size={16} className={growthIcon?.color} />
                  <span className={`text-sm font-semibold ${growthIcon?.color}`}>
                    {region?.growth > 0 ? '+' : ''}{region?.growth}%
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{region?.activeUsers} active users</span>
                <span>{region?.topCategory}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {regions?.reduce((sum, r) => sum + r?.requests, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Total Requests</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {regions?.reduce((sum, r) => sum + r?.activeUsers, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Active Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{regions?.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Regions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalDistribution;