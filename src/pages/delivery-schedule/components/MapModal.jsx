import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapModal = ({ isOpen, onClose, pickupPoint, language }) => {
  const translations = {
    en: {
      location: 'Location',
      address: 'Address',
      openingHours: 'Opening Hours',
      getDirections: 'Get Directions',
      close: 'Close',
    },
    ru: {
      location: 'Местоположение',
      address: 'Адрес',
      openingHours: 'Часы работы',
      getDirections: 'Получить маршрут',
      close: 'Закрыть',
    },
  };

  const t = translations?.[language];

  if (!isOpen || !pickupPoint) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {t?.location}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-muted transition-colors duration-150 flex items-center justify-center"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="h-96 bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={pickupPoint?.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${pickupPoint?.lat},${pickupPoint?.lng}&z=15&output=embed`}
          />
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {pickupPoint?.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
                <p className="text-sm text-muted-foreground">{pickupPoint?.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {t?.openingHours}: {pickupPoint?.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              {t?.close}
            </Button>
            <Button
              variant="default"
              fullWidth
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${pickupPoint?.lat},${pickupPoint?.lng}`, '_blank')}
              iconName="Navigation"
              iconPosition="left"
            >
              {t?.getDirections}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;