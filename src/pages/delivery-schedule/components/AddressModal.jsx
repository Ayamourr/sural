import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddressModal = ({ isOpen, onClose, onSave, language }) => {
  const [formData, setFormData] = useState({
    label: '',
    fullName: '',
    phone: '',
    street: '',
    building: '',
    apartment: '',
    city: '',
    postalCode: '',
    instructions: '',
  });

  const translations = {
    en: {
      addAddress: 'Add Delivery Address',
      addressLabel: 'Address Label',
      labelPlaceholder: 'Home, Office, etc.',
      fullName: 'Full Name',
      phone: 'Phone Number',
      street: 'Street Address',
      building: 'Building Number',
      apartment: 'Apartment/Unit',
      city: 'City',
      postalCode: 'Postal Code',
      instructions: 'Delivery Instructions',
      instructionsPlaceholder: 'Optional delivery notes',
      cancel: 'Cancel',
      saveAddress: 'Save Address',
    },
    ru: {
      addAddress: 'Добавить адрес доставки',
      addressLabel: 'Название адреса',
      labelPlaceholder: 'Дом, Офис и т.д.',
      fullName: 'Полное имя',
      phone: 'Номер телефона',
      street: 'Улица',
      building: 'Номер дома',
      apartment: 'Квартира/Офис',
      city: 'Город',
      postalCode: 'Почтовый индекс',
      instructions: 'Инструкции по доставке',
      instructionsPlaceholder: 'Дополнительные заметки',
      cancel: 'Отмена',
      saveAddress: 'Сохранить адрес',
    },
  };

  const t = translations?.[language];

  const cityOptions = [
    { value: 'almaty', label: 'Almaty' },
    { value: 'astana', label: 'Astana' },
    { value: 'shymkent', label: 'Shymkent' },
    { value: 'karaganda', label: 'Karaganda' },
    { value: 'aktobe', label: 'Aktobe' },
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave(formData);
    setFormData({
      label: '',
      fullName: '',
      phone: '',
      street: '',
      building: '',
      apartment: '',
      city: '',
      postalCode: '',
      instructions: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {t?.addAddress}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-muted transition-colors duration-150 flex items-center justify-center"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label={t?.addressLabel}
            type="text"
            placeholder={t?.labelPlaceholder}
            value={formData?.label}
            onChange={(e) => setFormData({ ...formData, label: e?.target?.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t?.fullName}
              type="text"
              placeholder="John Doe"
              value={formData?.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e?.target?.value })}
              required
            />

            <Input
              label={t?.phone}
              type="tel"
              placeholder="+7 (XXX) XXX-XX-XX"
              value={formData?.phone}
              onChange={(e) => setFormData({ ...formData, phone: e?.target?.value })}
              required
            />
          </div>

          <Input
            label={t?.street}
            type="text"
            placeholder="Street name"
            value={formData?.street}
            onChange={(e) => setFormData({ ...formData, street: e?.target?.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t?.building}
              type="text"
              placeholder="123"
              value={formData?.building}
              onChange={(e) => setFormData({ ...formData, building: e?.target?.value })}
              required
            />

            <Input
              label={t?.apartment}
              type="text"
              placeholder="45"
              value={formData?.apartment}
              onChange={(e) => setFormData({ ...formData, apartment: e?.target?.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label={t?.city}
              options={cityOptions}
              value={formData?.city}
              onChange={(value) => setFormData({ ...formData, city: value })}
              required
            />

            <Input
              label={t?.postalCode}
              type="text"
              placeholder="050000"
              value={formData?.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e?.target?.value })}
              required
              maxLength={6}
            />
          </div>

          <Input
            label={t?.instructions}
            type="text"
            placeholder={t?.instructionsPlaceholder}
            value={formData?.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e?.target?.value })}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              {t?.cancel}
            </Button>
            <Button
              type="submit"
              variant="default"
              fullWidth
              iconName="Save"
              iconPosition="left"
            >
              {t?.saveAddress}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;