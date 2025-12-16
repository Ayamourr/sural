import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryWindowCard = ({ delivery }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-accent/10 text-accent';
      case 'Ready':
        return 'bg-success/10 text-success';
      case 'Expired':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-foreground mb-1 line-clamp-1">{delivery?.productName}</h4>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery?.status)}`}>
            {delivery?.status}
          </span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name="Package" size={20} color="var(--color-primary)" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
          <span className="text-muted-foreground">{delivery?.pickupPoint}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
          <span className="text-muted-foreground">{delivery?.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
          <span className="text-muted-foreground">{delivery?.timeWindow}</span>
        </div>
      </div>
      {delivery?.status === 'Ready' && (
        <Button
          variant="default"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => navigate('/delivery-schedule')}
          className="w-full"
        >
          View Details
        </Button>
      )}
      {delivery?.status === 'Scheduled' && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/delivery-schedule')}
          className="w-full"
        >
          Manage Schedule
        </Button>
      )}
    </div>
  );
};

export default DeliveryWindowCard;