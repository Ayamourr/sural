import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import RoleCard from './components/RoleCard';
import LanguageSelector from './components/LanguageSelector';
import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    role: '',
    language: 'en',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    receiveUpdates: false,
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    setFormData((prev) => ({ ...prev, language: savedLanguage }));

    const handleLanguageChange = (e) => {
      setCurrentLanguage(e?.detail?.language);
      setFormData((prev) => ({ ...prev, language: e?.detail?.language }));
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translations = {
    en: {
      title: 'Create Your Account',
      subtitle: 'Join sur\'AL and start requesting products today',
      roleTitle: 'Choose Your Role',
      roleSubtitle: 'Select the account type that best fits your needs',
      languageTitle: 'Select Your Language',
      languageSubtitle: 'Choose your preferred interface language',
      accountTitle: 'Complete Your Profile',
      accountSubtitle: 'Fill in your details to create your account',
      nextButton: 'Continue',
      backButton: 'Back',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign in',
      successTitle: 'Account Created Successfully!',
      successMessage: 'Welcome to sur\'AL. You can now start exploring products.',
      goToDashboard: 'Go to Dashboard',
    },
    ru: {
      title: 'Создайте свой аккаунт',
      subtitle: 'Присоединяйтесь к sur\'AL и начните запрашивать товары сегодня',
      roleTitle: 'Выберите свою роль',
      roleSubtitle: 'Выберите тип аккаунта, который лучше всего соответствует вашим потребностям',
      languageTitle: 'Выберите язык',
      languageSubtitle: 'Выберите предпочитаемый язык интерфейса',
      accountTitle: 'Заполните профиль',
      accountSubtitle: 'Введите свои данные для создания аккаунта',
      nextButton: 'Продолжить',
      backButton: 'Назад',
      alreadyHaveAccount: 'Уже есть аккаунт?',
      signIn: 'Войти',
      successTitle: 'Аккаунт успешно создан!',
      successMessage: 'Добро пожаловать в sur\'AL. Теперь вы можете начать изучать товары.',
      goToDashboard: 'Перейти к панели',
    },
  };

  const t = translations?.[currentLanguage];

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleLanguageSelect = (language) => {
    setFormData((prev) => ({ ...prev, language }));
    localStorage.setItem('language', language);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language } }));
  };

  const handleNext = () => {
    if (currentStep === 0 && !formData?.role) {
      return;
    }
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      const dashboardRoutes = {
        consumer: '/consumer-dashboard',
        business: '/business-analytics',
        courier: '/courier-dashboard',
      };
      
      navigate(dashboardRoutes?.[formData?.role] || '/consumer-dashboard');
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t?.roleTitle}</h2>
              <p className="text-sm text-muted-foreground">{t?.roleSubtitle}</p>
            </div>
            <div className="space-y-4">
              <RoleCard
                role="consumer"
                isSelected={formData?.role === 'consumer'}
                onSelect={handleRoleSelect}
              />
              <RoleCard
                role="business"
                isSelected={formData?.role === 'business'}
                onSelect={handleRoleSelect}
              />
              <RoleCard
                role="courier"
                isSelected={formData?.role === 'courier'}
                onSelect={handleRoleSelect}
              />
            </div>
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleNext}
              disabled={!formData?.role}
              iconName="ArrowRight"
              iconPosition="right"
            >
              {t?.nextButton}
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t?.languageTitle}</h2>
              <p className="text-sm text-muted-foreground">{t?.languageSubtitle}</p>
            </div>
            <LanguageSelector
              selectedLanguage={formData?.language}
              onLanguageChange={handleLanguageSelect}
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={handleBack}
                iconName="ArrowLeft"
                iconPosition="left"
                className="flex-1"
              >
                {t?.backButton}
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={handleNext}
                iconName="ArrowRight"
                iconPosition="right"
                className="flex-1"
              >
                {t?.nextButton}
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t?.accountTitle}</h2>
              <p className="text-sm text-muted-foreground">{t?.accountSubtitle}</p>
            </div>
            <RegistrationForm
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              onClick={handleBack}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              {t?.backButton}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <RoleBasedHeader isAuthenticated={false} />
      <div className="main-content bg-background min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Icon name="Sparkles" size={32} color="var(--color-primary)" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t?.title}</h1>
            <p className="text-muted-foreground">{t?.subtitle}</p>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-sm p-8">
            <ProgressIndicator currentStep={currentStep} />
            {renderStepContent()}
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {t?.alreadyHaveAccount}{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary hover:underline font-medium"
              >
                {t?.signIn}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;