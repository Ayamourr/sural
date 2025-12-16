import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VotingSection = ({ product, hasVoted, onVote }) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    setIsVoting(true);
    await onVote();
    setTimeout(() => setIsVoting(false), 500);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Vote for this Product</h2>
        <div className="flex items-center gap-2 text-primary">
          <Icon name="TrendingUp" size={20} />
          <span className="text-sm font-medium">Trending</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Show your interest by voting! Each user can vote once. Higher votes increase the chance of this product becoming available.
      </p>
      <div className="flex items-center gap-4">
        <Button
          variant={hasVoted ? "secondary" : "default"}
          size="lg"
          iconName={hasVoted ? "Check" : "ThumbsUp"}
          iconPosition="left"
          onClick={handleVote}
          disabled={hasVoted}
          loading={isVoting}
          className="flex-1"
        >
          {hasVoted ? 'You Voted' : 'Vote Now'}
        </Button>

        <div className="text-center px-6 py-3 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-2xl font-bold text-primary">{product?.votes}</p>
          <p className="text-xs text-muted-foreground">Total Votes</p>
        </div>
      </div>
      {hasVoted && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg flex items-center gap-2">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <p className="text-sm text-success">Thank you for voting! We'll notify you of updates.</p>
        </div>
      )}
    </div>
  );
};

export default VotingSection;