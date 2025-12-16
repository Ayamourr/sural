import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';


const ProfileHeader = ({ userData, onEditAvatar, language }) => {
  const translations = {
    en: {
      editPhoto: 'Edit Photo',
      memberSince: 'Member since',
      profileCompletion: 'Profile Completion',
    },
    ru: {
      editPhoto: 'Изменить фото',
      memberSince: 'Участник с',
      profileCompletion: 'Заполнение профиля',
    },
  };

  const t = translations?.[language];

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'var(--color-success)';
    if (percentage >= 50) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
            <Image
              src={userData?.avatar}
              alt={userData?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onEditAvatar}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity duration-150"
            aria-label={t?.editPhoto}
          >
            <Icon name="Camera" size={16} />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-semibold text-foreground mb-1">{userData?.name}</h1>
          <p className="text-sm text-muted-foreground mb-3">{userData?.email}</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>{t?.memberSince} {userData?.memberSince}</span>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <div className="bg-muted rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">{t?.profileCompletion}</p>
            <div className="relative w-20 h-20 mx-auto">
              <svg className="transform -rotate-90 w-20 h-20">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="var(--color-border)"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke={getCompletionColor(userData?.profileCompletion)}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - userData?.profileCompletion / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold" style={{ color: getCompletionColor(userData?.profileCompletion) }}>
                  {userData?.profileCompletion}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;