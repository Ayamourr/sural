import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductHeader = ({ product, onBack }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Planned':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'In Transit':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Available':
        return 'bg-success/10 text-success border-success/20';
      case 'Sold Out':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Planned':
        return 'Clock';
      case 'In Transit':
        return 'Truck';
      case 'Available':
        return 'CheckCircle';
      case 'Sold Out':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150 mb-4"
        >
          <Icon name="ArrowLeft" size={20} />
          <span className="text-sm font-medium">Back to Search</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-96 h-64 lg:h-80 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={product?.image}
              alt={product?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{product?.name}</h1>
                <p className="text-sm text-muted-foreground">Category: {product?.category}</p>
              </div>
              <div className={`px-3 py-1.5 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusColor(product?.status)}`}>
                <Icon name={getStatusIcon(product?.status)} size={16} />
                {product?.status}
              </div>
            </div>

            <p className="text-foreground leading-relaxed mb-6">{product?.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Total Votes</p>
                <p className="text-2xl font-bold text-foreground">{product?.votes}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Subscribers</p>
                <p className="text-2xl font-bold text-foreground">{product?.subscribers}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Popularity Rank</p>
                <p className="text-2xl font-bold text-primary">#{product?.rank}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Price (KZT)</p>
                <p className="text-2xl font-bold text-foreground">{product?.price?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;