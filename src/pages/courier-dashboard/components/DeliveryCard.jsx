import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeliveryCard = ({ delivery, onStatusUpdate, onViewDetails, onNavigate, onContact }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'picked_up':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'in_transit':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'failed':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending Pickup',
      picked_up: 'Picked Up',
      in_transit: 'In Transit',
      delivered: 'Delivered',
      failed: 'Failed'
    };
    return labels?.[status] || status;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <Image
            src={delivery?.customerImage}
            alt={delivery?.customerImageAlt}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-foreground truncate">
                {delivery?.customerName}
              </h3>
              <Icon
                name="AlertCircle"
                size={16}
                className={getPriorityColor(delivery?.priority)}
              />
            </div>
            <p className="text-sm text-muted-foreground">Order #{delivery?.orderId}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(delivery?.status)}`}>
          {getStatusLabel(delivery?.status)}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground">{delivery?.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">{delivery?.timeWindow}</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Package" size={16} className="text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">{delivery?.items} items</p>
        </div>
        {delivery?.distance && (
          <div className="flex items-center gap-2">
            <Icon name="Navigation" size={16} className="text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{delivery?.distance} km away</p>
          </div>
        )}
      </div>
      {delivery?.notes && (
        <div className="bg-muted/50 rounded-md p-3 mb-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Note:</span> {delivery?.notes}
          </p>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          fullWidth
          iconName="MapPin"
          iconPosition="left"
          onClick={() => onNavigate(delivery?.id)}
        >
          Navigate
        </Button>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Phone"
          iconPosition="left"
          onClick={() => onContact(delivery?.id)}
        >
          Contact
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MoreVertical"
          onClick={() => onViewDetails(delivery?.id)}
        />
      </div>
      {delivery?.status !== 'delivered' && delivery?.status !== 'failed' && (
        <div className="mt-3 pt-3 border-t border-border">
          <Button
            variant="success"
            size="sm"
            fullWidth
            iconName="CheckCircle"
            iconPosition="left"
            onClick={() => onStatusUpdate(delivery?.id, 'next')}
          >
            {delivery?.status === 'pending' && 'Mark as Picked Up'}
            {delivery?.status === 'picked_up' && 'Mark as In Transit'}
            {delivery?.status === 'in_transit' && 'Mark as Delivered'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeliveryCard;