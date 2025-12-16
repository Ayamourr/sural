import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionSection = ({ isSubscribed, onSubscribe }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    await onSubscribe();
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon name="Bell" size={24} color="var(--color-accent)" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">Stay Updated</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe to receive notifications about status changes, availability windows, and delivery schedules for this product.
          </p>

          <Button
            variant={isSubscribed ? "outline" : "default"}
            iconName={isSubscribed ? "BellOff" : "Bell"}
            iconPosition="left"
            onClick={handleSubscribe}
            loading={isLoading}
          >
            {isSubscribed ? 'Unsubscribe' : 'Subscribe to Updates'}
          </Button>

          {isSubscribed && (
            <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm text-accent font-medium">You're subscribed!</p>
              <p className="text-xs text-muted-foreground mt-1">
                You'll receive notifications via email and in-app alerts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;