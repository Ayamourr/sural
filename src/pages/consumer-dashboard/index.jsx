import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QuickActionCard from './components/QuickActionCard';
import ProductRequestCard from './components/ProductRequestCard';
import DeliveryWindowCard from './components/DeliveryWindowCard';
import ActivityFeedItem from './components/ActivityFeedItem';
import StatsCard from './components/StatsCard';
import FilterBar from './components/FilterBar';
import RecommendationCard from './components/RecommendationCard';

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all'
  });
  const [activeTab, setActiveTab] = useState('all');

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
      welcome: 'Welcome back',
      dashboardTitle: 'Consumer Dashboard',
      quickActions: 'Quick Actions',
      myRequests: 'My Product Requests',
      upcomingDeliveries: 'Upcoming Deliveries',
      recentActivity: 'Recent Activity',
      recommendations: 'Recommended for You',
      viewAll: 'View All',
      noRequests: 'No product requests yet',
      noDeliveries: 'No upcoming deliveries',
      noActivity: 'No recent activity',
      createFirstRequest: 'Create your first product request',
      exploreProducts: 'Explore existing products',
      allRequests: 'All Requests',
      subscribed: 'Subscribed',
      myVotes: 'My Votes',
      totalRequests: 'Total Requests',
      activeSubscriptions: 'Active Subscriptions',
      totalVotes: 'Total Votes',
      pendingDeliveries: 'Pending Deliveries'
    },
    ru: {
      welcome: 'С возвращением',
      dashboardTitle: 'Панель потребителя',
      quickActions: 'Быстрые действия',
      myRequests: 'Мои запросы продуктов',
      upcomingDeliveries: 'Предстоящие доставки',
      recentActivity: 'Недавняя активность',
      recommendations: 'Рекомендовано для вас',
      viewAll: 'Показать все',
      noRequests: 'Пока нет запросов продуктов',
      noDeliveries: 'Нет предстоящих доставок',
      noActivity: 'Нет недавней активности',
      createFirstRequest: 'Создайте свой первый запрос продукта',
      exploreProducts: 'Изучите существующие продукты',
      allRequests: 'Все запросы',
      subscribed: 'Подписки',
      myVotes: 'Мои голоса',
      totalRequests: 'Всего запросов',
      activeSubscriptions: 'Активные подписки',
      totalVotes: 'Всего голосов',
      pendingDeliveries: 'Ожидающие доставки'
    }
  };

  const t = translations?.[language];

  const mockProductRequests = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality for immersive audio experience',
    category: 'Electronics',
    status: 'In transit',
    votes: 247,
    subscribers: 89,
    isSubscribed: true,
    hasVoted: true,
    createdAt: '2 days ago',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1119295e3-1765076790006.png",
    imageAlt: 'Black wireless over-ear headphones with cushioned ear cups on white background showing premium build quality'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life for comprehensive health insights',
    category: 'Electronics',
    status: 'Planned',
    votes: 189,
    subscribers: 56,
    isSubscribed: true,
    hasVoted: true,
    createdAt: '5 days ago',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd51548c-1764641911784.png",
    imageAlt: 'Silver smartwatch with black sport band displaying fitness metrics on OLED screen against dark background'
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    description: 'Professional ergonomic chair with lumbar support, adjustable armrests, breathable mesh back, and 360-degree swivel for all-day comfort',
    category: 'Home & Garden',
    status: 'Available',
    votes: 156,
    subscribers: 42,
    isSubscribed: false,
    hasVoted: false,
    createdAt: '1 week ago',
    image: "https://images.unsplash.com/photo-1680092919273-63c9458abaca",
    imageAlt: 'Modern black ergonomic office chair with mesh back and adjustable armrests in bright office setting'
  },
  {
    id: 4,
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches, programmable keys, aluminum frame, and anti-ghosting technology for gaming',
    category: 'Electronics',
    status: 'Planned',
    votes: 134,
    subscribers: 38,
    isSubscribed: true,
    hasVoted: false,
    createdAt: '3 days ago',
    image: "https://images.unsplash.com/photo-1679533662330-457ca8447e7d",
    imageAlt: 'RGB mechanical gaming keyboard with colorful backlight illumination showing individual key switches on dark desk'
  }];


  const mockDeliveries = [
  {
    id: 1,
    productName: 'Wireless Noise-Cancelling Headphones',
    pickupPoint: 'Mega Center Almaty, Floor 2',
    date: 'December 18, 2025',
    timeWindow: '14:00 - 18:00',
    status: 'Ready'
  },
  {
    id: 2,
    productName: 'Smart Fitness Watch',
    pickupPoint: 'Dostyk Plaza, Main Entrance',
    date: 'December 20, 2025',
    timeWindow: '10:00 - 14:00',
    status: 'Scheduled'
  }];


  const mockActivities = [
  {
    id: 1,
    type: 'status_update',
    message: 'Wireless Headphones status changed to "In transit"',
    timestamp: '2 hours ago',
    link: '/product-request-details?id=1'
  },
  {
    id: 2,
    type: 'new_vote',
    message: 'Your request "Smart Fitness Watch" received 15 new votes',
    timestamp: '5 hours ago',
    link: '/product-request-details?id=2'
  },
  {
    id: 3,
    type: 'new_product',
    message: 'New product similar to your interests: "Bluetooth Speaker"',
    timestamp: '1 day ago',
    link: '/search-results?q=bluetooth'
  },
  {
    id: 4,
    type: 'delivery',
    message: 'Delivery window scheduled for Wireless Headphones',
    timestamp: '1 day ago',
    link: '/delivery-schedule'
  }];


  const mockRecommendations = [
  {
    id: 5,
    name: 'Portable Bluetooth Speaker',
    reason: 'Based on your interest in audio products',
    votes: 98,
    subscribers: 34,
    image: "https://images.unsplash.com/photo-1691864774578-ce90082a3658",
    imageAlt: 'Compact black portable Bluetooth speaker with metallic grille and control buttons on wooden surface'
  },
  {
    id: 6,
    name: 'Wireless Charging Pad',
    reason: 'Popular in Electronics category',
    votes: 76,
    subscribers: 28,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c664a820-1764670565959.png",
    imageAlt: 'Sleek white wireless charging pad with LED indicator light on minimalist desk setup'
  },
  {
    id: 7,
    name: 'USB-C Hub Adapter',
    reason: 'Trending in your category',
    votes: 65,
    subscribers: 22,
    image: "https://images.unsplash.com/photo-1723084361651-07961a486ca0",
    imageAlt: 'Gray USB-C hub adapter with multiple ports including HDMI and USB connections on white background'
  }];


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubscribe = (requestId) => {
    console.log('Subscribed to request:', requestId);
  };

  const handleUnsubscribe = (requestId) => {
    console.log('Unsubscribed from request:', requestId);
  };

  const getFilteredRequests = () => {
    let filtered = mockProductRequests;

    if (activeTab === 'subscribed') {
      filtered = filtered?.filter((req) => req?.isSubscribed);
    } else if (activeTab === 'voted') {
      filtered = filtered?.filter((req) => req?.hasVoted);
    }

    if (filters?.search) {
      filtered = filtered?.filter((req) =>
      req?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      req?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter((req) => req?.status === filters?.status);
    }

    if (filters?.category !== 'all') {
      filtered = filtered?.filter((req) => req?.category === filters?.category);
    }

    return filtered;
  };

  const filteredRequests = getFilteredRequests();

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="consumer" isAuthenticated={true} />
      <main className="main-content">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-6 lg:py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t?.dashboardTitle}</h1>
            <p className="text-muted-foreground">{t?.welcome}, manage your product requests and deliveries</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              icon="Package"
              label={t?.totalRequests}
              value="12"
              trend="up"
              trendValue="+3" />

            <StatsCard
              icon="Bell"
              label={t?.activeSubscriptions}
              value="8"
              trend="up"
              trendValue="+2" />

            <StatsCard
              icon="ThumbsUp"
              label={t?.totalVotes}
              value="24"
              trend="up"
              trendValue="+5" />

            <StatsCard
              icon="Truck"
              label={t?.pendingDeliveries}
              value="2"
              trend="neutral"
              trendValue="" />

          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">{t?.quickActions}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickActionCard
                icon="Plus"
                title="Create New Request"
                description="Suggest a product you want to see available"
                actionText="Create Request"
                actionPath="/product-request-creation"
                variant="primary" />

              <QuickActionCard
                icon="Search"
                title="Explore Products"
                description="Browse and vote on existing product requests"
                actionText="Search Products"
                actionPath="/search-results"
                variant="default" />

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">{t?.myRequests}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => navigate('/search-results')}>

                  {t?.viewAll}
                </Button>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                    activeTab === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                    }>

                    {t?.allRequests}
                  </button>
                  <button
                    onClick={() => setActiveTab('subscribed')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                    activeTab === 'subscribed' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                    }>

                    {t?.subscribed}
                  </button>
                  <button
                    onClick={() => setActiveTab('voted')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                    activeTab === 'voted' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                    }>

                    {t?.myVotes}
                  </button>
                </div>

                <FilterBar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  language={language} />

              </div>

              {filteredRequests?.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRequests?.map((request) =>
                <ProductRequestCard
                  key={request?.id}
                  request={request}
                  onSubscribe={handleSubscribe}
                  onUnsubscribe={handleUnsubscribe} />

                )}
                </div> :

              <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t?.noRequests}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t?.createFirstRequest}</p>
                  <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/product-request-creation')}>

                    Create Request
                  </Button>
                </div>
              }
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">{t?.upcomingDeliveries}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={() => navigate('/delivery-schedule')}>

                    {t?.viewAll}
                  </Button>
                </div>

                {mockDeliveries?.length > 0 ?
                <div className="space-y-3">
                    {mockDeliveries?.map((delivery) =>
                  <DeliveryWindowCard key={delivery?.id} delivery={delivery} />
                  )}
                  </div> :

                <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <Icon name="Truck" size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{t?.noDeliveries}</p>
                  </div>
                }
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">{t?.recentActivity}</h2>
                {mockActivities?.length > 0 ?
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                    {mockActivities?.map((activity) =>
                  <ActivityFeedItem key={activity?.id} activity={activity} />
                  )}
                  </div> :

                <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <Icon name="Activity" size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{t?.noActivity}</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">{t?.recommendations}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockRecommendations?.map((product) =>
              <RecommendationCard key={product?.id} product={product} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default ConsumerDashboard;