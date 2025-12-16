import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ formData, onFormChange, onSubmit, isLoading }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (e) => {
      setCurrentLanguage(e?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translations = {
    en: {
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Create a strong password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      termsLabel: 'I agree to the Terms of Service and Privacy Policy',
      marketingLabel: 'Send me updates about new products and features',
      registerButton: 'Create Account',
      passwordRequirements: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
      nameRequired: 'Full name is required',
      emailRequired: 'Email address is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordWeak: 'Password must be at least 8 characters',
      confirmPasswordRequired: 'Please confirm your password',
      passwordMismatch: 'Passwords do not match',
      termsRequired: 'You must agree to the terms and conditions',
    },
    ru: {
      fullName: 'Полное имя',
      fullNamePlaceholder: 'Введите ваше полное имя',
      email: 'Адрес электронной почты',
      emailPlaceholder: 'Введите ваш email',
      password: 'Пароль',
      passwordPlaceholder: 'Создайте надежный пароль',
      confirmPassword: 'Подтвердите пароль',
      confirmPasswordPlaceholder: 'Введите пароль еще раз',
      termsLabel: 'Я согласен с Условиями использования и Политикой конфиденциальности',
      marketingLabel: 'Присылайте мне обновления о новых продуктах и функциях',
      registerButton: 'Создать аккаунт',
      passwordRequirements: 'Пароль должен содержать минимум 8 символов, включая заглавные, строчные буквы и цифры',
      nameRequired: 'Полное имя обязательно',
      emailRequired: 'Адрес электронной почты обязателен',
      emailInvalid: 'Пожалуйста, введите действительный адрес электронной почты',
      passwordRequired: 'Пароль обязателен',
      passwordWeak: 'Пароль должен содержать минимум 8 символов',
      confirmPasswordRequired: 'Пожалуйста, подтвердите ваш пароль',
      passwordMismatch: 'Пароли не совпадают',
      termsRequired: 'Вы должны согласиться с условиями',
    },
  };

  const t = translations?.[currentLanguage];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = t?.nameRequired;
    }

    if (!formData?.email?.trim()) {
      newErrors.email = t?.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = t?.emailInvalid;
    }

    if (!formData?.password) {
      newErrors.password = t?.passwordRequired;
    } else if (formData?.password?.length < 8) {
      newErrors.password = t?.passwordWeak;
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = t?.confirmPasswordRequired;
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = t?.passwordMismatch;
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = t?.termsRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const handleInputChange = (field, value) => {
    onFormChange(field, value);
    if (errors?.[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label={t?.fullName}
        type="text"
        placeholder={t?.fullNamePlaceholder}
        value={formData?.fullName}
        onChange={(e) => handleInputChange('fullName', e?.target?.value)}
        error={errors?.fullName}
        required
        disabled={isLoading}
      />
      <Input
        label={t?.email}
        type="email"
        placeholder={t?.emailPlaceholder}
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <div className="relative">
        <Input
          label={t?.password}
          type={showPassword ? 'text' : 'password'}
          placeholder={t?.passwordPlaceholder}
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          description={t?.passwordRequirements}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          tabIndex={-1}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>
      <div className="relative">
        <Input
          label={t?.confirmPassword}
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder={t?.confirmPasswordPlaceholder}
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          tabIndex={-1}
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>
      <div className="space-y-3 pt-2">
        <Checkbox
          label={t?.termsLabel}
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
          disabled={isLoading}
        />

        <Checkbox
          label={t?.marketingLabel}
          checked={formData?.receiveUpdates}
          onChange={(e) => handleInputChange('receiveUpdates', e?.target?.checked)}
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {t?.registerButton}
      </Button>
    </form>
  );
};

export default RegistrationForm;