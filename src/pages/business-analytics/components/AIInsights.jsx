import React from 'react';
import Icon from '../../../components/AppIcon';

const AIInsights = ({ insights }) => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return { name: 'TrendingUp', color: 'var(--color-success)' };
      case 'warning': return { name: 'AlertTriangle', color: 'var(--color-warning)' };
      case 'info': return { name: 'Info', color: 'var(--color-accent)' };
      case 'recommendation': return { name: 'Lightbulb', color: 'var(--color-primary)' };
      default: return { name: 'Sparkles', color: 'var(--color-primary)' };
    }
  };

  const getInsightBg = (type) => {
    switch (type) {
      case 'opportunity': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'info': return 'bg-accent/10';
      case 'recommendation': return 'bg-primary/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Sparkles" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI-Generated Insights</h3>
          <p className="text-sm text-muted-foreground">Market opportunities and recommendations</p>
        </div>
      </div>
      <div className="space-y-4">
        {insights?.map((insight) => {
          const icon = getInsightIcon(insight?.type);
          const bgClass = getInsightBg(insight?.type);

          return (
            <div 
              key={insight?.id} 
              className={`${bgClass} rounded-lg p-4 hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Icon name={icon?.name} size={20} color={icon?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">{insight?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{insight?.description}</p>
                  
                  {insight?.metrics && (
                    <div className="flex flex-wrap gap-4 mb-3">
                      {insight?.metrics?.map((metric, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Icon name={metric?.icon} size={14} className="text-muted-foreground" />
                          <span className="text-xs font-medium text-foreground">{metric?.label}:</span>
                          <span className="text-xs font-semibold text-primary">{metric?.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {insight?.action && (
                    <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                      {insight?.action}
                      <Icon name="ArrowRight" size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Zap" size={16} />
            <span>Insights updated in real-time</span>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">
            View all insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;