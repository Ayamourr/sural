import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoSection from './components/PersonalInfoSection';
import LanguagePreferenceSection from './components/LanguagePreferenceSection';
import SubscriptionManagementSection from './components/SubscriptionManagementSection';
import VotingHistorySection from './components/VotingHistorySection';
import SecuritySection from './components/SecuritySection';
import NotificationSettingsSection from './components/NotificationSettingsSection';
import OrderHistorySection from './components/OrderHistorySection';
import PrivacyControlsSection from './components/PrivacyControlsSection';

const UserProfile = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('profile');

  const [userData, setUserData] = useState({
    name: "Алексей Иванов",
    email: "alexey.ivanov@example.com",
    phone: "+7 (701) 234-56-78",
    address: "ул. Абая 150, Алматы, Казахстан",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ba34aa03-1763294059493.png",
    avatarAlt: "Professional headshot of young Kazakh man with short dark hair wearing navy blue business suit and white shirt",
    memberSince: "15/03/2024",
    profileCompletion: 85
  });

  const [subscriptions, setSubscriptions] = useState([
  {
    id: 1,
    productName: "Беспроводные наушники Sony WH-1000XM5",
    subscribedDate: "10/12/2025",
    status: "В пути",
    notificationsEnabled: true
  },
  {
    id: 2,
    productName: "Умные часы Apple Watch Series 9",
    subscribedDate: "05/12/2025",
    status: "Доступно",
    notificationsEnabled: true
  },
  {
    id: 3,
    productName: "Механическая клавиатура Keychron K8",
    subscribedDate: "28/11/2025",
    status: "Запланировано",
    notificationsEnabled: false
  }]
  );

  const [votingHistory, setVotingHistory] = useState([
  {
    id: 1,
    productName: "Беспроводные наушники Sony WH-1000XM5",
    productImage: "https://img.rocket.new/generatedImages/rocket_gen_img_13e126511-1765030295691.png",
    productImageAlt: "Black Sony wireless noise-cancelling headphones with silver accents on white background",
    votedDate: "10/12/2025",
    currentStatus: "В пути",
    totalVotes: 247
  },
  {
    id: 2,
    productName: "Умные часы Apple Watch Series 9",
    productImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1889135d6-1764680248899.png",
    productImageAlt: "Silver Apple Watch with black sport band displaying colorful watch face on white surface",
    votedDate: "05/12/2025",
    currentStatus: "Доступно",
    totalVotes: 189
  },
  {
    id: 3,
    productName: "Портативная колонка JBL Charge 5",
    productImage: "https://img.rocket.new/generatedImages/rocket_gen_img_116019093-1765274487348.png",
    productImageAlt: "Blue JBL portable Bluetooth speaker with fabric mesh exterior on wooden table",
    votedDate: "28/11/2025",
    currentStatus: "Запланировано",
    totalVotes: 156
  },
  {
    id: 4,
    productName: "Электронная книга Kindle Paperwhite",
    productImage: "https://images.unsplash.com/photo-1663103861296-285c64032eb6",
    productImageAlt: "Black Amazon Kindle e-reader displaying book cover on white background",
    votedDate: "20/11/2025",
    currentStatus: "Доступно",
    totalVotes: 134
  }]
  );

  const [orders, setOrders] = useState([
  {
    id: 1,
    productName: "Беспроводная мышь Logitech MX Master 3S",
    productImage: "https://images.unsplash.com/photo-1652180690327-b6f05e6ed7d9",
    productImageAlt: "Black Logitech wireless ergonomic mouse with silver scroll wheel on white desk",
    orderDate: "01/12/2025",
    deliveryDate: "08/12/2025",
    status: "Доставлено",
    price: "45 000 ₸"
  },
  {
    id: 2,
    productName: "USB-C хаб Anker 7-в-1",
    productImage: "https://images.unsplash.com/photo-1723084361651-07961a486ca0",
    productImageAlt: "Gray Anker USB-C hub with multiple ports including HDMI and USB connections on white surface",
    orderDate: "15/11/2025",
    deliveryDate: "22/11/2025",
    status: "Получено",
    price: "18 500 ₸"
  },
  {
    id: 3,
    productName: "Веб-камера Logitech C920",
    productImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14094b40a-1764673878586.png",
    productImageAlt: "Black Logitech HD webcam with clip mount on white background",
    orderDate: "05/11/2025",
    deliveryDate: "12/11/2025",
    status: "Доставлено",
    price: "32 000 ₸"
  }]
  );

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      productUpdates: true,
      deliveryAlerts: true,
      votingResults: true,
      marketingEmails: false
    },
    inApp: {
      productUpdates: true,
      deliveryAlerts: true,
      votingResults: true,
      marketingEmails: true
    }
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareAnalytics: true,
    shareWithBusinesses: false,
    publicProfile: true,
    showVotingHistory: true
  });

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
      pageTitle: 'User Profile',
      tabs: {
        profile: 'Profile',
        subscriptions: 'Subscriptions',
        voting: 'Voting History',
        security: 'Security',
        notifications: 'Notifications',
        orders: 'Orders',
        privacy: 'Privacy'
      }
    },
    ru: {
      pageTitle: 'Профиль пользователя',
      tabs: {
        profile: 'Профиль',
        subscriptions: 'Подписки',
        voting: 'История голосований',
        security: 'Безопасность',
        notifications: 'Уведомления',
        orders: 'Заказы',
        privacy: 'Конфиденциальность'
      }
    }
  };

  const t = translations?.[language];

  const handleSavePersonalInfo = (formData) => {
    setUserData((prev) => ({ ...prev, ...formData }));
  };

  const handleEditAvatar = () => {
    console.log('Edit avatar clicked');
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: newLanguage } }));
  };

  const handleToggleSubscription = (id, enabled) => {
    setSubscriptions((prev) =>
    prev?.map((sub) => sub?.id === id ? { ...sub, notificationsEnabled: enabled } : sub)
    );
  };

  const handleUnsubscribeAll = () => {
    setSubscriptions((prev) => prev?.map((sub) => ({ ...sub, notificationsEnabled: false })));
  };

  const handleChangePassword = (passwordData) => {
    console.log('Password changed:', passwordData);
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled((prev) => !prev);
  };

  const handleToggleNotificationSetting = (type, setting, value) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev?.[type],
        [setting]: value
      }
    }));
  };

  const handleReorder = (orderId) => {
    console.log('Reorder:', orderId);
  };

  const handleTogglePrivacy = (setting, value) => {
    setPrivacySettings((prev) => ({ ...prev, [setting]: value }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
      navigate('/landing-page');
    }
  };

  const tabs = [
  { id: 'profile', label: t?.tabs?.profile },
  { id: 'subscriptions', label: t?.tabs?.subscriptions },
  { id: 'voting', label: t?.tabs?.voting },
  { id: 'security', label: t?.tabs?.security },
  { id: 'notifications', label: t?.tabs?.notifications },
  { id: 'orders', label: t?.tabs?.orders },
  { id: 'privacy', label: t?.tabs?.privacy }];


  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="consumer" isAuthenticated={true} />
      <main className="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-semibold text-foreground mb-8">{t?.pageTitle}</h1>

          <ProfileHeader
            userData={userData}
            onEditAvatar={handleEditAvatar}
            language={language} />


          <div className="lg:hidden mb-6">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e?.target?.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground">

              {tabs?.map((tab) =>
              <option key={tab?.id} value={tab?.id}>
                  {tab?.label}
                </option>
              )}
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block">
              <div className="bg-card border border-border rounded-lg p-2 sticky top-24">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  activeTab === tab?.id ?
                  'bg-primary text-primary-foreground' :
                  'text-muted-foreground hover:bg-muted hover:text-foreground'}`
                  }>

                    {tab?.label}
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              {activeTab === 'profile' &&
              <>
                  <PersonalInfoSection
                  userData={userData}
                  onSave={handleSavePersonalInfo}
                  language={language} />

                  <LanguagePreferenceSection
                  currentLanguage={language}
                  onLanguageChange={handleLanguageChange}
                  language={language} />

                </>
              }

              {activeTab === 'subscriptions' &&
              <SubscriptionManagementSection
                subscriptions={subscriptions}
                onToggleSubscription={handleToggleSubscription}
                onUnsubscribeAll={handleUnsubscribeAll}
                language={language} />

              }

              {activeTab === 'voting' &&
              <VotingHistorySection votingHistory={votingHistory} language={language} />
              }

              {activeTab === 'security' &&
              <SecuritySection
                onChangePassword={handleChangePassword}
                onToggle2FA={handleToggle2FA}
                twoFactorEnabled={twoFactorEnabled}
                language={language} />

              }

              {activeTab === 'notifications' &&
              <NotificationSettingsSection
                settings={notificationSettings}
                onToggleSetting={handleToggleNotificationSetting}
                language={language} />

              }

              {activeTab === 'orders' &&
              <OrderHistorySection
                orders={orders}
                onReorder={handleReorder}
                language={language} />

              }

              {activeTab === 'privacy' &&
              <PrivacyControlsSection
                privacySettings={privacySettings}
                onTogglePrivacy={handleTogglePrivacy}
                onDeleteAccount={handleDeleteAccount}
                language={language} />

              }
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default UserProfile;