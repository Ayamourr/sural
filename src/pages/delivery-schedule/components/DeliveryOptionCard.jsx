import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryOptionCard = ({ option, onSelect, isSelected, language }) => {
  const translations = {
    en: {
      free: 'Free',
      select: 'Select',
      selected: 'Selected',
      estimatedTime: 'Estimated time',
      days: 'days',
    },
    ru: {
      free: 'Бесплатно',
      select: 'Выбрать',
      selected: 'Выбрано',
      estimatedTime: 'Ожидаемое время',
      days: 'дней',
    },
  };

  const t = translations?.[language];

  return (
    <div
      className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
      }`}
      onClick={() => onSelect(option)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isSelected ? 'bg-primary/20' : 'bg-primary/10'
            }`}
          >
            <Icon
              name={option?.icon}
              size={24}
              color="var(--color-primary)"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {option?.name}
            </h3>
            <p className="text-sm text-muted-foreground">{option?.description}</p>
          </div>
        </div>
        {isSelected && (
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {t?.estimatedTime}: {option?.estimatedDays} {t?.days}
          </p>
        </div>
        <p className="text-xl font-bold text-foreground">
          {option?.price === 0 ? t?.free : `${option?.price?.toLocaleString('ru-RU')} ₸`}
        </p>
      </div>
      <Button
        variant={isSelected ? 'default' : 'outline'}
        size="default"
        fullWidth
        iconName={isSelected ? 'Check' : option?.icon}
        iconPosition="left"
      >
        {isSelected ? t?.selected : t?.select}
      </Button>
    </div>
  );
};

export default DeliveryOptionCard;