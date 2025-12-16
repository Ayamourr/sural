import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsSection = ({ language }) => {
  const content = {
    en: {
      title: "Trusted by Kazakhstan Businesses",
      subtitle: "Certified, compliant, and committed to local market success",
      signals: [
        {
          icon: "Shield",
          title: "Local Business Certified",
          description: "Registered and compliant with Kazakhstan e-commerce regulations and consumer protection laws."
        },
        {
          icon: "Lock",
          title: "Secure Payments",
          description: "Test mode payment processing with KZT currency support. Your financial data is protected with industry-standard encryption."
        },
        {
          icon: "Users",
          title: "Community-Driven",
          description: "Built for Kazakhstan residents by understanding local market needs and shopping behaviors."
        },
        {
          icon: "Award",
          title: "Fair Marketplace",
          description: "Democratic voting system ensures equal opportunity for all users. No preferential treatment or hidden algorithms."
        }
      ],
      stats: [
        { value: "100%", label: "Kazakhstan Focused" },
        { value: "24/7", label: "Platform Availability" },
        { value: "2", label: "Languages Supported" }
      ]
    },
    ru: {
      title: "Доверие Бизнеса Казахстана",
      subtitle: "Сертифицировано, соответствует требованиям и привержено успеху местного рынка",
      signals: [
        {
          icon: "Shield",
          title: "Сертифицировано Местным Бизнесом",
          description: "Зарегистрировано и соответствует правилам электронной коммерции Казахстана и законам о защите прав потребителей."
        },
        {
          icon: "Lock",
          title: "Безопасные Платежи",
          description: "Тестовая обработка платежей с поддержкой валюты KZT. Ваши финансовые данные защищены шифрованием отраслевого стандарта."
        },
        {
          icon: "Users",
          title: "Управляемый Сообществом",
          description: "Создан для жителей Казахстана с пониманием потребностей местного рынка и покупательского поведения."
        },
        {
          icon: "Award",
          title: "Справедливый Рынок",
          description: "Демократическая система голосования обеспечивает равные возможности для всех пользователей. Никакого преференциального отношения."
        }
      ],
      stats: [
        { value: "100%", label: "Фокус на Казахстан" },
        { value: "24/7", label: "Доступность Платформы" },
        { value: "2", label: "Поддерживаемых Языка" }
      ]
    }
  };

  const t = content?.[language];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t?.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {t?.signals?.map((signal, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name={signal?.icon} size={32} color="var(--color-primary)" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {signal?.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {signal?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="card p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {t?.stats?.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary mb-2">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;