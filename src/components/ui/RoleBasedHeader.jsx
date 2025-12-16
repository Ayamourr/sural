import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedHeader = ({ userRole = 'consumer', isAuthenticated = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const translations = {
    en: {
      dashboard: 'Dashboard',
      createRequest: 'Create Request',
      search: 'Search',
      deliverySchedule: 'Delivery',
      profile: 'Profile',
      analytics: 'Analytics',
      adminPanel: 'Admin Panel',
      courierDashboard: 'Courier Dashboard',
      notifications: 'Notifications',
      settings: 'Settings',
      help: 'Help',
      logout: 'Logout',
      searchPlaceholder: 'Search products...',
      noNotifications: 'No new notifications',
      viewAll: 'View all',
    },
    ru: {
      dashboard: 'Панель',
      createRequest: 'Создать запрос',
      search: 'Поиск',
      deliverySchedule: 'Доставка',
      profile: 'Профиль',
      analytics: 'Аналитика',
      adminPanel: 'Админ панель',
      courierDashboard: 'Панель курьера',
      notifications: 'Уведомления',
      settings: 'Настройки',
      help: 'Помощь',
      logout: 'Выйти',
      searchPlaceholder: 'Поиск товаров...',
      noNotifications: 'Нет новых уведомлений',
      viewAll: 'Показать все',
    },
  };

  const t = translations?.[language];

  const getNavigationItems = () => {
    if (!isAuthenticated) {
      return [];
    }

    switch (userRole) {
      case 'consumer':
        return [
          { label: t?.dashboard, path: '/consumer-dashboard', icon: 'LayoutDashboard' },
          { label: t?.createRequest, path: '/product-request-creation', icon: 'Plus' },
          { label: t?.deliverySchedule, path: '/delivery-schedule', icon: 'Truck' },
          { label: t?.profile, path: '/user-profile', icon: 'User' },
        ];
      case 'business':
        return [
          { label: t?.analytics, path: '/business-analytics', icon: 'BarChart3' },
        ];
      case 'courier':
        return [
          { label: t?.courierDashboard, path: '/courier-dashboard', icon: 'Package' },
        ];
      case 'admin':
        return [
          { label: t?.adminPanel, path: '/admin-panel', icon: 'Settings' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const mockNotifications = [
    {
      id: 1,
      title: 'Product Request Approved',
      message: 'Your request for "Wireless Headphones" has been approved',
      time: '5 min ago',
      unread: true,
      type: 'success',
    },
    {
      id: 2,
      title: 'Delivery Update',
      message: 'Your order is out for delivery',
      time: '1 hour ago',
      unread: true,
      type: 'info',
    },
    {
      id: 3,
      title: 'New Product Available',
      message: 'Check out the latest products in Electronics',
      time: '3 hours ago',
      unread: false,
      type: 'info',
    },
  ];

  const unreadCount = mockNotifications?.filter(n => n?.unread)?.length;

  return (
    <>
      <header className="role-based-header">
        <div className="header-container">
          <div className="flex items-center gap-4">
            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>

            <a href="/" className="header-logo" onClick={(e) => { e?.preventDefault(); handleNavigation('/'); }}>
              <div className="header-logo-icon">
                <Icon name="Sparkles" size={20} color="var(--color-primary)" />
              </div>
              <span className="header-logo-text hidden sm:inline">sur'AL</span>
            </a>
          </div>

          {isAuthenticated && userRole === 'consumer' && (
            <form onSubmit={handleSearch} className="search-bar-container hidden md:block">
              <Icon name="Search" size={16} className="search-bar-icon" />
              <input
                type="text"
                placeholder={t?.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="search-bar-input"
              />
            </form>
          )}

          <nav className="nav-menu">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                onClick={(e) => { e?.preventDefault(); handleNavigation(item?.path); }}
                className={`nav-item ${isActivePath(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={16} className="nav-item-icon" />
                {item?.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="language-switcher">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`language-option ${language === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => handleLanguageChange('ru')}
                className={`language-option ${language === 'ru' ? 'active' : ''}`}
              >
                RU
              </button>
            </div>

            {isAuthenticated && (userRole === 'consumer' || userRole === 'courier') && (
              <div className="relative" ref={notificationRef}>
                <button
                  className="notification-indicator"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  aria-label="Notifications"
                >
                  <Icon name="Bell" size={20} />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <h3 className="text-sm font-semibold">{t?.notifications}</h3>
                    </div>
                    <div className="notification-list">
                      {mockNotifications?.length > 0 ? (
                        mockNotifications?.map((notification) => (
                          <div
                            key={notification?.id}
                            className={`notification-item ${notification?.unread ? 'unread' : ''}`}
                            onClick={() => setIsNotificationOpen(false)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-1.5 ${notification?.unread ? 'bg-primary' : 'bg-muted'}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification?.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                          {t?.noNotifications}
                        </div>
                      )}
                    </div>
                    {mockNotifications?.length > 0 && (
                      <div className="px-4 py-3 border-t border-border text-center">
                        <button className="text-sm text-primary hover:underline">
                          {t?.viewAll}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {isAuthenticated && (
              <div className="relative" ref={userMenuRef}>
                <button
                  className="user-menu-trigger"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="User menu"
                >
                  <div className="user-avatar">
                    <Icon name="User" size={16} />
                  </div>
                  <Icon name="ChevronDown" size={16} className="hidden lg:block" />
                </button>

                {isUserMenuOpen && (
                  <div className="user-menu-dropdown">
                    <button
                      onClick={() => handleNavigation('/user-profile')}
                      className="user-menu-item"
                    >
                      <Icon name="User" size={16} />
                      {t?.profile}
                    </button>
                    <button
                      onClick={() => handleNavigation('/settings')}
                      className="user-menu-item"
                    >
                      <Icon name="Settings" size={16} />
                      {t?.settings}
                    </button>
                    <button
                      onClick={() => handleNavigation('/help')}
                      className="user-menu-item"
                    >
                      <Icon name="HelpCircle" size={16} />
                      {t?.help}
                    </button>
                    <div className="user-menu-separator" />
                    <button
                      onClick={() => {
                        handleNavigation('/login');
                      }}
                      className="user-menu-item text-error"
                    >
                      <Icon name="LogOut" size={16} />
                      {t?.logout}
                    </button>
                  </div>
                )}
              </div>
            )}

            {!isAuthenticated && (
              <button
                onClick={() => handleNavigation('/login')}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity duration-150"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="mobile-menu">
            {isAuthenticated && userRole === 'consumer' && (
              <form onSubmit={handleSearch} className="px-4 py-3 border-b border-border">
                <div className="relative">
                  <Icon name="Search" size={16} className="search-bar-icon" />
                  <input
                    type="text"
                    placeholder={t?.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="search-bar-input"
                  />
                </div>
              </form>
            )}

            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                onClick={(e) => { e?.preventDefault(); handleNavigation(item?.path); }}
                className={`mobile-nav-item ${isActivePath(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={20} className="inline-block mr-3" />
                {item?.label}
              </a>
            ))}
          </nav>
        </>
      )}
    </>
  );
};

export default RoleBasedHeader;