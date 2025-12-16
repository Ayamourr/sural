import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShareSection = ({ productName }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location?.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { name: 'Copy Link', icon: 'Link', action: handleCopyLink },
    { name: 'WhatsApp', icon: 'MessageCircle', action: () => window.open(`https://wa.me/?text=${encodeURIComponent(productName + ' - ' + window.location?.href)}`) },
    { name: 'Telegram', icon: 'Send', action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location?.href)}&text=${encodeURIComponent(productName)}`) },
    { name: 'Email', icon: 'Mail', action: () => window.location.href = `mailto:?subject=${encodeURIComponent(productName)}&body=${encodeURIComponent(window.location?.href)}` },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Share This Request</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Help increase demand by sharing this product request with your network!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {shareOptions?.map((option) => (
          <Button
            key={option?.name}
            variant="outline"
            size="sm"
            iconName={option?.icon}
            iconPosition="left"
            onClick={option?.action}
            className="justify-center"
          >
            {option?.name}
          </Button>
        ))}
      </div>
      {copied && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg flex items-center gap-2">
          <Icon name="Check" size={16} color="var(--color-success)" />
          <p className="text-sm text-success">Link copied to clipboard!</p>
        </div>
      )}
    </div>
  );
};

export default ShareSection;