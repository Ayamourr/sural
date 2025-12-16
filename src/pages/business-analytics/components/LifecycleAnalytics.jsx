import React from 'react';
import Icon from '../../../components/AppIcon';

const LifecycleAnalytics = ({ stages }) => {
  const getStageColor = (stage) => {
    switch (stage) {
      case 'Planned': return { bg: 'bg-accent/10', text: 'text-accent', icon: 'Calendar' };
      case 'In Transit': return { bg: 'bg-warning/10', text: 'text-warning', icon: 'Truck' };
      case 'Available': return { bg: 'bg-success/10', text: 'text-success', icon: 'CheckCircle' };
      case 'Sold Out': return { bg: 'bg-muted', text: 'text-muted-foreground', icon: 'XCircle' };
      default: return { bg: 'bg-muted', text: 'text-muted-foreground', icon: 'Circle' };
    }
  };

  const totalProducts = stages?.reduce((sum, stage) => sum + stage?.count, 0);

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Product Lifecycle Analytics</h3>
        <p className="text-sm text-muted-foreground">Track products through each stage</p>
      </div>
      <div className="space-y-6">
        {stages?.map((stage, index) => {
          const colors = getStageColor(stage?.name);
          const percentage = ((stage?.count / totalProducts) * 100)?.toFixed(1);

          return (
            <div key={stage?.id}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${colors?.bg} flex items-center justify-center`}>
                    <Icon name={colors?.icon} size={20} className={colors?.text} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{stage?.name}</p>
                    <p className="text-xs text-muted-foreground">{stage?.count} products</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{percentage}%</p>
                  <p className="text-xs text-muted-foreground">of total</p>
                </div>
              </div>
              <div className="relative mb-4">
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${colors?.bg?.replace('/10', '')}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="text-center p-2 bg-muted/50 rounded">
                  <p className="font-semibold text-foreground">{stage?.avgDuration}</p>
                  <p className="text-muted-foreground mt-1">Avg Duration</p>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <p className="font-semibold text-foreground">{stage?.successRate}%</p>
                  <p className="text-muted-foreground mt-1">Success Rate</p>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <p className="font-semibold text-foreground">{stage?.revenue}</p>
                  <p className="text-muted-foreground mt-1">Revenue</p>
                </div>
              </div>
              {index < stages?.length - 1 && (
                <div className="flex justify-center my-4">
                  <Icon name="ArrowDown" size={20} className="text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Products in Pipeline</span>
          <span className="text-xl font-bold text-foreground">{totalProducts}</span>
        </div>
      </div>
    </div>
  );
};

export default LifecycleAnalytics;