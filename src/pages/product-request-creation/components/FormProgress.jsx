import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ currentStep, totalSteps, language }) => {
  const translations = {
    en: {
      steps: ['Details', 'Review', 'Submit']
    },
    ru: {
      steps: ['Детали', 'Просмотр', 'Отправка']
    }
  };

  const t = translations?.[language] || translations?.en;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {t?.steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-success border-success text-success-foreground'
                      : isActive
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-muted border-border text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < t?.steps?.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 mb-6">
                  <div
                    className={`h-full transition-all duration-300 ${
                      stepNumber < currentStep ? 'bg-success' : 'bg-border'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;