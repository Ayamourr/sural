import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentModal = ({ isOpen, onClose, deliveryFee, onConfirm, language }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const translations = {
    en: {
      paymentDetails: 'Payment Details',
      testMode: 'Test Mode - No Real Charges',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      cardHolder: 'Card Holder Name',
      deliveryFee: 'Delivery Fee',
      total: 'Total',
      cancel: 'Cancel',
      confirmPayment: 'Confirm Payment',
      processing: 'Processing...',
      testCardInfo: 'Use test card: 4242 4242 4242 4242',
    },
    ru: {
      paymentDetails: 'Детали оплаты',
      testMode: 'Тестовый режим - Без реальных списаний',
      cardNumber: 'Номер карты',
      expiryDate: 'Срок действия',
      cvv: 'CVV',
      cardHolder: 'Имя держателя карты',
      deliveryFee: 'Стоимость доставки',
      total: 'Итого',
      cancel: 'Отмена',
      confirmPayment: 'Подтвердить оплату',
      processing: 'Обработка...',
      testCardInfo: 'Используйте тестовую карту: 4242 4242 4242 4242',
    },
  };

  const t = translations?.[language];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm({
        cardNumber: cardNumber?.slice(-4),
        amount: deliveryFee,
        timestamp: new Date()?.toISOString(),
      });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {t?.paymentDetails}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-muted transition-colors duration-150 flex items-center justify-center"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="px-4 py-3 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Info" size={16} color="var(--color-accent)" />
              <p className="text-sm font-medium text-accent">{t?.testMode}</p>
            </div>
            <p className="text-xs text-muted-foreground">{t?.testCardInfo}</p>
          </div>

          <Input
            label={t?.cardNumber}
            type="text"
            placeholder="4242 4242 4242 4242"
            value={cardNumber}
            onChange={(e) => setCardNumber(e?.target?.value?.replace(/\s/g, '')?.replace(/(\d{4})/g, '$1 ')?.trim())}
            required
            maxLength={19}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t?.expiryDate}
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => {
                const value = e?.target?.value?.replace(/\D/g, '');
                if (value?.length <= 4) {
                  setExpiryDate(value?.length > 2 ? `${value?.slice(0, 2)}/${value?.slice(2)}` : value);
                }
              }}
              required
              maxLength={5}
            />

            <Input
              label={t?.cvv}
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e?.target?.value?.replace(/\D/g, ''))}
              required
              maxLength={3}
            />
          </div>

          <Input
            label={t?.cardHolder}
            type="text"
            placeholder="John Doe"
            value={cardHolder}
            onChange={(e) => setCardHolder(e?.target?.value)}
            required
          />

          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{t?.deliveryFee}</p>
              <p className="text-sm font-medium text-foreground">
                {deliveryFee?.toLocaleString('ru-RU')} ₸
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-foreground">{t?.total}</p>
              <p className="text-xl font-bold text-primary">
                {deliveryFee?.toLocaleString('ru-RU')} ₸
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={onClose}
              disabled={isProcessing}
            >
              {t?.cancel}
            </Button>
            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={isProcessing}
              iconName="CreditCard"
              iconPosition="left"
            >
              {isProcessing ? t?.processing : t?.confirmPayment}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;