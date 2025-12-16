import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';

const SecuritySection = ({ onChangePassword, onToggle2FA, twoFactorEnabled, language }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const translations = {
    en: {
      title: 'Account Security',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      passwordStrength: 'Password Strength',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      save: 'Save Password',
      cancel: 'Cancel',
      twoFactor: 'Two-Factor Authentication',
      twoFactorDesc: 'Add an extra layer of security to your account',
      enable2FA: 'Enable 2FA',
      disable2FA: 'Disable 2FA',
    },
    ru: {
      title: 'Безопасность аккаунта',
      changePassword: 'Изменить пароль',
      currentPassword: 'Текущий пароль',
      newPassword: 'Новый пароль',
      confirmPassword: 'Подтвердите новый пароль',
      passwordStrength: 'Надежность пароля',
      weak: 'Слабый',
      medium: 'Средний',
      strong: 'Сильный',
      save: 'Сохранить пароль',
      cancel: 'Отмена',
      twoFactor: 'Двухфакторная аутентификация',
      twoFactorDesc: 'Добавьте дополнительный уровень безопасности к вашему аккаунту',
      enable2FA: 'Включить 2FA',
      disable2FA: 'Отключить 2FA',
    },
  };

  const t = translations?.[language];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (password?.length >= 12) strength += 25;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) strength += 25;
    if (/\d/?.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/?.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e?.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordData?.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordData?.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordData?.newPassword?.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSavePassword = () => {
    const newErrors = validatePasswordForm();
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }
    onChangePassword(passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordStrength(0);
    setIsChangingPassword(false);
  };

  const handleCancelPassword = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordStrength(0);
    setErrors({});
    setIsChangingPassword(false);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'var(--color-error)';
    if (passwordStrength < 70) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  const getStrengthLabel = () => {
    if (passwordStrength < 40) return t?.weak;
    if (passwordStrength < 70) return t?.medium;
    return t?.strong;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Shield" size={20} color="var(--color-primary)" />
        <h2 className="text-lg font-semibold text-foreground">{t?.title}</h2>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">{t?.changePassword}</h3>
          {!isChangingPassword && (
            <Button
              variant="outline"
              size="sm"
              iconName="Key"
              iconPosition="left"
              onClick={() => setIsChangingPassword(true)}
            >
              {t?.changePassword}
            </Button>
          )}
        </div>

        {isChangingPassword && (
          <div className="space-y-4">
            <Input
              label={t?.currentPassword}
              name="currentPassword"
              type="password"
              value={passwordData?.currentPassword}
              onChange={handlePasswordChange}
              error={errors?.currentPassword}
              required
            />

            <Input
              label={t?.newPassword}
              name="newPassword"
              type="password"
              value={passwordData?.newPassword}
              onChange={handlePasswordChange}
              error={errors?.newPassword}
              required
            />

            {passwordData?.newPassword && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{t?.passwordStrength}</span>
                  <span className="text-xs font-medium" style={{ color: getStrengthColor() }}>
                    {getStrengthLabel()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${passwordStrength}%`,
                      backgroundColor: getStrengthColor(),
                    }}
                  />
                </div>
              </div>
            )}

            <Input
              label={t?.confirmPassword}
              name="confirmPassword"
              type="password"
              value={passwordData?.confirmPassword}
              onChange={handlePasswordChange}
              error={errors?.confirmPassword}
              required
            />

            <div className="flex items-center gap-3">
              <Button
                variant="default"
                iconName="Check"
                iconPosition="left"
                onClick={handleSavePassword}
              >
                {t?.save}
              </Button>
              <Button
                variant="outline"
                iconName="X"
                iconPosition="left"
                onClick={handleCancelPassword}
              >
                {t?.cancel}
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-border pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground mb-1">{t?.twoFactor}</h3>
            <p className="text-xs text-muted-foreground">{t?.twoFactorDesc}</p>
          </div>
          <Button
            variant={twoFactorEnabled ? 'outline' : 'default'}
            size="sm"
            iconName={twoFactorEnabled ? 'ShieldOff' : 'ShieldCheck'}
            iconPosition="left"
            onClick={onToggle2FA}
          >
            {twoFactorEnabled ? t?.disable2FA : t?.enable2FA}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;