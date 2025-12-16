import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ language }) => {
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Request What You Need, Get It When Available",
      subtitle: "Kazakhstan\'s first demand-driven marketplace connecting consumers with local businesses through collective purchasing power",
      description: "Vote for products you want, track their journey from request to delivery, and enjoy fair pricing through scheduled distribution windows.",
      ctaPrimary: "Start Requesting Products",
      ctaSecondary: "Learn How It Works",
      stats: [
      { value: "2,500+", label: "Active Users" },
      { value: "850+", label: "Product Requests" },
      { value: "95%", label: "Delivery Success" }]

    },
    ru: {
      title: "Запросите То, Что Вам Нужно, Получите Когда Доступно",
      subtitle: "Первая в Казахстане платформа спроса, соединяющая потребителей с местным бизнесом через коллективную покупательную способность",
      description: "Голосуйте за продукты, которые вы хотите, отслеживайте их путь от запроса до доставки и наслаждайтесь справедливыми ценами через запланированные окна распределения.",
      ctaPrimary: "Начать Запрашивать Продукты",
      ctaSecondary: "Узнать Как Это Работает",
      stats: [
      { value: "2,500+", label: "Активных Пользователей" },
      { value: "850+", label: "Запросов Продуктов" },
      { value: "95%", label: "Успешных Доставок" }]

    }
  };

  const t = content?.[language];

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Icon name="Sparkles" size={16} />
              <span>{language === 'en' ? 'New Platform Launch' : 'Запуск Новой Платформы'}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              {t?.title}
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t?.subtitle}
            </p>

            <p className="text-base text-muted-foreground">
              {t?.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate('/register')}
                className="interactive-scale">

                {t?.ctaPrimary}
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="PlayCircle"
                iconPosition="left"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>

                {t?.ctaSecondary}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {t?.stats?.map((stat, index) =>
              <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">{stat?.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat?.label}</div>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1e77b1fba-1764669850699.png"
                alt="Modern warehouse interior with organized product shelves and efficient logistics system showing demand-driven marketplace operations"
                className="w-full h-[400px] lg:h-[600px] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <Icon name="TrendingUp" size={24} color="var(--color-success)" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {language === 'en' ? 'Latest Request' : 'Последний Запрос'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Wireless Headphones - 156 votes' : 'Беспроводные Наушники - 156 голосов'}
                    </div>
                  </div>
                  <div className="status-badge success">
                    {language === 'en' ? 'In Transit' : 'В Пути'}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;