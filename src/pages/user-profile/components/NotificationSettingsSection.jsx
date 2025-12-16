import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettingsSection = ({ settings, onToggleSetting, language }) => {
  const translations = {
    en: {
      title: 'Notification Settings',
      description: 'Manage how you receive notifications',
      emailNotifications: 'Email Notifications',
      inAppNotifications: 'In-App Notifications',
      productUpdates: 'Product Status Updates',
      productUpdatesDesc: 'Get notified when subscribed products change status',
      deliveryAlerts: 'Delivery Alerts',
      deliveryAlertsDesc: 'Notifications about delivery schedules and updates',
      votingResults: 'Voting Results',
      votingResultsDesc: 'Updates on products you voted for',
      marketingEmails: 'Marketing Emails',
      marketingEmailsDesc: 'Promotional offers and new features',
    },
    ru: {
      title: 'Настройки уведомлений',
      description: 'Управляйте способом получения уведомлений',
      emailNotifications: 'Email уведомления',
      inAppNotifications: 'Уведомления в приложении',
      productUpdates: 'Обновления статуса товаров',
      productUpdatesDesc: 'Получайте уведомления об изменении статуса подписанных товаров',
      deliveryAlerts: 'Оповещения о доставке',
      deliveryAlertsDesc: 'Уведомления о расписании и обновлениях доставки',
      votingResults: 'Результаты голосования',
      votingResultsDesc: 'Обновления по товарам, за которые вы голосовали',
      marketingEmails: 'Маркетинговые письма',
      marketingEmailsDesc: 'Рекламные предложения и новые функции',
    },
  };

  const t = translations?.[language];

  const notificationTypes = [
    {
      id: 'productUpdates',
      label: t?.productUpdates,
      description: t?.productUpdatesDesc,
      icon: 'Package',
    },
    {
      id: 'deliveryAlerts',
      label: t?.deliveryAlerts,
      description: t?.deliveryAlertsDesc,
      icon: 'Truck',
    },
    {
      id: 'votingResults',
      label: t?.votingResults,
      description: t?.votingResultsDesc,
      icon: 'ThumbsUp',
    },
    {
      id: 'marketingEmails',
      label: t?.marketingEmails,
      description: t?.marketingEmailsDesc,
      icon: 'Mail',
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Bell" size={20} color="var(--color-primary)" />
          {t?.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{t?.description}</p>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">{t?.emailNotifications}</h3>
          <div className="space-y-4">
            {notificationTypes?.map((type) => (
              <div key={`email-${type?.id}`} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name={type?.icon} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <Checkbox
                    label={type?.label}
                    description={type?.description}
                    checked={settings?.email?.[type?.id]}
                    onChange={(e) => onToggleSetting('email', type?.id, e?.target?.checked)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium text-foreground mb-4">{t?.inAppNotifications}</h3>
          <div className="space-y-4">
            {notificationTypes?.map((type) => (
              <div key={`inApp-${type?.id}`} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name={type?.icon} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <Checkbox
                    label={type?.label}
                    description={type?.description}
                    checked={settings?.inApp?.[type?.id]}
                    onChange={(e) => onToggleSetting('inApp', type?.id, e?.target?.checked)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsSection;