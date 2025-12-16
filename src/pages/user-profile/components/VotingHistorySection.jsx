import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VotingHistorySection = ({ votingHistory, language }) => {
  const translations = {
    en: {
      title: 'Voting History',
      description: 'Your past votes on product requests',
      votedOn: 'Voted on',
      currentStatus: 'Current Status',
      noHistory: 'No voting history yet',
      startVoting: 'Start voting on product requests to see your history',
    },
    ru: {
      title: 'История голосований',
      description: 'Ваши прошлые голоса за запросы товаров',
      votedOn: 'Проголосовано',
      currentStatus: 'Текущий статус',
      noHistory: 'История голосований пока пуста',
      startVoting: 'Начните голосовать за запросы товаров, чтобы увидеть историю',
    },
  };

  const t = translations?.[language];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': case'Доступно':
        return 'var(--color-success)';
      case 'In transit': case'В пути':
        return 'var(--color-accent)';
      case 'Planned': case'Запланировано':
        return 'var(--color-warning)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="ThumbsUp" size={20} color="var(--color-primary)" />
          {t?.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{t?.description}</p>
      </div>
      {votingHistory?.length > 0 ? (
        <div className="space-y-3">
          {votingHistory?.map((vote) => (
            <div
              key={vote?.id}
              className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-150"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                <Image
                  src={vote?.productImage}
                  alt={vote?.productImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground mb-1 truncate">{vote?.productName}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {t?.votedOn} {vote?.votedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Package" size={12} />
                    <span style={{ color: getStatusColor(vote?.currentStatus) }}>
                      {vote?.currentStatus}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <Icon name="ThumbsUp" size={16} />
                <span className="text-sm font-medium">{vote?.totalVotes}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Vote" size={48} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground mb-1">{t?.noHistory}</p>
          <p className="text-xs text-muted-foreground">{t?.startVoting}</p>
        </div>
      )}
    </div>
  );
};

export default VotingHistorySection;