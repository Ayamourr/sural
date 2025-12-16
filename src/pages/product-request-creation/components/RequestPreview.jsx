import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RequestPreview = ({ formData, onEdit, onSubmit, language }) => {
  const translations = {
    en: {
      title: 'Preview Your Request',
      description: 'Review your product request before submission',
      productName: 'Product Name',
      category: 'Category',
      productDescription: 'Description',
      image: 'Product Image',
      noImage: 'No image uploaded',
      edit: 'Edit Request',
      submit: 'Submit Request',
      submitting: 'Submitting...',
      guidelines: 'Submission Guidelines',
      guidelinesList: [
        'Ensure all information is accurate and complete',
        'Product name should be clear and descriptive',
        'Description should help businesses understand your needs',
        'Check for similar existing requests before submitting'
      ]
    },
    ru: {
      title: 'Предварительный просмотр запроса',
      description: 'Проверьте ваш запрос продукта перед отправкой',
      productName: 'Название продукта',
      category: 'Категория',
      productDescription: 'Описание',
      image: 'Изображение продукта',
      noImage: 'Изображение не загружено',
      edit: 'Редактировать запрос',
      submit: 'Отправить запрос',
      submitting: 'Отправка...',
      guidelines: 'Правила подачи',
      guidelinesList: [
        'Убедитесь, что вся информация точна и полна',
        'Название продукта должно быть четким и описательным',
        'Описание должно помочь бизнесу понять ваши потребности',
        'Проверьте наличие похожих существующих запросов перед отправкой'
      ]
    }
  };

  const t = translations?.[language] || translations?.en;

  const categoryLabels = {
    en: {
      electronics: 'Electronics',
      fashion: 'Fashion & Apparel',
      home: 'Home & Living',
      beauty: 'Beauty & Personal Care',
      sports: 'Sports & Outdoors',
      books: 'Books & Media',
      toys: 'Toys & Games',
      automotive: 'Automotive',
      food: 'Food & Beverages',
      health: 'Health & Wellness',
      office: 'Office Supplies',
      pet: 'Pet Supplies',
      other: 'Other'
    },
    ru: {
      electronics: 'Электроника',
      fashion: 'Мода и одежда',
      home: 'Дом и быт',
      beauty: 'Красота и уход',
      sports: 'Спорт и отдых',
      books: 'Книги и медиа',
      toys: 'Игрушки и игры',
      automotive: 'Автомобильные товары',
      food: 'Еда и напитки',
      health: 'Здоровье и благополучие',
      office: 'Офисные принадлежности',
      pet: 'Товары для животных',
      other: 'Другое'
    }
  };

  const getCategoryLabel = (value) => {
    const labels = categoryLabels?.[language] || categoryLabels?.en;
    return labels?.[value] || value;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">{t?.title}</h2>
        <p className="text-sm text-muted-foreground">{t?.description}</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {t?.productName}
            </label>
            <p className="text-lg font-semibold text-foreground mt-1">{formData?.productName}</p>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {t?.category}
            </label>
            <div className="flex items-center gap-2 mt-1">
              <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {getCategoryLabel(formData?.category)}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {t?.productDescription}
            </label>
            <p className="text-sm text-foreground mt-2 whitespace-pre-wrap leading-relaxed">
              {formData?.description}
            </p>
          </div>

          {formData?.image ? (
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t?.image}
              </label>
              <div className="mt-2 rounded-lg overflow-hidden border border-border bg-muted/30">
                <div className="aspect-video w-full overflow-hidden bg-background">
                  <img
                    src={formData?.image}
                    alt="Product preview showing final uploaded image before request submission"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-muted/30 border border-border rounded-lg text-center">
              <Icon name="ImageOff" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">{t?.noImage}</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-2">{t?.guidelines}</p>
            <ul className="space-y-1">
              {t?.guidelinesList?.map((guideline, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <Icon name="Check" size={12} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          fullWidth
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={onEdit}
        >
          {t?.edit}
        </Button>
        <Button
          variant="default"
          fullWidth
          iconName="Send"
          iconPosition="right"
          onClick={onSubmit}
        >
          {t?.submit}
        </Button>
      </div>
    </div>
  );
};

export default RequestPreview;