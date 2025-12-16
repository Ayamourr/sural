import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReservationSection = ({ product, onReserve }) => {
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [isReserving, setIsReserving] = useState(false);

  const handleReserve = async () => {
    setIsReserving(true);
    await onReserve(deliveryMethod);
    setTimeout(() => setIsReserving(false), 1000);
  };

  const pickupFee = 0;
  const deliveryFee = 1500;
  const totalPrice = product?.price + (deliveryMethod === 'delivery' ? deliveryFee : pickupFee);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
          <Icon name="ShoppingCart" size={24} color="var(--color-success)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Reserve This Product</h2>
          <p className="text-sm text-success">Available now!</p>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <div
          onClick={() => setDeliveryMethod('pickup')}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-150 ${
            deliveryMethod === 'pickup' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
              deliveryMethod === 'pickup' ? 'border-primary' : 'border-border'
            }`}>
              {deliveryMethod === 'pickup' && (
                <div className="w-3 h-3 rounded-full bg-primary" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-foreground">Pickup Point</h3>
                <span className="text-sm font-bold text-success">Free</span>
              </div>
              <p className="text-xs text-muted-foreground">Collect from designated pickup location during distribution window</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setDeliveryMethod('delivery')}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-150 ${
            deliveryMethod === 'delivery' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
              deliveryMethod === 'delivery' ? 'border-primary' : 'border-border'
            }`}>
              {deliveryMethod === 'delivery' && (
                <div className="w-3 h-3 rounded-full bg-primary" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-foreground">Home Delivery</h3>
                <span className="text-sm font-bold text-foreground">{deliveryFee?.toLocaleString()} KZT</span>
              </div>
              <p className="text-xs text-muted-foreground">Delivered to your doorstep within 2-3 business days</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Product Price</span>
          <span className="text-sm font-medium text-foreground">{product?.price?.toLocaleString()} KZT</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Delivery Fee</span>
          <span className="text-sm font-medium text-foreground">
            {deliveryMethod === 'delivery' ? `${deliveryFee?.toLocaleString()} KZT` : 'Free'}
          </span>
        </div>
        <div className="h-px bg-border my-3" />
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-foreground">Total</span>
          <span className="text-xl font-bold text-primary">{totalPrice?.toLocaleString()} KZT</span>
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        iconName="ShoppingCart"
        iconPosition="left"
        onClick={handleReserve}
        loading={isReserving}
        fullWidth
      >
        Reserve Now
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-4">
        <Icon name="Info" size={12} className="inline mr-1" />
        Test mode: No real payment will be processed
      </p>
    </div>
  );
};

export default ReservationSection;