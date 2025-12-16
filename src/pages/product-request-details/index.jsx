import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import ProductHeader from './components/ProductHeader';
import VotingSection from './components/VotingSection';
import SubscriptionSection from './components/SubscriptionSection';
import LifecycleTimeline from './components/LifecycleTimeline';
import SimilarProducts from './components/SimilarProducts';
import AIInsights from './components/AIInsights';
import ReservationSection from './components/ReservationSection';
import ShareSection from './components/ShareSection';
import CommentsSection from './components/CommentsSection';

const ProductRequestDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams?.get('id') || '1';

  const [hasVoted, setHasVoted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
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

  const mockProduct = {
    id: productId,
    name: language === 'ru' ? 'Беспроводные наушники Sony WH-1000XM5' : 'Sony WH-1000XM5 Wireless Headphones',
    category: language === 'ru' ? 'Электроника' : 'Electronics',
    description: language === 'ru' ? 'Премиальные беспроводные наушники с шумоподавлением нового поколения. Оснащены процессором V1 для улучшенного качества звука, 30-часовым временем работы от батареи и комфортным дизайном для длительного использования. Идеально подходят для путешествий, работы и повседневного прослушивания.' : 'Premium wireless headphones with industry-leading noise cancellation technology. Features the new V1 processor for enhanced sound quality, 30-hour battery life, and comfortable design for all-day wear. Perfect for travel, work, and everyday listening.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1119295e3-1765076790006.png",
    imageAlt: 'Black Sony WH-1000XM5 wireless headphones with sleek modern design displayed on white background with soft lighting',
    status: 'Available',
    votes: 1247,
    subscribers: 892,
    rank: 3,
    price: 189000,
    estimatedDate: '25/12/2025'
  };

  const mockSimilarProducts = [
  {
    id: '2',
    name: language === 'ru' ? 'Bose QuietComfort 45' : 'Bose QuietComfort 45',
    category: language === 'ru' ? 'Электроника' : 'Electronics',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c41a886f-1765346288212.png",
    imageAlt: 'White Bose QuietComfort 45 headphones with premium cushioned ear cups on minimalist gray surface',
    votes: 983,
    subscribers: 654
  },
  {
    id: '3',
    name: language === 'ru' ? 'Apple AirPods Max' : 'Apple AirPods Max',
    category: language === 'ru' ? 'Электроника' : 'Electronics',
    image: "https://images.unsplash.com/photo-1616361953528-b1c27463f44f",
    imageAlt: 'Silver Apple AirPods Max over-ear headphones with mesh headband and aluminum ear cups on dark background',
    votes: 1521,
    subscribers: 1089
  },
  {
    id: '4',
    name: language === 'ru' ? 'Sennheiser Momentum 4' : 'Sennheiser Momentum 4',
    category: language === 'ru' ? 'Электроника' : 'Electronics',
    image: "https://images.unsplash.com/photo-1558477937-3e9e70fad118",
    imageAlt: 'Black Sennheiser Momentum 4 wireless headphones with leather-like finish and gold accents on wooden surface',
    votes: 756,
    subscribers: 523
  },
  {
    id: '5',
    name: language === 'ru' ? 'Jabra Elite 85h' : 'Jabra Elite 85h',
    category: language === 'ru' ? 'Электроника' : 'Electronics',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1014f2a3f-1764776089147.png",
    imageAlt: 'Navy blue Jabra Elite 85h headphones with fabric finish and modern design on light gray background',
    votes: 612,
    subscribers: 445
  }];


  const mockAIInsights = {
    demandAnalysis: language === 'ru' ? 'Высокий спрос на премиальные наушники с шумоподавлением в Казахстане. Текущий рейтинг голосов указывает на сильный интерес рынка, особенно среди профессионалов и путешественников.' : 'High demand for premium noise-cancelling headphones in Kazakhstan market. Current voting rank indicates strong market interest, particularly among professionals and travelers.',
    marketContext: language === 'ru' ? 'Эта категория продуктов показывает стабильный рост с увеличением на 34% запросов за последние 3 месяца. Конкурирующие бренды также получают значительное внимание.' : 'This product category shows consistent growth with 34% increase in requests over the past 3 months. Competing brands are also receiving significant attention.',
    recommendation: language === 'ru' ? 'Рекомендуется зарезервировать рано, так как похожие продукты быстро распродаются. Рассмотрите подписку на обновления для получения уведомлений о доступности.' : 'Recommended to reserve early as similar products have sold out quickly. Consider subscribing for availability notifications.'
  };

  const mockComments = [
  {
    id: 1,
    userName: language === 'ru' ? 'Алексей Петров' : 'Alexey Petrov',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18404705f-1763294898796.png",
    userAvatarAlt: 'Professional headshot of young man with short dark hair wearing navy blue shirt against neutral background',
    text: language === 'ru' ? 'Отличный выбор! Использую предыдущую модель уже 2 года, качество звука потрясающее.' : 'Great choice! I\'ve been using the previous model for 2 years, sound quality is amazing.',
    timestamp: new Date(Date.now() - 3600000),
    likes: 12
  },
  {
    id: 2,
    userName: language === 'ru' ? 'Мария Иванова' : 'Maria Ivanova',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
    userAvatarAlt: 'Professional portrait of woman with long brown hair wearing white blouse smiling at camera',
    text: language === 'ru' ? 'Кто-нибудь знает, когда они будут доступны? Очень жду!' : 'Does anyone know when these will be available? Can\'t wait!',
    timestamp: new Date(Date.now() - 7200000),
    likes: 8
  },
  {
    id: 3,
    userName: language === 'ru' ? 'Дмитрий Козлов' : 'Dmitry Kozlov',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_180a47b0b-1764766556477.png",
    userAvatarAlt: 'Casual photo of middle-aged man with glasses and beard wearing gray sweater outdoors',
    text: language === 'ru' ? 'Цена разумная по сравнению с другими магазинами. Определенно проголосую за это.' : 'Price seems reasonable compared to other stores. Definitely voting for this.',
    timestamp: new Date(Date.now() - 10800000),
    likes: 15
  }];


  const handleVote = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setHasVoted(true);
  };

  const handleSubscribe = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubscribed(!isSubscribed);
  };

  const handleReserve = async (deliveryMethod) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(language === 'ru' ?
    `Продукт зарезервирован с методом доставки: ${deliveryMethod === 'delivery' ? 'Доставка на дом' : 'Пункт выдачи'}` :
    `Product reserved with delivery method: ${deliveryMethod === 'delivery' ? 'Home Delivery' : 'Pickup Point'}`
    );
  };

  const handleProductClick = (id) => {
    navigate(`/product-request-details?id=${id}`);
    window.scrollTo(0, 0);
  };

  const handleSimilarVote = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(language === 'ru' ? `Проголосовали за продукт ${id}` : `Voted for product ${id}`);
  };

  const handleAddComment = async (text) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('New comment:', text);
  };

  return (
    <>
      <Helmet>
        <title>{language === 'ru' ? 'Детали запроса продукта - sur\'AL' : 'Product Request Details - sur\'AL'}</title>
        <meta name="description" content={language === 'ru' ? 'Просмотр подробной информации о запросе продукта, голосование и резервирование' : 'View detailed product request information, vote, and reserve products'} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <RoleBasedHeader userRole="consumer" isAuthenticated={true} />

        <main className="main-content">
          <ProductHeader
            product={mockProduct}
            onBack={() => navigate('/search-results')} />


          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <VotingSection
                  product={mockProduct}
                  hasVoted={hasVoted}
                  onVote={handleVote} />


                <SubscriptionSection
                  isSubscribed={isSubscribed}
                  onSubscribe={handleSubscribe} />


                <AIInsights insights={mockAIInsights} />

                <SimilarProducts
                  products={mockSimilarProducts}
                  onProductClick={handleProductClick}
                  onVote={handleSimilarVote} />


                <ShareSection productName={mockProduct?.name} />

                <CommentsSection
                  comments={mockComments}
                  onAddComment={handleAddComment} />

              </div>

              <div className="space-y-6">
                <LifecycleTimeline
                  currentStatus={mockProduct?.status}
                  estimatedDate={mockProduct?.estimatedDate} />


                {mockProduct?.status === 'Available' &&
                <ReservationSection
                  product={mockProduct}
                  onReserve={handleReserve} />

                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default ProductRequestDetails;