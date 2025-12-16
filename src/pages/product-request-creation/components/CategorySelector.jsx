import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CategorySelector = ({ value, onChange, error, language }) => {
  const translations = {
    en: {
      label: 'Product Category',
      description: 'Select the most appropriate category for your product',
      placeholder: 'Choose a category',
      popular: 'Popular Categories',
      all: 'All Categories'
    },
    ru: {
      label: 'Категория продукта',
      description: 'Выберите наиболее подходящую категорию для вашего продукта',
      placeholder: 'Выберите категорию',
      popular: 'Популярные категории',
      all: 'Все категории'
    }
  };

  const t = translations?.[language] || translations?.en;

  const categories = {
    en: [
      { value: 'electronics', label: 'Electronics', description: 'Gadgets, devices, and tech accessories', icon: 'Smartphone' },
      { value: 'fashion', label: 'Fashion & Apparel', description: 'Clothing, shoes, and accessories', icon: 'Shirt' },
      { value: 'home', label: 'Home & Living', description: 'Furniture, decor, and household items', icon: 'Home' },
      { value: 'beauty', label: 'Beauty & Personal Care', description: 'Cosmetics, skincare, and grooming', icon: 'Sparkles' },
      { value: 'sports', label: 'Sports & Outdoors', description: 'Fitness equipment and outdoor gear', icon: 'Dumbbell' },
      { value: 'books', label: 'Books & Media', description: 'Books, magazines, and educational materials', icon: 'Book' },
      { value: 'toys', label: 'Toys & Games', description: 'Children\'s toys and entertainment', icon: 'Gamepad2' },
      { value: 'automotive', label: 'Automotive', description: 'Car accessories and parts', icon: 'Car' },
      { value: 'food', label: 'Food & Beverages', description: 'Specialty foods and drinks', icon: 'Coffee' },
      { value: 'health', label: 'Health & Wellness', description: 'Medical supplies and health products', icon: 'Heart' },
      { value: 'office', label: 'Office Supplies', description: 'Stationery and office equipment', icon: 'Briefcase' },
      { value: 'pet', label: 'Pet Supplies', description: 'Pet food, toys, and accessories', icon: 'PawPrint' },
      { value: 'other', label: 'Other', description: 'Products not fitting other categories', icon: 'Package' }
    ],
    ru: [
      { value: 'electronics', label: 'Электроника', description: 'Гаджеты, устройства и технические аксессуары', icon: 'Smartphone' },
      { value: 'fashion', label: 'Мода и одежда', description: 'Одежда, обувь и аксессуары', icon: 'Shirt' },
      { value: 'home', label: 'Дом и быт', description: 'Мебель, декор и предметы домашнего обихода', icon: 'Home' },
      { value: 'beauty', label: 'Красота и уход', description: 'Косметика, уход за кожей и груминг', icon: 'Sparkles' },
      { value: 'sports', label: 'Спорт и отдых', description: 'Фитнес-оборудование и снаряжение для активного отдыха', icon: 'Dumbbell' },
      { value: 'books', label: 'Книги и медиа', description: 'Книги, журналы и образовательные материалы', icon: 'Book' },
      { value: 'toys', label: 'Игрушки и игры', description: 'Детские игрушки и развлечения', icon: 'Gamepad2' },
      { value: 'automotive', label: 'Автомобильные товары', description: 'Автомобильные аксессуары и запчасти', icon: 'Car' },
      { value: 'food', label: 'Еда и напитки', description: 'Специальные продукты питания и напитки', icon: 'Coffee' },
      { value: 'health', label: 'Здоровье и благополучие', description: 'Медицинские принадлежности и товары для здоровья', icon: 'Heart' },
      { value: 'office', label: 'Офисные принадлежности', description: 'Канцелярские товары и офисное оборудование', icon: 'Briefcase' },
      { value: 'pet', label: 'Товары для животных', description: 'Корм для животных, игрушки и аксессуары', icon: 'PawPrint' },
      { value: 'other', label: 'Другое', description: 'Товары, не подходящие к другим категориям', icon: 'Package' }
    ]
  };

  const categoryOptions = categories?.[language] || categories?.en;

  return (
    <div className="space-y-2">
      <Select
        label={t?.label}
        description={t?.description}
        placeholder={t?.placeholder}
        options={categoryOptions}
        value={value}
        onChange={onChange}
        error={error}
        required
        searchable
        className="w-full"
      />
      {!value && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs font-medium text-muted-foreground mb-3">{t?.popular}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categoryOptions?.slice(0, 6)?.map((cat) => (
              <button
                key={cat?.value}
                onClick={() => onChange(cat?.value)}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border hover:border-primary hover:bg-primary/5 transition-all duration-150 text-left"
              >
                <Icon name={cat?.icon} size={16} className="text-primary flex-shrink-0" />
                <span className="text-xs font-medium text-foreground truncate">{cat?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;