import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PrivacyControlsSection = ({ privacySettings, onTogglePrivacy, onDeleteAccount, language }) => {
  const translations = {
    en: {
      title: 'Privacy Controls',
      description: 'Manage your data and privacy preferences',
      dataSharing: 'Data Sharing',
      shareAnalytics: 'Share usage analytics',
      shareAnalyticsDesc: 'Help us improve by sharing anonymous usage data',
      shareWithBusinesses: 'Share profile with businesses',
      shareWithBusinessesDesc: 'Allow businesses to see your product preferences',
      accountVisibility: 'Account Visibility',
      publicProfile: 'Public profile',
      publicProfileDesc: 'Make your profile visible to other users',
      showVotingHistory: 'Show voting history',
      showVotingHistoryDesc: 'Display your votes on product requests',
      dangerZone: 'Danger Zone',
      deleteAccount: 'Delete Account',
      deleteAccountDesc: 'Permanently delete your account and all associated data',
      deleteButton: 'Delete My Account',
    },
    ru: {
      title: 'Настройки конфиденциальности',
      description: 'Управляйте вашими данными и настройками конфиденциальности',
      dataSharing: 'Обмен данными',
      shareAnalytics: 'Делиться аналитикой использования',
      shareAnalyticsDesc: 'Помогите нам улучшиться, делясь анонимными данными использования',
      shareWithBusinesses: 'Делиться профилем с бизнесом',
      shareWithBusinessesDesc: 'Разрешить бизнесу видеть ваши предпочтения по товарам',
      accountVisibility: 'Видимость аккаунта',
      publicProfile: 'Публичный профиль',
      publicProfileDesc: 'Сделать ваш профиль видимым для других пользователей',
      showVotingHistory: 'Показывать историю голосований',
      showVotingHistoryDesc: 'Отображать ваши голоса за запросы товаров',
      dangerZone: 'Опасная зона',
      deleteAccount: 'Удалить аккаунт',
      deleteAccountDesc: 'Навсегда удалить ваш аккаунт и все связанные данные',
      deleteButton: 'Удалить мой аккаунт',
    },
  };

  const t = translations?.[language];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Lock" size={20} color="var(--color-primary)" />
          {t?.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{t?.description}</p>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">{t?.dataSharing}</h3>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <Checkbox
                label={t?.shareAnalytics}
                description={t?.shareAnalyticsDesc}
                checked={privacySettings?.shareAnalytics}
                onChange={(e) => onTogglePrivacy('shareAnalytics', e?.target?.checked)}
              />
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <Checkbox
                label={t?.shareWithBusinesses}
                description={t?.shareWithBusinessesDesc}
                checked={privacySettings?.shareWithBusinesses}
                onChange={(e) => onTogglePrivacy('shareWithBusinesses', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium text-foreground mb-4">{t?.accountVisibility}</h3>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <Checkbox
                label={t?.publicProfile}
                description={t?.publicProfileDesc}
                checked={privacySettings?.publicProfile}
                onChange={(e) => onTogglePrivacy('publicProfile', e?.target?.checked)}
              />
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <Checkbox
                label={t?.showVotingHistory}
                description={t?.showVotingHistoryDesc}
                checked={privacySettings?.showVotingHistory}
                onChange={(e) => onTogglePrivacy('showVotingHistory', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium text-error mb-4 flex items-center gap-2">
            <Icon name="AlertTriangle" size={16} />
            {t?.dangerZone}
          </h3>
          <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">{t?.deleteAccount}</h4>
                <p className="text-xs text-muted-foreground">{t?.deleteAccountDesc}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={onDeleteAccount}
              >
                {t?.deleteButton}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControlsSection;