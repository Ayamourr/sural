import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = ({ language }) => {
  const content = {
    en: {
      title: "Why Choose sur\'AL?",
      subtitle: "Everything you need to request, track, and receive products efficiently",
      features: [
        {
          icon: "Vote",
          title: "Democratic Voting System",
          description: "One vote per user ensures fair demand representation. Watch your requested products gain popularity and move toward availability."
        },
        {
          icon: "Package",
          title: "Complete Lifecycle Tracking",
          description: "Monitor your product requests from Planned → In Transit → Available → Sold Out with real-time status updates and notifications."
        },
        {
          icon: "Calendar",
          title: "Scheduled Distribution Windows",
          description: "Reserve products during distribution windows with guaranteed holding periods. Fair access for all registered users."
        },
        {
          icon: "TrendingUp",
          title: "Business Demand Insights",
          description: "Businesses access analytics dashboards showing real demand data, helping minimize inventory risk and validate market interest."
        },
        {
          icon: "Truck",
          title: "Flexible Delivery Options",
          description: "Choose pickup points with scheduled time windows or optional paid home delivery. Track courier status in real-time."
        },
        {
          icon: "Globe",
          title: "Bilingual Platform",
          description: "Full English and Russian support with persistent language selection. Designed specifically for the Kazakhstan market."
        }
      ]
    },
    ru: {
      title: "Почему Выбирают sur\'AL?",
      subtitle: "Все необходимое для запроса, отслеживания и получения продуктов эффективно",
      features: [
        {
          icon: "Vote",
          title: "Демократическая Система Голосования",
          description: "Один голос на пользователя обеспечивает справедливое представление спроса. Наблюдайте, как ваши запрошенные продукты набирают популярность."
        },
        {
          icon: "Package",
          title: "Полное Отслеживание Жизненного Цикла",
          description: "Отслеживайте запросы продуктов от Запланировано → В Пути → Доступно → Распродано с обновлениями статуса в реальном времени."
        },
        {
          icon: "Calendar",
          title: "Запланированные Окна Распределения",
          description: "Резервируйте продукты во время окон распределения с гарантированными периодами удержания. Справедливый доступ для всех."
        },
        {
          icon: "TrendingUp",
          title: "Бизнес-Аналитика Спроса",
          description: "Бизнес получает доступ к панелям аналитики с реальными данными спроса, помогая минимизировать риски запасов."
        },
        {
          icon: "Truck",
          title: "Гибкие Варианты Доставки",
          description: "Выбирайте пункты выдачи с запланированными временными окнами или платную доставку на дом. Отслеживайте курьера в реальном времени."
        },
        {
          icon: "Globe",
          title: "Двуязычная Платформа",
          description: "Полная поддержка английского и русского языков с постоянным выбором языка. Разработано специально для рынка Казахстана."
        }
      ]
    }
  };

  const t = content?.[language];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t?.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t?.features?.map((feature, index) => (
            <div
              key={index}
              className="card p-6 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <Icon name={feature?.icon} size={28} color="var(--color-primary)" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature?.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;