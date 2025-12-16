import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ActivityFeedItem = ({ activity }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'status_update':
        return { name: 'RefreshCw', color: 'var(--color-accent)' };
      case 'new_vote':
        return { name: 'ThumbsUp', color: 'var(--color-primary)' };
      case 'new_product':
        return { name: 'Sparkles', color: 'var(--color-success)' };
      case 'delivery':
        return { name: 'Truck', color: 'var(--color-warning)' };
      default:
        return { name: 'Bell', color: 'var(--color-muted-foreground)' };
    }
  };

  const icon = getActivityIcon(activity?.type);

  const handleClick = () => {
    if (activity?.link) {
      navigate(activity?.link);
    }
  };

  return (
    <div 
      className={`flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors duration-150 ${activity?.link ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <Icon name={icon?.name} size={18} color={icon?.color} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground mb-1">{activity?.message}</p>
        <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
      </div>
      {activity?.link && (
        <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" className="flex-shrink-0" />
      )}
    </div>
  );
};

export default ActivityFeedItem;