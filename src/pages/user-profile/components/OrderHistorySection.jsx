import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderHistorySection = ({ orders, onReorder, language }) => {
  const translations = {
    en: {
      title: 'Order History',
      description: 'Your past deliveries and pickup appointments',
      orderDate: 'Order Date',
      deliveryDate: 'Delivery Date',
      status: 'Status',
      reorder: 'Reorder',
      viewDetails: 'View Details',
      noOrders: 'No order history yet',
      startOrdering: 'Start ordering products to see your history',
      delivered: 'Delivered',
      pickedUp: 'Picked Up',
      cancelled: 'Cancelled',
    },
    ru: {
      title: 'История заказов',
      description: 'Ваши прошлые доставки и встречи для получения',
      orderDate: 'Дата заказа',
      deliveryDate: 'Дата доставки',
      status: 'Статус',
      reorder: 'Повторить заказ',
      viewDetails: 'Подробности',
      noOrders: 'История заказов пока пуста',
      startOrdering: 'Начните заказывать товары, чтобы увидеть историю',
      delivered: 'Доставлено',
      pickedUp: 'Получено',
      cancelled: 'Отменено',
    },
  };

  const t = translations?.[language];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': case'Доставлено': case'Picked Up': case'Получено':
        return 'var(--color-success)';
      case 'Cancelled': case'Отменено':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': case'Доставлено':
        return 'Truck';
      case 'Picked Up': case'Получено':
        return 'Package';
      case 'Cancelled': case'Отменено':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="ShoppingBag" size={20} color="var(--color-primary)" />
          {t?.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{t?.description}</p>
      </div>
      {orders?.length > 0 ? (
        <div className="space-y-4">
          {orders?.map((order) => (
            <div
              key={order?.id}
              className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-150"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={order?.productImage}
                    alt={order?.productImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground mb-2">{order?.productName}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      <span>{t?.orderDate}: {order?.orderDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Truck" size={12} />
                      <span>{t?.deliveryDate}: {order?.deliveryDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${getStatusColor(order?.status)}15`,
                        color: getStatusColor(order?.status),
                      }}
                    >
                      <Icon name={getStatusIcon(order?.status)} size={12} />
                      {order?.status}
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-foreground">{order?.price}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={() => onReorder(order?.id)}
                  >
                    {t?.reorder}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                  >
                    {t?.viewDetails}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground mb-1">{t?.noOrders}</p>
          <p className="text-xs text-muted-foreground">{t?.startOrdering}</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistorySection;