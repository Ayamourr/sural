import React, { useState, useEffect } from 'react';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import UserManagementTable from './components/UserManagementTable';
import ProductModerationQueue from './components/ProductModerationQueue';
import PickupPointManagement from './components/PickupPointManagement';
import SystemAnalytics from './components/SystemAnalytics';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [language, setLanguage] = useState('en');

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
      title: 'Admin Panel',
      users: 'User Management',
      moderation: 'Product Moderation',
      pickupPoints: 'Pickup Points',
      analytics: 'System Analytics',
    },
    ru: {
      title: 'Панель администратора',
      users: 'Управление пользователями',
      moderation: 'Модерация продуктов',
      pickupPoints: 'Пункты выдачи',
      analytics: 'Системная аналитика',
    },
  };

  const t = translations?.[language];

  const tabs = [
    { id: 'users', label: t?.users },
    { id: 'moderation', label: t?.moderation },
    { id: 'pickupPoints', label: t?.pickupPoints },
    { id: 'analytics', label: t?.analytics },
  ];

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="admin" isAuthenticated={true} />
      <main className="main-content">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t?.title}</h1>
            <p className="text-muted-foreground">
              {language === 'en' ?'Comprehensive platform management and operational coordination' :'Комплексное управление платформой и координация операций'}
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border mb-6">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab?.id
                      ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                  }`}
                >
                  {tab?.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {activeTab === 'users' && <UserManagementTable language={language} />}
            {activeTab === 'moderation' && <ProductModerationQueue language={language} />}
            {activeTab === 'pickupPoints' && <PickupPointManagement language={language} />}
            {activeTab === 'analytics' && <SystemAnalytics language={language} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;