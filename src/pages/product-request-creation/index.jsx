import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CategorySelector from './components/CategorySelector';
import ImageUploader from './components/ImageUploader';
import AIAssistant from './components/AIAssistant';
import RequestPreview from './components/RequestPreview';
import FormProgress from './components/FormProgress';

const ProductRequestCreation = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    image: null
  });

  const [errors, setErrors] = useState({});
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    setCharacterCount(formData?.description?.length);
  }, [formData?.description]);

  const translations = {
    en: {
      title: 'Create Product Request',
      subtitle: 'Suggest a product you want to see available in Kazakhstan',
      productName: 'Product Name',
      productNamePlaceholder: 'e.g., Wireless Noise-Cancelling Headphones',
      productNameDescription: 'Enter a clear and specific product name',
      description: 'Product Description',
      descriptionPlaceholder: `Describe the product in detail...\n\nInclude:\n• Key features you're looking for\n• Preferred brands or specifications\n• Why you need this product\n• Any additional requirements`,
      descriptionDescription: 'Provide detailed information to help businesses understand your needs',characterLimit: 'characters',minCharacters: 'Minimum 50 characters required',next: 'Next: Review',back: 'Back to Dashboard',cancel: 'Cancel',requiredField: 'This field is required',minLength: 'Description must be at least 50 characters',maxLength: 'Description cannot exceed 1000 characters',successTitle: 'Request Submitted Successfully!',successMessage: 'Your product request has been created and is now visible to the community.',viewRequest: 'View My Request',createAnother: 'Create Another Request',backToDashboard: 'Back to Dashboard'
    },
    ru: {
      title: 'Создать запрос продукта',subtitle: 'Предложите продукт, который вы хотите видеть доступным в Казахстане',productName: 'Название продукта',productNamePlaceholder: 'например, Беспроводные наушники с шумоподавлением',productNameDescription: 'Введите четкое и конкретное название продукта',description: 'Описание продукта',descriptionPlaceholder: `Опишите продукт подробно...\n\nВключите:\n• Ключевые функции, которые вы ищете\n• Предпочитаемые бренды или спецификации\n• Почему вам нужен этот продукт\n• Любые дополнительные требования`,descriptionDescription: 'Предоставьте подробную информацию, чтобы помочь бизнесу понять ваши потребности',characterLimit: 'символов',minCharacters: 'Требуется минимум 50 символов',next: 'Далее: Просмотр',back: 'Назад к панели',cancel: 'Отмена',requiredField: 'Это поле обязательно',minLength: 'Описание должно содержать не менее 50 символов',maxLength: 'Описание не может превышать 1000 символов',successTitle: 'Запрос успешно отправлен!',successMessage: 'Ваш запрос продукта создан и теперь виден сообществу.',viewRequest: 'Посмотреть мой запрос',createAnother: 'Создать еще запрос',backToDashboard: 'Назад к панели'
    }
  };

  const t = translations?.[language] || translations?.en;

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.productName?.trim()) {
      newErrors.productName = t?.requiredField;
    }

    if (!formData?.category) {
      newErrors.category = t?.requiredField;
    }

    if (!formData?.description?.trim()) {
      newErrors.description = t?.requiredField;
    } else if (formData?.description?.trim()?.length < 50) {
      newErrors.description = t?.minLength;
    } else if (formData?.description?.trim()?.length > 1000) {
      newErrors.description = t?.maxLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAISuggestion = (suggestion) => {
    const currentDescription = formData?.description;
    const newDescription = currentDescription 
      ? `${currentDescription}\n\n${suggestion}`
      : suggestion;
    
    handleInputChange('description', newDescription);
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleViewRequest = () => {
    navigate('/product-request-details?id=new');
  };

  const handleCreateAnother = () => {
    setFormData({
      productName: '',
      category: '',
      description: '',
      image: null
    });
    setErrors({});
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    navigate('/consumer-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="consumer" isAuthenticated={true} />
      <main className="main-content">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {currentStep !== 3 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">{t?.title}</h1>
                <p className="text-muted-foreground">{t?.subtitle}</p>
              </div>

              <FormProgress currentStep={currentStep} totalSteps={2} language={language} />
            </>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                  <Input
                    label={t?.productName}
                    type="text"
                    placeholder={t?.productNamePlaceholder}
                    description={t?.productNameDescription}
                    value={formData?.productName}
                    onChange={(e) => handleInputChange('productName', e?.target?.value)}
                    error={errors?.productName}
                    required
                  />

                  <CategorySelector
                    value={formData?.category}
                    onChange={(value) => handleInputChange('category', value)}
                    error={errors?.category}
                    language={language}
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      {t?.description} <span className="text-error">*</span>
                    </label>
                    <p className="text-xs text-muted-foreground">{t?.descriptionDescription}</p>
                    <textarea
                      placeholder={t?.descriptionPlaceholder}
                      value={formData?.description}
                      onChange={(e) => handleInputChange('description', e?.target?.value)}
                      rows={8}
                      className={`w-full px-3 py-2 rounded-md border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-150 resize-none ${
                        errors?.description ? 'border-error' : 'border-input'
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        {errors?.description && (
                          <p className="text-xs text-error flex items-center gap-1">
                            <Icon name="AlertCircle" size={12} />
                            {errors?.description}
                          </p>
                        )}
                      </div>
                      <p className={`text-xs ${
                        characterCount < 50 
                          ? 'text-error' 
                          : characterCount > 900 
                          ? 'text-warning' :'text-muted-foreground'
                      }`}>
                        {characterCount}/1000 {t?.characterLimit}
                        {characterCount < 50 && ` (${t?.minCharacters})`}
                      </p>
                    </div>
                  </div>

                  <ImageUploader
                    value={formData?.image}
                    onChange={(value) => handleInputChange('image', value)}
                    error={errors?.image}
                    language={language}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="ArrowLeft"
                    iconPosition="left"
                    onClick={handleBackToDashboard}
                  >
                    {t?.back}
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={handleNext}
                  >
                    {t?.next}
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <AIAssistant
                    productName={formData?.productName}
                    description={formData?.description}
                    category={formData?.category}
                    onSuggestion={handleAISuggestion}
                    language={language}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto">
              <RequestPreview
                formData={formData}
                onEdit={handleBack}
                onSubmit={handleSubmit}
                language={language}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={48} className="text-success" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-3">{t?.successTitle}</h2>
                <p className="text-muted-foreground">{t?.successMessage}</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">{t?.productName}</span>
                  <span className="text-sm font-semibold text-foreground">{formData?.productName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Status</span>
                  <div className="px-3 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium">
                    {language === 'en' ? 'Pending Review' : 'На рассмотрении'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Eye"
                  iconPosition="left"
                  onClick={handleViewRequest}
                >
                  {t?.viewRequest}
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleCreateAnother}
                >
                  {t?.createAnother}
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Home"
                  iconPosition="left"
                  onClick={handleBackToDashboard}
                >
                  {t?.backToDashboard}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductRequestCreation;