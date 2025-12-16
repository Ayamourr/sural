import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ icon, title, description, actionText, actionPath, variant = 'default' }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
          variant === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
        }`}>
          <Icon 
            name={icon} 
            size={24} 
            color={variant === 'primary' ? 'var(--color-primary)' : 'var(--color-accent)'} 
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <Button
            variant={variant === 'primary' ? 'default' : 'outline'}
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate(actionPath)}
            className="w-full sm:w-auto"
          >
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;