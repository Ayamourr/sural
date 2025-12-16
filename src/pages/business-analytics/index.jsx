import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import MetricCard from './components/MetricCard';
import DemandChart from './components/DemandChart';
import TopProductsTable from './components/TopProductsTable';
import FilterPanel from './components/FilterPanel';
import RegionalDistribution from './components/RegionalDistribution';
import AIInsights from './components/AIInsights';
import LifecycleAnalytics from './components/LifecycleAnalytics';

const BusinessAnalytics = () => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    category: 'all',
    region: 'all',
    status: 'all'
  });

  const [language, setLanguage] = useState('en');

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
      title: 'Business Analytics',
      subtitle: 'Comprehensive demand insights and market intelligence',
      totalRequests: 'Total Requests',
      activeUsers: 'Active Users',
      conversionRate: 'Conversion Rate',
      avgResponseTime: 'Avg Response Time',
      demandTrends: 'Demand Trends Over Time',
      demandTrendsDesc: 'Product requests and votes by month',
      categoryDistribution: 'Category Distribution',
      categoryDistributionDesc: 'Requests by product category',
      topCategories: 'Top Categories by Demand',
      topCategoriesDesc: 'Most requested product categories'
    },
    ru: {
      title: 'Бизнес-аналитика',
      subtitle: 'Комплексная аналитика спроса и рыночная информация',
      totalRequests: 'Всего запросов',
      activeUsers: 'Активные пользователи',
      conversionRate: 'Коэффициент конверсии',
      avgResponseTime: 'Среднее время ответа',
      demandTrends: 'Тенденции спроса',
      demandTrendsDesc: 'Запросы продуктов и голоса по месяцам',
      categoryDistribution: 'Распределение по категориям',
      categoryDistributionDesc: 'Запросы по категориям продуктов',
      topCategories: 'Топ категории по спросу',
      topCategoriesDesc: 'Наиболее запрашиваемые категории продуктов'
    }
  };

  const t = translations?.[language];

  const metricsData = [
  {
    title: t?.totalRequests,
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: 'Package',
    iconColor: 'var(--color-primary)',
    trend: [
    { label: 'Week 1', value: '642' },
    { label: 'Week 2', value: '718' },
    { label: 'Week 3', value: '695' },
    { label: 'Week 4', value: '792' }]

  },
  {
    title: t?.activeUsers,
    value: '1,234',
    change: '+8.3%',
    changeType: 'positive',
    icon: 'Users',
    iconColor: 'var(--color-accent)',
    trend: [
    { label: 'Week 1', value: '287' },
    { label: 'Week 2', value: '312' },
    { label: 'Week 3', value: '298' },
    { label: 'Week 4', value: '337' }]

  },
  {
    title: t?.conversionRate,
    value: '34.2%',
    change: '+2.1%',
    changeType: 'positive',
    icon: 'TrendingUp',
    iconColor: 'var(--color-success)',
    trend: [
    { label: 'Week 1', value: '32%' },
    { label: 'Week 2', value: '33%' },
    { label: 'Week 3', value: '34%' },
    { label: 'Week 4', value: '35%' }]

  },
  {
    title: t?.avgResponseTime,
    value: '2.4 days',
    change: '-0.3 days',
    changeType: 'positive',
    icon: 'Clock',
    iconColor: 'var(--color-warning)',
    trend: [
    { label: 'Week 1', value: '2.6d' },
    { label: 'Week 2', value: '2.5d' },
    { label: 'Week 3', value: '2.4d' },
    { label: 'Week 4', value: '2.3d' }]

  }];


  const demandTrendsData = [
  { name: 'Jan', requests: 420, votes: 1240 },
  { name: 'Feb', requests: 380, votes: 1180 },
  { name: 'Mar', requests: 520, votes: 1520 },
  { name: 'Apr', requests: 480, votes: 1380 },
  { name: 'May', requests: 590, votes: 1680 },
  { name: 'Jun', requests: 640, votes: 1820 },
  { name: 'Jul', requests: 720, votes: 2040 },
  { name: 'Aug', requests: 680, votes: 1920 },
  { name: 'Sep', requests: 750, votes: 2140 },
  { name: 'Oct', requests: 820, votes: 2340 },
  { name: 'Nov', requests: 780, votes: 2220 },
  { name: 'Dec', requests: 847, votes: 2420 }];


  const categoryDistributionData = [
  { name: 'Electronics', value: 842 },
  { name: 'Fashion', value: 623 },
  { name: 'Home & Garden', value: 487 },
  { name: 'Sports', value: 356 },
  { name: 'Beauty', value: 289 },
  { name: 'Other', value: 250 }];


  const topCategoriesData = [
  { name: 'Electronics', value: 842 },
  { name: 'Fashion & Apparel', value: 623 },
  { name: 'Home & Garden', value: 487 },
  { name: 'Sports & Outdoors', value: 356 },
  { name: 'Beauty & Personal Care', value: 289 }];


  const topProductsData = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    votes: 234,
    status: 'In Transit',
    conversionRate: 78,
    region: 'Almaty',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14edb55e2-1764708667214.png",
    imageAlt: 'Modern black wireless headphones with noise cancellation technology displayed on white surface with soft lighting'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    votes: 198,
    status: 'Available',
    conversionRate: 85,
    region: 'Astana',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1889135d6-1764680248899.png",
    imageAlt: 'Silver smartwatch with black band showing fitness tracking interface on bright display screen'
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    category: 'Home & Garden',
    votes: 176,
    status: 'Planned',
    conversionRate: 62,
    region: 'Shymkent',
    image: "https://images.unsplash.com/photo-1660234053761-fb00a4a66c84",
    imageAlt: 'Modern ergonomic office chair with mesh back support and adjustable armrests in contemporary workspace'
  },
  {
    id: 4,
    name: 'Premium Yoga Mat Set',
    category: 'Sports & Outdoors',
    votes: 154,
    status: 'Available',
    conversionRate: 72,
    region: 'Almaty',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18230b674-1765179770198.png",
    imageAlt: 'Purple yoga mat rolled out on wooden floor with matching blocks and strap accessories in natural light'
  },
  {
    id: 5,
    name: 'Organic Skincare Bundle',
    category: 'Beauty & Personal Care',
    votes: 142,
    status: 'In Transit',
    conversionRate: 68,
    region: 'Karaganda',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_191f10152-1764825393789.png",
    imageAlt: 'Collection of natural skincare products with botanical ingredients arranged on marble surface with green leaves'
  },
  {
    id: 6,
    name: 'Mechanical Gaming Keyboard',
    category: 'Electronics',
    votes: 128,
    status: 'Planned',
    conversionRate: 55,
    region: 'Astana',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9d2c0a7-1765133121114.png",
    imageAlt: 'RGB backlit mechanical gaming keyboard with colorful lighting effects on dark gaming desk setup'
  }];


  const regionalData = [
  {
    id: 1,
    name: 'Almaty',
    requests: 1247,
    growth: 15.3,
    activeUsers: 542,
    topCategory: 'Electronics'
  },
  {
    id: 2,
    name: 'Astana',
    requests: 892,
    growth: 12.8,
    activeUsers: 387,
    topCategory: 'Fashion'
  },
  {
    id: 3,
    name: 'Shymkent',
    requests: 634,
    growth: 8.5,
    activeUsers: 276,
    topCategory: 'Home & Garden'
  },
  {
    id: 4,
    name: 'Karaganda',
    requests: 428,
    growth: -2.1,
    activeUsers: 189,
    topCategory: 'Sports'
  },
  {
    id: 5,
    name: 'Aktobe',
    requests: 346,
    growth: 5.7,
    activeUsers: 152,
    topCategory: 'Beauty'
  }];


  const aiInsightsData = [
  {
    id: 1,
    type: 'opportunity',
    title: 'High Demand in Electronics Category',
    description: 'Electronics category shows 45% growth in requests over the past month. Consider expanding product offerings in wireless audio and smart home devices.',
    metrics: [
    { icon: 'TrendingUp', label: 'Growth', value: '+45%' },
    { icon: 'Users', label: 'New Users', value: '234' },
    { icon: 'DollarSign', label: 'Potential Revenue', value: '₸2.4M' }],

    action: 'View detailed analysis'
  },
  {
    id: 2,
    type: 'recommendation',
    title: 'Optimize Delivery Routes in Almaty',
    description: 'Analysis suggests consolidating pickup points in central Almaty could reduce delivery time by 18% and costs by 12%.',
    metrics: [
    { icon: 'Clock', label: 'Time Saved', value: '18%' },
    { icon: 'TrendingDown', label: 'Cost Reduction', value: '12%' },
    { icon: 'MapPin', label: 'Affected Routes', value: '8' }],

    action: 'View route optimization'
  },
  {
    id: 3,
    type: 'warning',
    title: 'Declining Interest in Sports Category',
    description: 'Sports & Outdoors category shows 8% decrease in votes. Consider seasonal promotions or expanding product variety.',
    metrics: [
    { icon: 'TrendingDown', label: 'Vote Change', value: '-8%' },
    { icon: 'AlertTriangle', label: 'At Risk Products', value: '12' }],

    action: 'View category details'
  },
  {
    id: 4,
    type: 'info',
    title: 'Peak Demand Hours Identified',
    description: 'User activity peaks between 18:00-21:00 local time. Schedule product launches and notifications during these hours for maximum engagement.',
    metrics: [
    { icon: 'Clock', label: 'Peak Hours', value: '18:00-21:00' },
    { icon: 'Users', label: 'Active Users', value: '67%' }],

    action: 'View engagement analytics'
  }];


  const lifecycleStages = [
  {
    id: 1,
    name: 'Planned',
    count: 342,
    avgDuration: '5.2 days',
    successRate: 78,
    revenue: '₸0'
  },
  {
    id: 2,
    name: 'In Transit',
    count: 187,
    avgDuration: '8.4 days',
    successRate: 92,
    revenue: '₸0'
  },
  {
    id: 3,
    name: 'Available',
    count: 124,
    avgDuration: '3.1 days',
    successRate: 85,
    revenue: '₸4.2M'
  },
  {
    id: 4,
    name: 'Sold Out',
    count: 89,
    avgDuration: '2.8 days',
    successRate: 100,
    revenue: '₸3.8M'
  }];


  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        dateRange: '30d',
        category: 'all',
        region: 'all',
        status: 'all'
      });
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format...`);
    alert(`Export functionality would generate ${format?.toUpperCase()} report with current filter settings.`);
  };

  const handleRefresh = () => {
    console.log('Refreshing analytics data...');
    alert('Analytics data refreshed successfully!');
  };

  return (
    <>
      <Helmet>
        <title>{t?.title} - sur'AL</title>
        <meta name="description" content="Comprehensive business analytics and demand insights for Kazakhstan market" />
      </Helmet>
      <RoleBasedHeader userRole="business" isAuthenticated={true} />
      <main className="main-content bg-background min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t?.title}</h1>
            <p className="text-muted-foreground">{t?.subtitle}</p>
          </div>

          <div className="space-y-6">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onExport={handleExport}
              onRefresh={handleRefresh} />


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) =>
              <MetricCard key={index} {...metric} />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DemandChart
                type="line"
                data={demandTrendsData}
                title={t?.demandTrends}
                description={t?.demandTrendsDesc} />

              <DemandChart
                type="pie"
                data={categoryDistributionData}
                title={t?.categoryDistribution}
                description={t?.categoryDistributionDesc} />

            </div>

            <DemandChart
              type="bar"
              data={topCategoriesData}
              title={t?.topCategories}
              description={t?.topCategoriesDesc} />


            <TopProductsTable products={topProductsData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RegionalDistribution regions={regionalData} />
              <LifecycleAnalytics stages={lifecycleStages} />
            </div>

            <AIInsights insights={aiInsightsData} />
          </div>
        </div>
      </main>
    </>);

};

export default BusinessAnalytics;