import React from 'react';
import Icon from '../../../components/AppIcon';

const LifecycleTimeline = ({ currentStatus, estimatedDate }) => {
  const stages = [
    { status: 'Planned', icon: 'Clock', label: 'Planned', description: 'Product request created' },
    { status: 'In Transit', icon: 'Truck', label: 'In Transit', description: 'Product being shipped' },
    { status: 'Available', icon: 'CheckCircle', label: 'Available', description: 'Ready for reservation' },
    { status: 'Sold Out', icon: 'XCircle', label: 'Sold Out', description: 'All units reserved' },
  ];

  const currentIndex = stages?.findIndex(stage => stage?.status === currentStatus);

  const getStageColor = (index) => {
    if (index < currentIndex) return 'text-success bg-success/10 border-success/20';
    if (index === currentIndex) return 'text-primary bg-primary/10 border-primary/20';
    return 'text-muted-foreground bg-muted border-border';
  };

  const getLineColor = (index) => {
    if (index < currentIndex) return 'bg-success';
    return 'bg-border';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Product Lifecycle</h2>
      <div className="relative">
        {stages?.map((stage, index) => (
          <div key={stage?.status} className="relative">
            <div className="flex items-start gap-4 pb-8 last:pb-0">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${getStageColor(index)}`}>
                <Icon name={stage?.icon} size={20} />
              </div>

              <div className="flex-1 pt-2">
                <h3 className={`text-base font-semibold mb-1 ${index === currentIndex ? 'text-primary' : index < currentIndex ? 'text-success' : 'text-muted-foreground'}`}>
                  {stage?.label}
                </h3>
                <p className="text-sm text-muted-foreground">{stage?.description}</p>
                {index === currentIndex && estimatedDate && (
                  <p className="text-xs text-accent mt-2">Estimated: {estimatedDate}</p>
                )}
              </div>
            </div>

            {index < stages?.length - 1 && (
              <div className={`absolute left-6 top-12 w-0.5 h-8 -translate-x-1/2 ${getLineColor(index)}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifecycleTimeline;