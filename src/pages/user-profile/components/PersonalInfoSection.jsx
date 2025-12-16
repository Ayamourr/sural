import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalInfoSection = ({ userData, onSave, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name,
    email: userData?.email,
    phone: userData?.phone,
    address: userData?.address,
  });
  const [errors, setErrors] = useState({});

  const translations = {
    en: {
      title: 'Personal Information',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Delivery Address',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      phonePlaceholder: '+7 (XXX) XXX-XX-XX',
      addressPlaceholder: 'Enter your delivery address',
    },
    ru: {
      title: 'Личная информация',
      fullName: 'Полное имя',
      email: 'Электронная почта',
      phone: 'Номер телефона',
      address: 'Адрес доставки',
      edit: 'Редактировать',
      save: 'Сохранить изменения',
      cancel: 'Отмена',
      namePlaceholder: 'Введите ваше полное имя',
      emailPlaceholder: 'Введите вашу электронную почту',
      phonePlaceholder: '+7 (XXX) XXX-XX-XX',
      addressPlaceholder: 'Введите адрес доставки',
    },
  };

  const t = translations?.[language];

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) newErrors.email = 'Invalid email format';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
      address: userData?.address,
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="User" size={20} color="var(--color-primary)" />
          {t?.title}
        </h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            {t?.edit}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t?.fullName}
          name="name"
          type="text"
          placeholder={t?.namePlaceholder}
          value={formData?.name}
          onChange={handleChange}
          error={errors?.name}
          disabled={!isEditing}
          required
        />

        <Input
          label={t?.email}
          name="email"
          type="email"
          placeholder={t?.emailPlaceholder}
          value={formData?.email}
          onChange={handleChange}
          error={errors?.email}
          disabled={!isEditing}
          required
        />

        <Input
          label={t?.phone}
          name="phone"
          type="tel"
          placeholder={t?.phonePlaceholder}
          value={formData?.phone}
          onChange={handleChange}
          error={errors?.phone}
          disabled={!isEditing}
          required
        />

        <Input
          label={t?.address}
          name="address"
          type="text"
          placeholder={t?.addressPlaceholder}
          value={formData?.address}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      {isEditing && (
        <div className="flex items-center gap-3 mt-6">
          <Button
            variant="default"
            iconName="Check"
            iconPosition="left"
            onClick={handleSave}
          >
            {t?.save}
          </Button>
          <Button
            variant="outline"
            iconName="X"
            iconPosition="left"
            onClick={handleCancel}
          >
            {t?.cancel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoSection;