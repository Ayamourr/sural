import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DeliveryConfirmation = ({ delivery, onConfirm, onCancel }) => {
  const [signature, setSignature] = useState('');
  const [photo, setPhoto] = useState(null);
  const [notes, setNotes] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    onConfirm({
      deliveryId: delivery?.id,
      signature,
      photo,
      notes,
      timestamp: new Date()?.toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Confirm Delivery</h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-md hover:bg-muted transition-colors duration-150 flex items-center justify-center"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Package" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{delivery?.customerName}</p>
                <p className="text-xs text-muted-foreground">Order #{delivery?.orderId}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{delivery?.address}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Customer Signature
            </label>
            <Input
              type="text"
              placeholder="Enter customer name for signature"
              value={signature}
              onChange={(e) => setSignature(e?.target?.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Delivery Photo
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {photo ? (
                <div className="relative">
                  <img
                    src={photo}
                    alt="Delivery confirmation photo showing package placement at customer location"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    onClick={() => setPhoto(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-error text-error-foreground rounded-full flex items-center justify-center"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <Icon name="Camera" size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Take a photo of the delivery</p>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload">
                    <Button variant="outline" size="sm" asChild>
                      <span>Upload Photo</span>
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div>
            <Input
              type="text"
              label="Additional Notes (Optional)"
              placeholder="Any special notes about the delivery..."
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              variant="default"
              fullWidth
              iconName="CheckCircle"
              iconPosition="left"
              onClick={handleConfirm}
              disabled={!signature}
            >
              Confirm Delivery
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirmation;