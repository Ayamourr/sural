import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const LoginBanner = ({ language }) => {
  const translations = {
    en: {
      tagline: 'Demand-Driven Commerce',
      description: 'Connect with local businesses, request unavailable products, and receive scheduled delivery in Kazakhstan',
      features: [
      'Request products not available in stores',
      'Vote to demonstrate demand',
      'Track product lifecycle status',
      'Scheduled local delivery']

    },
    ru: {
      tagline: 'Коммерция по запросу',
      description: 'Связывайтесь с местными компаниями, запрашивайте недоступные товары и получайте запланированную доставку в Казахстане',
      features: [
      'Запрашивайте товары, недоступные в магазинах',
      'Голосуйте, чтобы показать спрос',
      'Отслеживайте статус жизненного цикла товара',
      'Запланированная местная доставка']

    }
  };

  const t = translations?.[language];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-lg">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Icon name="Sparkles" size={28} color="var(--color-primary)" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">sur'AL</h2>
          </div>
          <p className="text-xl font-semibold text-primary mb-3">{t?.tagline}</p>
          <p className="text-muted-foreground leading-relaxed">{t?.description}</p>
        </div>

        <div className="space-y-4 mb-8">
          {t?.features?.map((feature, index) =>
          <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={14} color="var(--color-success)" />
              </div>
              <p className="text-foreground">{feature}</p>
            </div>
          )}
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://img.rocket.new/generatedImages/rocket_gen_img_10f1877c4-1765191978868.png"
            alt="Modern warehouse interior with organized shelves containing various products and packages, bright lighting illuminating the clean industrial space with delivery boxes ready for distribution"
            className="w-full h-64 object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
      </div>
    </div>);

};

export default LoginBanner;