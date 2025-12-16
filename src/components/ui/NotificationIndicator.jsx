import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

const NotificationIndicator = ({ userRole = 'consumer', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);

  useEffect(() => {
    const mockNotifications = {
      consumer: [
        {
          id: 1,
          title: 'Product Request Approved',
          message: 'Your request for "Wireless Headphones" has been approved',
          time: '5 min ago',
          unread: true,
          type: 'success',
          icon: 'CheckCircle',
        },
        {
          id: 2,
          title: 'Delivery Update',
          message: 'Your order is out for delivery',
          time: '1 hour ago',
          unread: true,
          type: 'info',
          icon: 'Truck',
        },
        {
          id: 3,
          title: 'New Product Available',
          message: 'Check out the latest products in Electronics',
          time: '3 hours ago',
          unread: false,
          type: 'info',
          icon: 'Package',
        },
        {
          id: 4,
          title: 'Voting Closed',
          message: 'Voting for "Smart Watch" has ended',
          time: '1 day ago',
          unread: false,
          type: 'warning',
          icon: 'AlertCircle',
        },
      ],
      courier: [
        {
          id: 1,
          title: 'New Delivery Assigned',
          message: 'You have been assigned 3 new deliveries',
          time: '10 min ago',
          unread: true,
          type: 'info',
          icon: 'Package',
        },
        {
          id: 2,
          title: 'Delivery Completed',
          message: 'Order #12345 has been delivered successfully',
          time: '30 min ago',
          unread: true,
          type: 'success',
          icon: 'CheckCircle',
        },
        {
          id: 3,
          title: 'Route Updated',
          message: 'Your delivery route has been optimized',
          time: '2 hours ago',
          unread: false,
          type: 'info',
          icon: 'MapPin',
        },
      ],
    };

    setNotifications(mockNotifications?.[userRole] || []);
  }, [userRole]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev =>
      prev?.map(n => n?.id === notificationId ? { ...n, unread: false } : n)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev?.map(n => ({ ...n, unread: false })));
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'error':
        return 'var(--color-error)';
      default:
        return 'var(--color-accent)';
    }
  };

  return (
    <div ref={notificationRef} className={`relative ${className}`}>
      <button
        className="notification-indicator"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[190]"
            onClick={() => setIsOpen(false)}
          />
          <div className="notification-dropdown">
            <div className="notification-header">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            <div className="notification-list">
              {notifications?.length > 0 ? (
                notifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`notification-item ${notification?.unread ? 'unread' : ''}`}
                    onClick={() => handleNotificationClick(notification?.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${getIconColor(notification?.type)}15` }}
                      >
                        <Icon
                          name={notification?.icon}
                          size={16}
                          color={getIconColor(notification?.type)}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                          {notification?.unread && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification?.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <Icon name="Bell" size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              )}
            </div>

            {notifications?.length > 0 && (
              <div className="px-4 py-3 border-t border-border text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-primary hover:underline"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationIndicator;