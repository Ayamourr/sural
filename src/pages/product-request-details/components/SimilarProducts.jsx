import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarProducts = ({ products, onProductClick, onVote }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Similar Product Requests</h2>
        <Icon name="Sparkles" size={20} className="text-primary" />
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Check out these similar requests before creating a duplicate. Vote for existing products to increase their priority!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products?.map((product) => (
          <div
            key={product?.id}
            className="bg-background rounded-lg border border-border p-4 hover:border-primary/50 transition-all duration-150 cursor-pointer"
            onClick={() => onProductClick(product?.id)}
          >
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={product?.image}
                  alt={product?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-1 truncate">{product?.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{product?.category}</p>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Icon name="ThumbsUp" size={14} className="text-primary" />
                    <span className="text-xs font-medium text-foreground">{product?.votes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{product?.subscribers}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              iconName="ThumbsUp"
              iconPosition="left"
              onClick={(e) => {
                e?.stopPropagation();
                onVote(product?.id);
              }}
              className="w-full mt-3"
            >
              Vote
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;