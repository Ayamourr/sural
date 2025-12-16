import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduleCalendar = ({ schedule, onUpdateAvailability }) => {
  const today = new Date();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const getDateForDay = (dayOffset) => {
    const date = new Date(today);
    date?.setDate(today?.getDate() + dayOffset);
    return date;
  };

  const formatDate = (date) => {
    return date?.getDate();
  };

  const getScheduleForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return schedule?.find(s => s?.date === dateStr);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Weekly Schedule</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            onClick={onUpdateAvailability}
          >
            Update Availability
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays?.map((day, index) => {
            const date = getDateForDay(index);
            const daySchedule = getScheduleForDate(date);
            const isToday = date?.toDateString() === today?.toDateString();

            return (
              <div
                key={index}
                className={`text-center p-3 rounded-lg border ${
                  isToday
                    ? 'border-primary bg-primary/10' :'border-border bg-muted/30'
                }`}
              >
                <p className="text-xs text-muted-foreground mb-1">{day}</p>
                <p className={`text-lg font-semibold mb-2 ${
                  isToday ? 'text-primary' : 'text-foreground'
                }`}>
                  {formatDate(date)}
                </p>
                {daySchedule ? (
                  <>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Icon name="Package" size={12} className="text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">
                        {daySchedule?.deliveries}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {daySchedule?.timeSlot}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">Off</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Capacity Status</span>
            <span className="text-xs text-muted-foreground">15/20 deliveries</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: '75%' }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            You have 5 more delivery slots available today
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;