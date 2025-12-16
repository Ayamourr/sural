import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeSlotCard = ({ slot, onSelect, isSelected, language }) => {
  const translations = {
    en: {
      available: 'Available',
      full: 'Full',
      spotsLeft: 'spots left',
      select: 'Select',
      selected: 'Selected',
    },
    ru: {
      available: 'Доступно',
      full: 'Заполнено',
      spotsLeft: 'мест осталось',
      select: 'Выбрать',
      selected: 'Выбрано',
    },
  };

  const t = translations?.[language];
  const isFull = slot?.availableSpots === 0;
  const isLowCapacity = slot?.availableSpots <= 3 && slot?.availableSpots > 0;

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
        isSelected
          ? 'border-primary bg-primary/5'
          : isFull
          ? 'border-border bg-muted/50 opacity-60' :'border-border bg-card hover:border-primary/50 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isFull ? 'bg-muted' : 'bg-primary/10'
            }`}
          >
            <Icon
              name="Clock"
              size={20}
              color={isFull ? 'var(--color-muted-foreground)' : 'var(--color-primary)'}
            />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">{slot?.time}</p>
            <p className="text-xs text-muted-foreground">{slot?.date}</p>
          </div>
        </div>
        {!isFull && (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isLowCapacity
                ? 'bg-warning/10 text-warning' :'bg-success/10 text-success'
            }`}
          >
            {slot?.availableSpots} {t?.spotsLeft}
          </div>
        )}
        {isFull && (
          <div className="px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
            {t?.full}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Icon name="MapPin" size={14} className="text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{slot?.location}</p>
      </div>
      <Button
        variant={isSelected ? 'default' : 'outline'}
        size="sm"
        fullWidth
        disabled={isFull}
        onClick={() => onSelect(slot)}
        iconName={isSelected ? 'Check' : 'Calendar'}
        iconPosition="left"
      >
        {isSelected ? t?.selected : t?.select}
      </Button>
    </div>
  );
};

export default TimeSlotCard;