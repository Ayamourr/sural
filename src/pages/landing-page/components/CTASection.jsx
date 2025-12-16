import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = ({ language }) => {
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Ready to Request Your First Product?",
      subtitle: "Join Kazakhstan\'s growing community of smart shoppers and forward-thinking businesses",
      description: "Create your free account today and start requesting products you need. Vote for community requests, track product lifecycles, and enjoy fair pricing through collective purchasing power.",
      ctaPrimary: "Create Free Account",
      ctaSecondary: "Sign In",
      features: [
        "Free account creation",
        "Unlimited product requests",
        "Real-time status tracking",
        "Fair reservation system"
      ]
    },
    ru: {
      title: "Готовы Запросить Свой Первый Продукт?",
      subtitle: "Присоединяйтесь к растущему сообществу умных покупателей и прогрессивного бизнеса Казахстана",
      description: "Создайте бесплатную учетную запись сегодня и начните запрашивать нужные вам продукты. Голосуйте за запросы сообщества, отслеживайте жизненные циклы продуктов и наслаждайтесь справедливыми ценами.",
      ctaPrimary: "Создать Бесплатный Аккаунт",
      ctaSecondary: "Войти",
      features: [
        "Бесплатное создание аккаунта",
        "Неограниченные запросы продуктов",
        "Отслеживание статуса в реальном времени",
        "Справедливая система резервирования"
      ]
    }
  };

  const t = content?.[language];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8 lg:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t?.title}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              {t?.subtitle}
            </p>

            <p className="text-base text-muted-foreground mb-8">
              {t?.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="default"
                size="lg"
                iconName="UserPlus"
                iconPosition="left"
                onClick={() => navigate('/register')}
                className="interactive-scale"
              >
                {t?.ctaPrimary}
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="LogIn"
                iconPosition="left"
                onClick={() => navigate('/login')}
              >
                {t?.ctaSecondary}
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-border">
              {t?.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 justify-center sm:justify-start">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;