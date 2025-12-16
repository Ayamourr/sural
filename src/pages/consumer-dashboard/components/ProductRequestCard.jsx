import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';


const ProductRequestCard = ({ request, onSubscribe, onUnsubscribe }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planned':
        return 'bg-accent/10 text-accent';
      case 'In transit':
        return 'bg-warning/10 text-warning';
      case 'Available':
        return 'bg-success/10 text-success';
      case 'Sold out':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleSubscribeToggle = (e) => {
    e?.stopPropagation();
    if (request?.isSubscribed) {
      onUnsubscribe(request?.id);
    } else {
      onSubscribe(request?.id);
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => navigate(`/product-request-details?id=${request?.id}`)}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={request?.image}
          alt={request?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={handleSubscribeToggle}
            className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors duration-150"
            aria-label={request?.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
          >
            <Icon 
              name={request?.isSubscribed ? 'Bell' : 'BellOff'} 
              size={20} 
              color={request?.isSubscribed ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
            />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">{request?.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(request?.status)}`}>
            {request?.status}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{request?.description}</p>

        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Icon name="ThumbsUp" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">{request?.votes}</span>
            <span className="text-xs text-muted-foreground">votes</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Users" size={16} color="var(--color-accent)" />
            <span className="text-sm font-medium text-foreground">{request?.subscribers}</span>
            <span className="text-xs text-muted-foreground">subscribers</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Tag" size={14} />
          <span>{request?.category}</span>
          <span>•</span>
          <span>{request?.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductRequestCard;