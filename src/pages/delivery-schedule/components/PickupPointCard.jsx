import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PickupPointCard = ({ point, onViewMap, language }) => {
  const translations = {
    en: {
      viewMap: 'View Map',
      openingHours: 'Opening Hours',
      capacity: 'Capacity',
      available: 'available',
    },
    ru: {
      viewMap: 'Показать карту',
      openingHours: 'Часы работы',
      capacity: 'Вместимость',
      available: 'доступно',
    },
  };

  const t = translations?.[language];

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon name="MapPin" size={20} color="var(--color-accent)" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground mb-1">
            {point?.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {point?.address}
          </p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {t?.openingHours}: {point?.hours}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Users" size={14} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {t?.capacity}: {point?.capacity} {t?.available}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        fullWidth
        onClick={() => onViewMap(point)}
        iconName="Map"
        iconPosition="left"
      >
        {t?.viewMap}
      </Button>
    </div>
  );
};

export default PickupPointCard;