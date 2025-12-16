import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import TimeSlotCard from './components/TimeSlotCard';
import ReservedProductCard from './components/ReservedProductCard';
import DeliveryOptionCard from './components/DeliveryOptionCard';
import PickupPointCard from './components/PickupPointCard';
import PaymentModal from './components/PaymentModal';
import AddressModal from './components/AddressModal';
import MapModal from './components/MapModal';

const DeliverySchedule = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [activeTab, setActiveTab] = useState('pickup');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = (event) => {
      setLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translations = {
    en: {
      title: 'Delivery Schedule',
      description: 'Schedule your pickup or delivery',
      pickupTab: 'Pickup',
      deliveryTab: 'Home Delivery',
      reservedProducts: 'Reserved Products',
      noReservedProducts: 'No reserved products',
      selectDate: 'Select Date',
      availableTimeSlots: 'Available Time Slots',
      noTimeSlotsAvailable: 'No time slots available for this date',
      pickupPoints: 'Pickup Points',
      deliveryOptions: 'Delivery Options',
      savedAddresses: 'Saved Addresses',
      addNewAddress: 'Add New Address',
      confirmSchedule: 'Confirm Schedule',
      schedulePickup: 'Schedule Pickup',
      proceedToPayment: 'Proceed to Payment',
      selectTimeSlot: 'Please select a time slot',
      selectDeliveryOption: 'Please select a delivery option',
      selectAddress: 'Please select or add a delivery address',
      successTitle: 'Schedule Confirmed',
      successMessage: 'Your pickup has been scheduled successfully',
      paymentSuccessTitle: 'Payment Successful',
      paymentSuccessMessage: 'Your delivery has been scheduled',
      ok: 'OK'
    },
    ru: {
      title: 'Расписание доставки',
      description: 'Запланируйте получение или доставку',
      pickupTab: 'Самовывоз',
      deliveryTab: 'Доставка на дом',
      reservedProducts: 'Зарезервированные товары',
      noReservedProducts: 'Нет зарезервированных товаров',
      selectDate: 'Выберите дату',
      availableTimeSlots: 'Доступные временные слоты',
      noTimeSlotsAvailable: 'Нет доступных временных слотов на эту дату',
      pickupPoints: 'Пункты выдачи',
      deliveryOptions: 'Варианты доставки',
      savedAddresses: 'Сохраненные адреса',
      addNewAddress: 'Добавить новый адрес',
      confirmSchedule: 'Подтвердить расписание',
      schedulePickup: 'Запланировать получение',
      proceedToPayment: 'Перейти к оплате',
      selectTimeSlot: 'Пожалуйста, выберите временной слот',
      selectDeliveryOption: 'Пожалуйста, выберите вариант доставки',
      selectAddress: 'Пожалуйста, выберите или добавьте адрес доставки',
      successTitle: 'Расписание подтверждено',
      successMessage: 'Ваше получение успешно запланировано',
      paymentSuccessTitle: 'Оплата успешна',
      paymentSuccessMessage: 'Ваша доставка запланирована',
      ok: 'ОК'
    }
  };

  const t = translations?.[language];

  const mockReservedProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1119295e3-1765076790006.png",
    imageAlt: 'Black wireless over-ear headphones with cushioned ear cups on white background',
    expiresIn: 86400
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with advanced sensors',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d26f8cdb-1765113715116.png",
    imageAlt: 'Modern black smartwatch with digital display showing fitness metrics on wrist',
    expiresIn: 43200
  }];


  const mockTimeSlots = [
  {
    id: 1,
    date: '2025-12-18',
    time: '09:00 - 11:00',
    availableSpots: 8,
    location: 'Central Pickup Point'
  },
  {
    id: 2,
    date: '2025-12-18',
    time: '11:00 - 13:00',
    availableSpots: 2,
    location: 'Central Pickup Point'
  },
  {
    id: 3,
    date: '2025-12-18',
    time: '14:00 - 16:00',
    availableSpots: 0,
    location: 'Central Pickup Point'
  },
  {
    id: 4,
    date: '2025-12-18',
    time: '16:00 - 18:00',
    availableSpots: 12,
    location: 'Central Pickup Point'
  }];


  const mockPickupPoints = [
  {
    id: 1,
    name: 'Central Pickup Point',
    address: 'Abay Avenue 150, Almaty, Kazakhstan',
    hours: '09:00 - 20:00',
    capacity: 50,
    lat: 43.2220,
    lng: 76.8512
  },
  {
    id: 2,
    name: 'East District Center',
    address: 'Dostyk Avenue 234, Almaty, Kazakhstan',
    hours: '10:00 - 19:00',
    capacity: 30,
    lat: 43.2380,
    lng: 76.9450
  },
  {
    id: 3,
    name: 'West Mall Location',
    address: 'Rozybakiev Street 289, Almaty, Kazakhstan',
    hours: '09:00 - 21:00',
    capacity: 40,
    lat: 43.2567,
    lng: 76.9286
  }];


  const mockDeliveryOptions = [
  {
    id: 1,
    name: language === 'en' ? 'Standard Delivery' : 'Стандартная доставка',
    description: language === 'en' ? 'Delivery within 3-5 business days' : 'Доставка в течение 3-5 рабочих дней',
    price: 1500,
    estimatedDays: 5,
    icon: 'Truck'
  },
  {
    id: 2,
    name: language === 'en' ? 'Express Delivery' : 'Экспресс доставка',
    description: language === 'en' ? 'Next day delivery service' : 'Доставка на следующий день',
    price: 3000,
    estimatedDays: 1,
    icon: 'Zap'
  }];


  const availableDates = [
  { value: '2025-12-18', label: language === 'en' ? 'Wednesday, Dec 18' : 'Среда, 18 дек' },
  { value: '2025-12-19', label: language === 'en' ? 'Thursday, Dec 19' : 'Четверг, 19 дек' },
  { value: '2025-12-20', label: language === 'en' ? 'Friday, Dec 20' : 'Пятница, 20 дек' },
  { value: '2025-12-21', label: language === 'en' ? 'Saturday, Dec 21' : 'Суббота, 21 дек' }];


  const handleScheduleProduct = (product) => {
    setActiveTab('pickup');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleConfirmPickup = () => {
    if (!selectedTimeSlot) {
      alert(t?.selectTimeSlot);
      return;
    }

    alert(`${t?.successTitle}\n\n${t?.successMessage}`);
    navigate('/consumer-dashboard');
  };

  const handleProceedToPayment = () => {
    if (!selectedDeliveryOption) {
      alert(t?.selectDeliveryOption);
      return;
    }
    if (!selectedAddress) {
      alert(t?.selectAddress);
      return;
    }

    setIsPaymentModalOpen(true);
  };

  const handlePaymentConfirm = (paymentData) => {
    setIsPaymentModalOpen(false);
    alert(`${t?.paymentSuccessTitle}\n\n${t?.paymentSuccessMessage}`);
    navigate('/consumer-dashboard');
  };

  const handleSaveAddress = (addressData) => {
    const newAddress = {
      id: Date.now(),
      ...addressData
    };
    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddress(newAddress);
    setIsAddressModalOpen(false);
  };

  const handleViewMap = (point) => {
    setSelectedPickupPoint(point);
    setIsMapModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{t?.title} - sur'AL</title>
        <meta name="description" content={t?.description} />
      </Helmet>
      <RoleBasedHeader userRole="consumer" isAuthenticated={true} />
      <div className="main-content bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button
              onClick={() => navigate('/consumer-dashboard')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150 mb-4">

              <Icon name="ArrowLeft" size={20} />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>

            <h1 className="text-3xl font-bold text-foreground mb-2">{t?.title}</h1>
            <p className="text-muted-foreground">{t?.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t?.reservedProducts}
                </h2>
                {mockReservedProducts?.length > 0 ?
                <div className="space-y-4">
                    {mockReservedProducts?.map((product) =>
                  <ReservedProductCard
                    key={product?.id}
                    product={product}
                    onSchedule={handleScheduleProduct}
                    language={language} />

                  )}
                  </div> :

                <div className="text-center py-12">
                    <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">{t?.noReservedProducts}</p>
                  </div>
                }
              </div>

              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="border-b border-border">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('pickup')}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-150 ${
                      activeTab === 'pickup' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                      }>

                      <Icon name="MapPin" size={18} className="inline-block mr-2" />
                      {t?.pickupTab}
                    </button>
                    <button
                      onClick={() => setActiveTab('delivery')}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-150 ${
                      activeTab === 'delivery' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                      }>

                      <Icon name="Home" size={18} className="inline-block mr-2" />
                      {t?.deliveryTab}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'pickup' &&
                  <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          {t?.selectDate}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {availableDates?.map((date) =>
                        <button
                          key={date?.value}
                          onClick={() => setSelectedDate(date?.value)}
                          className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          selectedDate === date?.value ?
                          'border-primary bg-primary/5 text-primary' : 'border-border bg-card text-foreground hover:border-primary/50'}`
                          }>

                              {date?.label}
                            </button>
                        )}
                        </div>
                      </div>

                      {selectedDate &&
                    <div>
                          <h3 className="text-lg font-semibold text-foreground mb-4">
                            {t?.availableTimeSlots}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {mockTimeSlots?.map((slot) =>
                        <TimeSlotCard
                          key={slot?.id}
                          slot={slot}
                          onSelect={setSelectedTimeSlot}
                          isSelected={selectedTimeSlot?.id === slot?.id}
                          language={language} />

                        )}
                          </div>
                        </div>
                    }

                      {selectedTimeSlot &&
                    <Button
                      variant="default"
                      size="lg"
                      fullWidth
                      onClick={handleConfirmPickup}
                      iconName="Check"
                      iconPosition="left">

                          {t?.confirmSchedule}
                        </Button>
                    }
                    </div>
                  }

                  {activeTab === 'delivery' &&
                  <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          {t?.deliveryOptions}
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {mockDeliveryOptions?.map((option) =>
                        <DeliveryOptionCard
                          key={option?.id}
                          option={option}
                          onSelect={setSelectedDeliveryOption}
                          isSelected={selectedDeliveryOption?.id === option?.id}
                          language={language} />

                        )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-foreground">
                            {t?.savedAddresses}
                          </h3>
                          <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsAddressModalOpen(true)}
                          iconName="Plus"
                          iconPosition="left">

                            {t?.addNewAddress}
                          </Button>
                        </div>

                        {savedAddresses?.length > 0 ?
                      <div className="space-y-3">
                            {savedAddresses?.map((address) =>
                        <button
                          key={address?.id}
                          onClick={() => setSelectedAddress(address)}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                          selectedAddress?.id === address?.id ?
                          'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'}`
                          }>

                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-foreground mb-1">
                                      {address?.label}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {address?.street}, {address?.building}
                                      {address?.apartment && `, ${address?.apartment}`}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {address?.city}, {address?.postalCode}
                                    </p>
                                  </div>
                                  {selectedAddress?.id === address?.id &&
                            <Icon name="Check" size={20} color="var(--color-primary)" />
                            }
                                </div>
                              </button>
                        )}
                          </div> :

                      <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                            <Icon name="MapPin" size={32} className="mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-4">
                              No saved addresses
                            </p>
                            <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsAddressModalOpen(true)}
                          iconName="Plus"
                          iconPosition="left">

                              {t?.addNewAddress}
                            </Button>
                          </div>
                      }
                      </div>

                      {selectedDeliveryOption && selectedAddress &&
                    <Button
                      variant="default"
                      size="lg"
                      fullWidth
                      onClick={handleProceedToPayment}
                      iconName="CreditCard"
                      iconPosition="left">

                          {t?.proceedToPayment}
                        </Button>
                    }
                    </div>
                  }
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t?.pickupPoints}
                </h3>
                <div className="space-y-3">
                  {mockPickupPoints?.map((point) =>
                  <PickupPointCard
                    key={point?.id}
                    point={point}
                    onViewMap={handleViewMap}
                    language={language} />

                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        deliveryFee={selectedDeliveryOption?.price || 0}
        onConfirm={handlePaymentConfirm}
        language={language} />

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={handleSaveAddress}
        language={language} />

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        pickupPoint={selectedPickupPoint}
        language={language} />

    </>);

};

export default DeliverySchedule;