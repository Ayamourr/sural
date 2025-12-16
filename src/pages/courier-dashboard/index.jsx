import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import DeliveryCard from './components/DeliveryCard';
import RouteMap from './components/RouteMap';
import PerformanceMetrics from './components/PerformanceMetrics';
import DeliveryConfirmation from './components/DeliveryConfirmation';
import ScheduleCalendar from './components/ScheduleCalendar';
import CustomerCommunication from './components/CustomerCommunication';

const CourierDashboard = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('active');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCommunication, setShowCommunication] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translations = {
    en: {
      title: 'Courier Dashboard',
      activeDeliveries: 'Active Deliveries',
      completedDeliveries: 'Completed Deliveries',
      schedule: 'Schedule',
      filterAll: 'All Deliveries',
      filterPending: 'Pending Pickup',
      filterInTransit: 'In Transit',
      filterDelivered: 'Delivered',
      noDeliveries: 'No deliveries found',
      toggleMap: 'Toggle Map',
      refreshRoute: 'Refresh Route',
      updateAvailability: 'Update Availability'
    },
    ru: {
      title: 'Панель курьера',
      activeDeliveries: 'Активные доставки',
      completedDeliveries: 'Завершенные доставки',
      schedule: 'Расписание',
      filterAll: 'Все доставки',
      filterPending: 'Ожидание получения',
      filterInTransit: 'В пути',
      filterDelivered: 'Доставлено',
      noDeliveries: 'Доставки не найдены',
      toggleMap: 'Переключить карту',
      refreshRoute: 'Обновить маршрут',
      updateAvailability: 'Обновить доступность'
    }
  };

  const t = translations?.[language];

  const mockDeliveries = [
  {
    id: 1,
    orderId: 'ORD-2025-001',
    customerName: 'Айгуль Нурсултанова',
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0530897-1765819738200.png",
    customerImageAlt: 'Professional woman with dark hair in business attire smiling at camera',
    address: 'ул. Абая 150, кв. 45, Алматы, 050000',
    timeWindow: '14:00 - 16:00',
    items: 3,
    distance: 2.5,
    status: 'pending',
    priority: 'high',
    notes: 'Please call before arrival. Building has security gate.'
  },
  {
    id: 2,
    orderId: 'ORD-2025-002',
    customerName: 'Ержан Касымов',
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1577af203-1764932649558.png",
    customerImageAlt: 'Middle-aged man with short black hair wearing casual blue shirt outdoors',
    address: 'пр. Достык 240, офис 12, Алматы, 050010',
    timeWindow: '16:00 - 18:00',
    items: 1,
    distance: 5.2,
    status: 'picked_up',
    priority: 'medium',
    notes: null
  },
  {
    id: 3,
    orderId: 'ORD-2025-003',
    customerName: 'Марина Петрова',
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fbbaec9b-1765086355041.png",
    customerImageAlt: 'Young woman with blonde hair in red sweater smiling in indoor setting',
    address: 'ул. Фурманова 89, кв. 23, Алматы, 050020',
    timeWindow: '18:00 - 20:00',
    items: 5,
    distance: 8.1,
    status: 'in_transit',
    priority: 'low',
    notes: 'Leave package with security if not home.'
  },
  {
    id: 4,
    orderId: 'ORD-2025-004',
    customerName: 'Данияр Абдуллаев',
    customerImage: "https://images.unsplash.com/photo-1735045165026-c32dfa082639",
    customerImageAlt: 'Young man with short dark hair in white t-shirt against neutral background',
    address: 'мкр. Самал-2, д. 111, кв. 78, Алматы, 050051',
    timeWindow: '10:00 - 12:00',
    items: 2,
    distance: null,
    status: 'delivered',
    priority: 'medium',
    notes: null
  }];


  const mockSchedule = [
  { date: '2025-12-16', deliveries: 15, timeSlot: '09:00-18:00' },
  { date: '2025-12-17', deliveries: 12, timeSlot: '09:00-18:00' },
  { date: '2025-12-18', deliveries: 18, timeSlot: '09:00-18:00' },
  { date: '2025-12-19', deliveries: 10, timeSlot: '09:00-15:00' },
  { date: '2025-12-20', deliveries: 14, timeSlot: '09:00-18:00' }];


  const mockMetrics = {
    todayDeliveries: 12,
    todayTotal: 15,
    completionRate: 96,
    rating: 4.8,
    earnings: 8500
  };

  const mockMessages = {
    customer: {
      name: 'Айгуль Нурсултанова',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0530897-1765819738200.png",
      imageAlt: 'Professional woman with dark hair in business attire smiling at camera'
    },
    orderId: 'ORD-2025-001',
    conversation: [
    {
      sender: 'customer',
      message: 'Hello, when will you arrive?',
      timestamp: '14:25'
    },
    {
      sender: 'courier',
      message: 'I will be there in 10 minutes',
      timestamp: '14:26'
    },
    {
      sender: 'customer',
      message: 'Great, I will wait at the entrance',
      timestamp: '14:27'
    }]

  };

  const currentLocation = {
    lat: 43.2220,
    lng: 76.8512
  };

  const filterOptions = [
  { value: 'all', label: t?.filterAll },
  { value: 'pending', label: t?.filterPending },
  { value: 'in_transit', label: t?.filterInTransit },
  { value: 'delivered', label: t?.filterDelivered }];


  const getFilteredDeliveries = () => {
    let filtered = mockDeliveries;

    if (activeTab === 'active') {
      filtered = filtered?.filter((d) => d?.status !== 'delivered' && d?.status !== 'failed');
    } else if (activeTab === 'completed') {
      filtered = filtered?.filter((d) => d?.status === 'delivered' || d?.status === 'failed');
    }

    if (filterStatus !== 'all') {
      filtered = filtered?.filter((d) => d?.status === filterStatus);
    }

    return filtered;
  };

  const handleStatusUpdate = (deliveryId, action) => {
    const delivery = mockDeliveries?.find((d) => d?.id === deliveryId);
    if (delivery && action === 'next') {
      if (delivery?.status === 'in_transit') {
        setSelectedDelivery(delivery);
        setShowConfirmation(true);
      }
    }
  };

  const handleConfirmDelivery = (confirmationData) => {
    console.log('Delivery confirmed:', confirmationData);
    setShowConfirmation(false);
    setSelectedDelivery(null);
  };

  const handleNavigate = (deliveryId) => {
    const delivery = mockDeliveries?.find((d) => d?.id === deliveryId);
    if (delivery) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(delivery?.address)}`, '_blank');
    }
  };

  const handleContact = (deliveryId) => {
    const delivery = mockDeliveries?.find((d) => d?.id === deliveryId);
    if (delivery) {
      setSelectedDelivery(delivery);
      setShowCommunication(true);
    }
  };

  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
  };

  const handleViewDetails = (deliveryId) => {
    console.log('View details for delivery:', deliveryId);
  };

  const handleUpdateAvailability = () => {
    console.log('Update availability');
  };

  const filteredDeliveries = getFilteredDeliveries();

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="courier" isAuthenticated={true} />
      <main className="main-content">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{t?.title}</h1>
              <p className="text-muted-foreground">
                {new Date()?.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                iconName={showMap ? 'MapOff' : 'Map'}
                iconPosition="left"
                onClick={() => setShowMap(!showMap)}>

                {t?.toggleMap}
              </Button>
              <Button
                variant="default"
                iconName="RefreshCw"
                iconPosition="left">

                {t?.refreshRoute}
              </Button>
            </div>
          </div>

          <PerformanceMetrics metrics={mockMetrics} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="border-b border-border">
                  <div className="flex items-center">
                    <button
                      onClick={() => setActiveTab('active')}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-150 ${
                      activeTab === 'active' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
                      }>

                      {t?.activeDeliveries}
                    </button>
                    <button
                      onClick={() => setActiveTab('completed')}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-150 ${
                      activeTab === 'completed' ?
                      'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
                      }>

                      {t?.completedDeliveries}
                    </button>
                    <button
                      onClick={() => setActiveTab('schedule')}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-150 ${
                      activeTab === 'schedule' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
                      }>

                      {t?.schedule}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  {activeTab !== 'schedule' &&
                  <div className="mb-4">
                      <Select
                      options={filterOptions}
                      value={filterStatus}
                      onChange={setFilterStatus}
                      placeholder={t?.filterAll} />

                    </div>
                  }

                  {activeTab === 'schedule' ?
                  <ScheduleCalendar
                    schedule={mockSchedule}
                    onUpdateAvailability={handleUpdateAvailability} /> :


                  <div className="space-y-4">
                      {filteredDeliveries?.length > 0 ?
                    filteredDeliveries?.map((delivery) =>
                    <DeliveryCard
                      key={delivery?.id}
                      delivery={delivery}
                      onStatusUpdate={handleStatusUpdate}
                      onViewDetails={handleViewDetails}
                      onNavigate={handleNavigate}
                      onContact={handleContact} />

                    ) :

                    <div className="text-center py-12">
                          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">{t?.noDeliveries}</p>
                        </div>
                    }
                    </div>
                  }
                </div>
              </div>
            </div>

            {showMap &&
            <div className="lg:col-span-1">
                <RouteMap
                deliveries={filteredDeliveries}
                currentLocation={currentLocation} />

              </div>
            }
          </div>
        </div>
      </main>
      {showConfirmation && selectedDelivery &&
      <DeliveryConfirmation
        delivery={selectedDelivery}
        onConfirm={handleConfirmDelivery}
        onCancel={() => {
          setShowConfirmation(false);
          setSelectedDelivery(null);
        }} />

      }
      {showCommunication && selectedDelivery &&
      <CustomerCommunication
        messages={mockMessages}
        onSendMessage={handleSendMessage}
        onClose={() => {
          setShowCommunication(false);
          setSelectedDelivery(null);
        }} />

      }
    </div>);

};

export default CourierDashboard;