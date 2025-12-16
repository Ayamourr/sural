import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAssistant = ({ productName, description, category, onSuggestion, language }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  const translations = {
    en: {
      title: 'AI Assistant',
      analyzing: 'Analyzing your request...',
      suggestions: 'Suggestions',
      similar: 'Similar Requests Found',
      improve: 'Improve Description',
      apply: 'Apply',
      viewRequest: 'View Request',
      noSuggestions: 'Your description looks good!',
      checkDuplicates: 'Checking for duplicates...'
    },
    ru: {
      title: 'AI Ассистент',
      analyzing: 'Анализ вашего запроса...',
      suggestions: 'Предложения',
      similar: 'Найдены похожие запросы',
      improve: 'Улучшить описание',
      apply: 'Применить',
      viewRequest: 'Посмотреть запрос',
      noSuggestions: 'Ваше описание выглядит хорошо!',
      checkDuplicates: 'Проверка на дубликаты...'
    }
  };

  const t = translations?.[language] || translations?.en;

  const mockSimilarProducts = {
    en: [
      {
        id: 1,
        name: 'Wireless Noise-Cancelling Headphones',
        votes: 234,
        status: 'planned',
        similarity: 85
      },
      {
        id: 2,
        name: 'Bluetooth Over-Ear Headphones',
        votes: 156,
        status: 'in_transit',
        similarity: 72
      }
    ],
    ru: [
      {
        id: 1,
        name: 'Беспроводные наушники с шумоподавлением',
        votes: 234,
        status: 'planned',
        similarity: 85
      },
      {
        id: 2,
        name: 'Bluetooth наушники накладные',
        votes: 156,
        status: 'in_transit',
        similarity: 72
      }
    ]
  };

  const mockSuggestions = {
    en: [
      'Add specific brand preferences to help businesses source the right product',
      'Include desired price range to set realistic expectations',
      'Mention key features that are most important to you',
      'Specify if you prefer local or international brands'
    ],
    ru: [
      'Добавьте предпочтения по брендам, чтобы помочь бизнесу найти правильный продукт',
      'Укажите желаемый ценовой диапазон для реалистичных ожиданий',
      'Упомяните ключевые функции, которые наиболее важны для вас',
      'Укажите, предпочитаете ли вы местные или международные бренды'
    ]
  };

  useEffect(() => {
    if (productName && productName?.length > 3) {
      setIsAnalyzing(true);
      
      const timer = setTimeout(() => {
        const products = mockSimilarProducts?.[language] || mockSimilarProducts?.en;
        const filtered = products?.filter(p => 
          p?.name?.toLowerCase()?.includes(productName?.toLowerCase()?.split(' ')?.[0])
        );
        setSimilarProducts(filtered);
        setIsAnalyzing(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setSimilarProducts([]);
    }
  }, [productName, language]);

  useEffect(() => {
    if (description && description?.length > 20 && category) {
      const timer = setTimeout(() => {
        const suggestions = mockSuggestions?.[language] || mockSuggestions?.en;
        setSuggestions(suggestions?.slice(0, 2));
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [description, category, language]);

  const handleApplySuggestion = (suggestion) => {
    onSuggestion(suggestion);
  };

  if (!productName && !description) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-primary">
        <Icon name="Sparkles" size={20} />
        <h3 className="text-sm font-semibold">{t?.title}</h3>
      </div>
      {isAnalyzing && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={20} className="text-primary" />
            </div>
            <p className="text-sm text-foreground">{t?.checkDuplicates}</p>
          </div>
        </div>
      )}
      {similarProducts?.length > 0 && (
        <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg space-y-3">
          <div className="flex items-start gap-2">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-2">{t?.similar}</p>
              <div className="space-y-2">
                {similarProducts?.map((product) => (
                  <div
                    key={product?.id}
                    className="flex items-center justify-between p-3 bg-background rounded-md border border-border"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{product?.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="ThumbsUp" size={12} />
                          {product?.votes}
                        </span>
                        <span className="text-xs text-success">{product?.similarity}% {language === 'en' ? 'similar' : 'похож'}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      onClick={() => window.open(`/product-request-details?id=${product?.id}`, '_blank')}
                    >
                      {t?.viewRequest}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {suggestions?.length > 0 && (
        <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Icon name="Lightbulb" size={20} className="text-accent" />
            <p className="text-sm font-medium text-foreground">{t?.suggestions}</p>
          </div>
          <div className="space-y-2">
            {suggestions?.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-background rounded-md border border-border"
              >
                <Icon name="CheckCircle2" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs text-foreground flex-1">{suggestion}</p>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Plus"
                  onClick={() => handleApplySuggestion(suggestion)}
                >
                  {t?.apply}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {suggestions?.length === 0 && !isAnalyzing && description && description?.length > 50 && (
        <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <p className="text-sm text-foreground">{t?.noSuggestions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;