import React from 'react';
import Icon from '../../../components/AppIcon';

const AIInsights = ({ insights }) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="Sparkles" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI-Generated Insights</h3>
          <p className="text-xs text-muted-foreground">Powered by demand analysis</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-card/50 rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <Icon name="TrendingUp" size={18} className="text-success mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Demand Analysis</h4>
              <p className="text-sm text-muted-foreground">{insights?.demandAnalysis}</p>
            </div>
          </div>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <Icon name="Target" size={18} className="text-accent mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Market Context</h4>
              <p className="text-sm text-muted-foreground">{insights?.marketContext}</p>
            </div>
          </div>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <Icon name="Lightbulb" size={18} className="text-warning mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Recommendation</h4>
              <p className="text-sm text-muted-foreground">{insights?.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;