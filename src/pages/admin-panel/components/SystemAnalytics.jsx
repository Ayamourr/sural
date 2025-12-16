import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SystemAnalytics = ({ language }) => {
  const translations = {
    en: {
      title: 'System Analytics',
      platformHealth: 'Platform Health',
      userEngagement: 'User Engagement',
      operationalMetrics: 'Operational Metrics',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      newRequests: 'New Requests',
      completedDeliveries: 'Completed Deliveries',
      userGrowth: 'User Growth (Last 7 Days)',
      requestsByCategory: 'Requests by Category',
      deliveryStatus: 'Delivery Status',
      systemUptime: 'System Uptime',
      avgResponseTime: 'Avg Response Time',
      errorRate: 'Error Rate',
      electronics: 'Electronics',
      accessories: 'Accessories',
      clothing: 'Clothing',
      home: 'Home & Garden',
      sports: 'Sports',
      pending: 'Pending',
      inTransit: 'In Transit',
      delivered: 'Delivered',
      users: 'Users',
      requests: 'Requests',
    },
    ru: {
      title: 'Системная аналитика',
      platformHealth: 'Здоровье платформы',
      userEngagement: 'Активность пользователей',
      operationalMetrics: 'Операционные метрики',
      totalUsers: 'Всего пользователей',
      activeUsers: 'Активные пользователи',
      newRequests: 'Новые запросы',
      completedDeliveries: 'Завершенные доставки',
      userGrowth: 'Рост пользователей (последние 7 дней)',
      requestsByCategory: 'Запросы по категориям',
      deliveryStatus: 'Статус доставок',
      systemUptime: 'Время работы системы',
      avgResponseTime: 'Среднее время ответа',
      errorRate: 'Уровень ошибок',
      electronics: 'Электроника',
      accessories: 'Аксессуары',
      clothing: 'Одежда',
      home: 'Дом и сад',
      sports: 'Спорт',
      pending: 'Ожидание',
      inTransit: 'В пути',
      delivered: 'Доставлено',
      users: 'Пользователи',
      requests: 'Запросы',
    },
  };

  const t = translations?.[language];

  const statsCards = [
    {
      title: t?.totalUsers,
      value: '12,458',
      change: '+12.5%',
      trend: 'up',
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: t?.activeUsers,
      value: '8,234',
      change: '+8.2%',
      trend: 'up',
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: t?.newRequests,
      value: '1,847',
      change: '+15.3%',
      trend: 'up',
      icon: 'Package',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: t?.completedDeliveries,
      value: '3,562',
      change: '+6.8%',
      trend: 'up',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const userGrowthData = [
    { date: '10 Dec', users: 1820, requests: 340 },
    { date: '11 Dec', users: 1950, requests: 380 },
    { date: '12 Dec', users: 2100, requests: 420 },
    { date: '13 Dec', users: 2280, requests: 460 },
    { date: '14 Dec', users: 2450, requests: 510 },
    { date: '15 Dec', users: 2620, requests: 550 },
    { date: '16 Dec', users: 2800, requests: 590 },
  ];

  const categoryData = [
    { name: t?.electronics, value: 450 },
    { name: t?.accessories, value: 320 },
    { name: t?.clothing, value: 280 },
    { name: t?.home, value: 210 },
    { name: t?.sports, value: 180 },
  ];

  const deliveryStatusData = [
    { name: t?.pending, value: 342 },
    { name: t?.inTransit, value: 567 },
    { name: t?.delivered, value: 891 },
  ];

  const COLORS = ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">{t?.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards?.map((stat, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                  <Icon name={stat?.icon} size={24} className={stat?.color} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat?.trend === 'up' ? 'text-success' : 'text-error'}`}>
                  <Icon name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                  <span>{stat?.change}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t?.userGrowth}</h3>
            <div className="w-full h-80" aria-label="User Growth Line Chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={2} name={t?.users} />
                  <Line type="monotone" dataKey="requests" stroke="#8B5CF6" strokeWidth={2} name={t?.requests} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t?.requestsByCategory}</h3>
            <div className="w-full h-80" aria-label="Requests by Category Bar Chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="value" fill="#6366F1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t?.deliveryStatus}</h3>
            <div className="w-full h-80" aria-label="Delivery Status Pie Chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100)?.toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deliveryStatusData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t?.platformHealth}</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{t?.systemUptime}</span>
                  <span className="text-sm font-bold text-success">99.8%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success" style={{ width: '99.8%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{t?.avgResponseTime}</span>
                  <span className="text-sm font-bold text-accent">142ms</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{t?.errorRate}</span>
                  <span className="text-sm font-bold text-success">0.2%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success" style={{ width: '2%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;