import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ language }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your sur\'AL account',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      loginButton: 'Sign In',
      noAccount: 'Don\'t have an account?',
      signUp: 'Sign up',
      invalidCredentials: 'Invalid email or password. Please use mock credentials.',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters'
    },
    ru: {
      title: 'Добро пожаловать',
      subtitle: 'Войдите в свой аккаунт sur\'AL',
      emailLabel: 'Электронная почта',
      emailPlaceholder: 'Введите ваш email',
      passwordLabel: 'Пароль',
      passwordPlaceholder: 'Введите ваш пароль',
      rememberMe: 'Запомнить меня',
      forgotPassword: 'Забыли пароль?',
      loginButton: 'Войти',
      noAccount: 'Нет аккаунта?',
      signUp: 'Зарегистрироваться',
      invalidCredentials: 'Неверный email или пароль. Используйте тестовые данные.',
      emailRequired: 'Email обязателен',
      emailInvalid: 'Введите корректный email адрес',
      passwordRequired: 'Пароль обязателен',
      passwordMinLength: 'Пароль должен содержать минимум 6 символов'
    }
  };

  const t = translations?.[language];

  const mockCredentials = [
    { email: 'consumer@sural.kz', password: 'consumer123', role: 'consumer' },
    { email: 'business@sural.kz', password: 'business123', role: 'business' },
    { email: 'courier@sural.kz', password: 'courier123', role: 'courier' },
    { email: 'admin@sural.kz', password: 'admin123', role: 'admin' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = t?.emailRequired;
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = t?.emailInvalid;
    }

    if (!formData?.password) {
      newErrors.password = t?.passwordRequired;
    } else if (formData?.password?.length < 6) {
      newErrors.password = t?.passwordMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e?.target?.checked
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const user = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (user) {
        localStorage.setItem('userRole', user?.role);
        localStorage.setItem('userEmail', user?.email);
        localStorage.setItem('isAuthenticated', 'true');
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        switch (user?.role) {
          case 'consumer': navigate('/consumer-dashboard');
            break;
          case 'business': navigate('/business-analytics');
            break;
          case 'courier': navigate('/courier-dashboard');
            break;
          case 'admin': navigate('/admin-panel');
            break;
          default:
            navigate('/consumer-dashboard');
        }
      } else {
        setErrors({
          submit: t?.invalidCredentials
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t?.title}</h1>
        <p className="text-muted-foreground">{t?.subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={t?.emailLabel}
          type="email"
          name="email"
          placeholder={t?.emailPlaceholder}
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        <div className="relative">
          <Input
            label={t?.passwordLabel}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={t?.passwordPlaceholder}
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label={t?.rememberMe}
            checked={formData?.rememberMe}
            onChange={handleCheckboxChange}
            disabled={isLoading}
          />
          <a
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
            onClick={(e) => {
              e?.preventDefault();
              navigate('/forgot-password');
            }}
          >
            {t?.forgotPassword}
          </a>
        </div>

        {errors?.submit && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 flex items-start gap-2">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {t?.loginButton}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t?.noAccount}{' '}
            <a
              href="/register"
              className="text-primary font-medium hover:underline"
              onClick={(e) => {
                e?.preventDefault();
                navigate('/register');
              }}
            >
              {t?.signUp}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;