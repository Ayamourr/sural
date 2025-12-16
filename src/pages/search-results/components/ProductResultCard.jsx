import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductResultCard = ({ product, searchQuery }) => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [hasVoted, setHasVoted] = useState(product?.hasVoted);
  const [isSubscribed, setIsSubscribed] = useState(product?.isSubscribed);
  const [voteCount, setVoteCount] = useState(product?.votes);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (e) => {
      setLanguage(e?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translations = {
    en: {
      votes: 'votes',
      vote: 'Vote',
      voted: 'Voted',
      subscribe: 'Subscribe',
      subscribed: 'Subscribed',
      viewDetails: 'View Details',
      planned: 'Planned',
      inTransit: 'In Transit',
      available: 'Available',
      soldOut: 'Sold Out',
    },
    ru: {
      votes: 'голосов',
      vote: 'Голосовать',
      voted: 'Проголосовано',
      subscribe: 'Подписаться',
      subscribed: 'Подписан',
      viewDetails: 'Подробнее',
      planned: 'Запланировано',
      inTransit: 'В пути',
      available: 'Доступно',
      soldOut: 'Распродано',
    },
  };

  const t = translations?.[language];

  const getStatusColor = (status) => {
    switch (status) {
      case 'planned':
        return 'bg-accent/10 text-accent';
      case 'in-transit':
        return 'bg-warning/10 text-warning';
      case 'available':
        return 'bg-success/10 text-success';
      case 'sold-out':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planned':
        return t?.planned;
      case 'in-transit':
        return t?.inTransit;
      case 'available':
        return t?.available;
      case 'sold-out':
        return t?.soldOut;
      default:
        return status;
    }
  };

  const highlightText = (text) => {
    if (!searchQuery || !text) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-primary/20 text-foreground font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleVote = (e) => {
    e?.stopPropagation();
    if (!hasVoted) {
      setHasVoted(true);
      setVoteCount(prev => prev + 1);
    }
  };

  const handleSubscribe = (e) => {
    e?.stopPropagation();
    setIsSubscribed(!isSubscribed);
  };

  const handleCardClick = () => {
    navigate(`/product-request-details?id=${product?.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="card p-4 cursor-pointer transition-all duration-200 hover:shadow-lg"
    >
      <div className="flex gap-4">
        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <Image
            src={product?.image}
            alt={product?.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground line-clamp-1">
              {highlightText(product?.name)}
            </h3>
            <span className={`status-badge ${getStatusColor(product?.status)} flex-shrink-0`}>
              {getStatusLabel(product?.status)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {highlightText(product?.description)}
          </p>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="Tag" size={16} />
              <span>{product?.category}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-foreground">
              <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
              <span>{voteCount} {t?.votes}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={hasVoted ? 'secondary' : 'outline'}
              size="sm"
              iconName={hasVoted ? 'Check' : 'ThumbsUp'}
              iconPosition="left"
              onClick={handleVote}
              disabled={hasVoted}
            >
              {hasVoted ? t?.voted : t?.vote}
            </Button>

            <Button
              variant={isSubscribed ? 'secondary' : 'ghost'}
              size="sm"
              iconName={isSubscribed ? 'BellOff' : 'Bell'}
              iconPosition="left"
              onClick={handleSubscribe}
            >
              {isSubscribed ? t?.subscribed : t?.subscribe}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              className="ml-auto"
            >
              {t?.viewDetails}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductResultCard;