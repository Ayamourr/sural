import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = ({ language }) => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const content = {
    en: {
      tagline: "Kazakhstan\'s demand-driven marketplace",
      product: {
        title: "Product",
        links: [
          { label: "How It Works", path: "/landing-page#how-it-works" },
          { label: "Features", path: "/landing-page#features" },
          { label: "Pricing", path: "/landing-page#pricing" }
        ]
      },
      company: {
        title: "Company",
        links: [
          { label: "About Us", path: "/about" },
          { label: "Contact", path: "/contact" },
          { label: "Careers", path: "/careers" }
        ]
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Privacy Policy", path: "/privacy" },
          { label: "Terms of Service", path: "/terms" },
          { label: "Cookie Policy", path: "/cookies" }
        ]
      },
      social: {
        title: "Follow Us"
      },
      copyright: `© ${currentYear} sur'AL. All rights reserved.`
    },
    ru: {
      tagline: "Платформа спроса Казахстана",
      product: {
        title: "Продукт",
        links: [
          { label: "Как Это Работает", path: "/landing-page#how-it-works" },
          { label: "Функции", path: "/landing-page#features" },
          { label: "Цены", path: "/landing-page#pricing" }
        ]
      },
      company: {
        title: "Компания",
        links: [
          { label: "О Нас", path: "/about" },
          { label: "Контакты", path: "/contact" },
          { label: "Карьера", path: "/careers" }
        ]
      },
      legal: {
        title: "Правовая Информация",
        links: [
          { label: "Политика Конфиденциальности", path: "/privacy" },
          { label: "Условия Использования", path: "/terms" },
          { label: "Политика Cookie", path: "/cookies" }
        ]
      },
      social: {
        title: "Следите За Нами"
      },
      copyright: `© ${currentYear} sur'AL. Все права защищены.`
    }
  };

  const t = content?.[language];

  const socialLinks = [
    { icon: "Facebook", url: "https://facebook.com" },
    { icon: "Twitter", url: "https://twitter.com" },
    { icon: "Instagram", url: "https://instagram.com" },
    { icon: "Linkedin", url: "https://linkedin.com" }
  ];

  const handleNavigation = (path) => {
    if (path?.includes('#')) {
      const [route, hash] = path?.split('#');
      navigate(route);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Sparkles" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-2xl font-bold text-foreground">sur'AL</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t?.tagline}
            </p>
            <div className="flex gap-4">
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors duration-150"
                  aria-label={social?.icon}
                >
                  <Icon name={social?.icon} size={20} className="text-muted-foreground hover:text-primary transition-colors duration-150" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t?.product?.title}</h3>
            <ul className="space-y-3">
              {t?.product?.links?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t?.company?.title}</h3>
            <ul className="space-y-3">
              {t?.company?.links?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t?.legal?.title}</h3>
            <ul className="space-y-3">
              {t?.legal?.links?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            {t?.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;