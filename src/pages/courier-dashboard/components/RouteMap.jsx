import React from 'react';
import Icon from '../../../components/AppIcon';

const RouteMap = ({ deliveries, currentLocation }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Delivery Route</h3>
          <div className="flex items-center gap-2">
            <Icon name="Navigation" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">Live Tracking</span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[400px] lg:h-[600px]">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Delivery Route Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${currentLocation?.lat},${currentLocation?.lng}&z=14&output=embed`}
          className="border-0"
        />
        
        <div className="absolute top-4 left-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Route Overview</span>
            <span className="text-xs text-muted-foreground">{deliveries?.length} stops</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="text-sm font-semibold text-foreground">24.5 km</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Est. Time</p>
              <p className="text-sm font-semibold text-foreground">2h 15m</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fuel Cost</p>
              <p className="text-sm font-semibold text-foreground">₸850</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="MapPin" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Next Stop</p>
              <p className="text-xs text-muted-foreground truncate">
                {deliveries?.[0]?.address || 'No pending deliveries'}
              </p>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;