import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReservedProductCard = ({ product, onSchedule, language }) => {
  const [timeLeft, setTimeLeft] = useState(product?.expiresIn);

  const translations = {
    en: {
      expiresIn: 'Expires in',
      schedulePickup: 'Schedule Pickup',
      reserved: 'Reserved',
      hours: 'hours',
      minutes: 'minutes',
    },
    ru: {
      expiresIn: 'Истекает через',
      schedulePickup: 'Запланировать получение',
      reserved: 'Зарезервировано',
      hours: 'часов',
      minutes: 'минут',
    },
  };

  const t = translations?.[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 60) return prev;
        return prev - 60;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const isUrgent = timeLeft < 7200;

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={product?.image}
            alt={product?.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-semibold text-foreground line-clamp-1">
              {product?.name}
            </h3>
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success whitespace-nowrap">
              {t?.reserved}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product?.description}
          </p>

          <div
            className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-lg ${
              isUrgent ? 'bg-warning/10' : 'bg-muted'
            }`}
          >
            <Icon
              name="Clock"
              size={16}
              color={isUrgent ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
            />
            <p
              className={`text-sm font-medium ${
                isUrgent ? 'text-warning' : 'text-muted-foreground'
              }`}
            >
              {t?.expiresIn}: {hours} {t?.hours} {minutes} {t?.minutes}
            </p>
          </div>

          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={() => onSchedule(product)}
            iconName="Calendar"
            iconPosition="left"
          >
            {t?.schedulePickup}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservedProductCard;