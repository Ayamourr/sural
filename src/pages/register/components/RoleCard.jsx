import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleCard = ({ role, isSelected, onSelect }) => {
  const roleConfig = {
    consumer: {
      icon: 'ShoppingBag',
      title: 'Consumer',
      titleRu: 'Потребитель',
      description: 'Request products, vote on demands, and receive scheduled deliveries',
      descriptionRu: 'Запрашивайте товары, голосуйте за спрос и получайте запланированные доставки',
      features: ['Product requests', 'Voting system', 'Delivery tracking'],
      featuresRu: ['Запросы товаров', 'Система голосования', 'Отслеживание доставки'],
      color: 'var(--color-primary)',
    },
    business: {
      icon: 'Briefcase',
      title: 'Business',
      titleRu: 'Бизнес',
      description: 'Access demand analytics, manage product lifecycle, and reach customers',
      descriptionRu: 'Доступ к аналитике спроса, управление жизненным циклом продукта и привлечение клиентов',
      features: ['Demand insights', 'Product management', 'Analytics dashboard'],
      featuresRu: ['Анализ спроса', 'Управление товарами', 'Панель аналитики'],
      color: 'var(--color-secondary)',
    },
    courier: {
      icon: 'Truck',
      title: 'Courier',
      titleRu: 'Курьер',
      description: 'Manage deliveries, track pickup schedules, and coordinate logistics',
      descriptionRu: 'Управляйте доставками, отслеживайте графики и координируйте логистику',
      features: ['Delivery management', 'Route optimization', 'Status updates'],
      featuresRu: ['Управление доставкой', 'Оптимизация маршрутов', 'Обновления статуса'],
      color: 'var(--color-accent)',
    },
  };

  const config = roleConfig?.[role];
  const currentLanguage = localStorage.getItem('language') || 'en';

  return (
    <button
      type="button"
      onClick={() => onSelect(role)}
      className={`relative w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-muted-foreground/30 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${config?.color}15` }}
        >
          <Icon name={config?.icon} size={24} color={config?.color} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {currentLanguage === 'ru' ? config?.titleRu : config?.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {currentLanguage === 'ru' ? config?.descriptionRu : config?.description}
          </p>
          <ul className="space-y-1">
            {(currentLanguage === 'ru' ? config?.featuresRu : config?.features)?.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Check" size={14} color={config?.color} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        {isSelected && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

export default RoleCard;