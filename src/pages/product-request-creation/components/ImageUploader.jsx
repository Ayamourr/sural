import React, { useState, useRef } from 'react';
import Image from '../../../components/AppIcon';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageUploader = ({ value, onChange, error, language }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = useRef(null);

  const translations = {
    en: {
      label: 'Product Image',
      description: 'Upload a clear image of the product (optional)',
      dragDrop: 'Drag and drop an image here, or',
      browse: 'Browse Files',
      change: 'Change Image',
      remove: 'Remove Image',
      formats: 'Supported formats: JPG, PNG, WebP (Max 5MB)',
      uploading: 'Uploading...',
      errorSize: 'File size must be less than 5MB',
      errorFormat: 'Only JPG, PNG, and WebP formats are supported'
    },
    ru: {
      label: 'Изображение продукта',
      description: 'Загрузите четкое изображение продукта (необязательно)',
      dragDrop: 'Перетащите изображение сюда или',
      browse: 'Выберите файл',
      change: 'Изменить изображение',
      remove: 'Удалить изображение',
      formats: 'Поддерживаемые форматы: JPG, PNG, WebP (Макс 5МБ)',
      uploading: 'Загрузка...',
      errorSize: 'Размер файла должен быть менее 5МБ',
      errorFormat: 'Поддерживаются только форматы JPG, PNG и WebP'
    }
  };

  const t = translations?.[language] || translations?.en;

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    
    const file = e?.dataTransfer?.files?.[0];
    handleFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;

    const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validFormats?.includes(file?.type)) {
      alert(t?.errorFormat);
      return;
    }

    if (file?.size > 5 * 1024 * 1024) {
      alert(t?.errorSize);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader?.result);
      onChange(reader?.result);
    };
    reader?.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {t?.label}
      </label>
      <p className="text-xs text-muted-foreground">{t?.description}</p>
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-primary bg-primary/5'
              : error
              ? 'border-error bg-error/5' :'border-border bg-muted/30 hover:border-primary hover:bg-primary/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            
            <div>
              <p className="text-sm text-foreground mb-1">
                {t?.dragDrop}{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef?.current?.click()}
                  className="text-primary font-medium hover:underline"
                >
                  {t?.browse}
                </button>
              </p>
              <p className="text-xs text-muted-foreground">{t?.formats}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-border bg-muted/30">
          <div className="aspect-video w-full overflow-hidden bg-background">
            <img
              src={preview}
              alt="Product preview showing uploaded image for request submission"
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconName="RefreshCw"
              onClick={() => fileInputRef?.current?.click()}
            >
              {t?.change}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              onClick={handleRemove}
            >
              {t?.remove}
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
      {error && (
        <p className="text-xs text-error flex items-center gap-1 mt-1">
          <Icon name="AlertCircle" size={12} />
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;