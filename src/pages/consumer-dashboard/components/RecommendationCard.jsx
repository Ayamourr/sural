import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="relative h-32 overflow-hidden bg-muted">
        <Image
          src={product?.image}
          alt={product?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
            Recommended
          </span>
        </div>
      </div>
      <div className="p-3">
        <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">{product?.name}</h4>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product?.reason}</p>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Icon name="ThumbsUp" size={14} color="var(--color-primary)" />
            <span className="text-xs font-medium text-foreground">{product?.votes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Users" size={14} color="var(--color-accent)" />
            <span className="text-xs font-medium text-foreground">{product?.subscribers}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="xs"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => navigate(`/product-request-details?id=${product?.id}`)}
          className="w-full"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;