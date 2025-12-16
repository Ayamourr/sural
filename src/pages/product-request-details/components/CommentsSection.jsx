import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentsSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!newComment?.trim()) return;

    setIsSubmitting(true);
    await onAddComment(newComment);
    setNewComment('');
    setTimeout(() => setIsSubmitting(false), 500);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Community Discussion</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <Input
          type="text"
          placeholder="Share your thoughts about this product..."
          value={newComment}
          onChange={(e) => setNewComment(e?.target?.value)}
          className="mb-3"
        />
        <Button
          type="submit"
          variant="default"
          iconName="Send"
          iconPosition="right"
          loading={isSubmitting}
          disabled={!newComment?.trim()}
        >
          Post Comment
        </Button>
      </form>
      <div className="space-y-4">
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <div key={comment?.id} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={comment?.userAvatar}
                    alt={comment?.userAvatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{comment?.userName}</h4>
                    <span className="text-xs text-muted-foreground">{formatTimeAgo(comment?.timestamp)}</span>
                  </div>
                  <p className="text-sm text-foreground">{comment?.text}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-150">
                      <Icon name="ThumbsUp" size={14} />
                      <span className="text-xs">{comment?.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-150">
                      <Icon name="MessageCircle" size={14} />
                      <span className="text-xs">Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;