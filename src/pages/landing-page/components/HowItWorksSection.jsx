import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HowItWorksSection = ({ language }) => {
  const content = {
    en: {
      title: "How It Works",
      subtitle: "Simple steps from product request to delivery",
      steps: [
      {
        number: "01",
        title: "Request a Product",
        description: "Can't find what you need? Create a product request with name, category, description, and optional image. Our AI assistant helps improve descriptions.",
        icon: "Plus",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1760bf061-1764804738687.png"
      },
      {
        number: "02",
        title: "Community Votes",
        description: "Other users vote for your request (one vote per user). Popular requests demonstrate real market demand to businesses and producers.",
        icon: "Vote",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd91a480-1765530183953.png"
      },
      {
        number: "03",
        title: "Business Responds",
        description: "Local businesses see demand analytics and decide to fulfill requests. Products move through lifecycle: Planned → In Transit → Available.",
        icon: "TrendingUp",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_16f776b0d-1765905082031.png"
      },
      {
        number: "04",
        title: "Reserve & Receive",
        description: "Get notified when products become available. Reserve during distribution windows and choose pickup points or home delivery.",
        icon: "Package",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1316a602a-1765591642434.png"
      }]

    },
    ru: {
      title: "Как Это Работает",
      subtitle: "Простые шаги от запроса продукта до доставки",
      steps: [
      {
        number: "01",
        title: "Запросите Продукт",
        description: "Не можете найти то, что нужно? Создайте запрос продукта с названием, категорией, описанием и изображением. Наш AI-помощник улучшает описания.",
        icon: "Plus",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1760bf061-1764804738687.png"
      },
      {
        number: "02",
        title: "Сообщество Голосует",
        description: "Другие пользователи голосуют за ваш запрос (один голос на пользователя). Популярные запросы демонстрируют реальный рыночный спрос.",
        icon: "Vote",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f5ef70a-1765109976671.png"
      },
      {
        number: "03",
        title: "Бизнес Отвечает",
        description: "Местный бизнес видит аналитику спроса и решает выполнить запросы. Продукты проходят жизненный цикл: Запланировано → В Пути → Доступно.",
        icon: "TrendingUp",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_115678dbc-1765905083017.png"
      },
      {
        number: "04",
        title: "Резервируйте и Получайте",
        description: "Получайте уведомления, когда продукты становятся доступными. Резервируйте во время окон распределения и выбирайте пункты выдачи или доставку.",
        icon: "Package",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1316a602a-1765591642434.png"
      }]

    }
  };

  const t = content?.[language];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t?.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {t?.steps?.map((step, index) =>
          <div
            key={index}
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`
            }>

              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-5xl font-bold text-primary/20">{step?.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name={step?.icon} size={24} color="var(--color-primary)" />
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {step?.title}
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step?.description}
                </p>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                  src={step?.image}
                  alt={`Step ${step?.number} illustration showing ${step?.title?.toLowerCase()} process in demand-driven marketplace platform`}
                  className="w-full h-[300px] lg:h-[400px] object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default HowItWorksSection;