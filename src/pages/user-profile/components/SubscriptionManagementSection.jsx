import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const SubscriptionManagementSection = ({ subscriptions, onToggleSubscription, onUnsubscribeAll, language }) => {
  const translations = {
    en: {
      title: 'Product Subscriptions',
      description: 'Manage your product request subscriptions and notifications',
      status: 'Status',
      notifications: 'Notifications',
      unsubscribeAll: 'Unsubscribe from All',
      noSubscriptions: 'No active subscriptions',
      subscribedOn: 'Subscribed on',
    },
    ru: {
      title: 'Подписки на товары',
      description: 'Управляйте подписками на запросы товаров и уведомлениями',
      status: 'Статус',
      notifications: 'Уведомления',
      unsubscribeAll: 'Отписаться от всех',
      noSubscriptions: 'Нет активных подписок',
      subscribedOn: 'Подписан с',
    },
  };

  const t = translations?.[language];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': case'Доступно':
        return 'var(--color-success)';
      case 'In transit': case'В пути':
        return 'var(--color-accent)';
      case 'Planned': case'Запланировано':
        return 'var(--color-warning)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="Bell" size={20} color="var(--color-primary)" />
            {t?.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{t?.description}</p>
        </div>
        {subscriptions?.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            iconName="BellOff"
            iconPosition="left"
            onClick={onUnsubscribeAll}
          >
            {t?.unsubscribeAll}
          </Button>
        )}
      </div>
      {subscriptions?.length > 0 ? (
        <div className="space-y-4">
          {subscriptions?.map((subscription) => (
            <div
              key={subscription?.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-150"
            >
              <div className="flex-1">
                <h3 className="text-sm font-medium text-foreground mb-1">{subscription?.productName}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {t?.subscribedOn} {subscription?.subscribedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Package" size={12} />
                    <span style={{ color: getStatusColor(subscription?.status) }}>
                      {subscription?.status}
                    </span>
                  </span>
                </div>
              </div>
              <Checkbox
                label={t?.notifications}
                checked={subscription?.notificationsEnabled}
                onChange={(e) => onToggleSubscription(subscription?.id, e?.target?.checked)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="BellOff" size={48} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">{t?.noSubscriptions}</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagementSection;