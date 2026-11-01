'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Sun, Plus, Calendar, Clock, MapPin, User, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  location?: string;
  description?: string;
  color: string;
}

const demoEvents: Event[] = [
  {
    id: '1',
    title: 'Mahoe Team Standup',
    start: new Date(Date.now() + 86400000),
    end: new Date(Date.now() + 86400000 + 3600000),
    location: 'Discord #general',
    color: '#4263eb',
  },
  {
    id: '2',
    title: 'Design Review - New Wallpapers',
    start: new Date(Date.now() + 172800000),
    end: new Date(Date.now() + 172800000 + 7200000),
    location: 'Figma',
    description: 'Review new wallpaper collection for Alpha 2',
    color: '#10b981',
  },
  {
    id: '3',
    title: 'KDE Plasma 6.2 Planning',
    start: new Date(Date.now() + 259200000),
    end: new Date(Date.now() + 259200000 + 3600000),
    allDay: true,
    color: '#f59e0b',
  },
  {
    id: '4',
    title: 'Community AMA',
    start: new Date(Date.now() + 345600000),
    end: new Date(Date.now() + 345600000 + 5400000),
    location: 'Reddit r/mahoeos',
    color: '#ef4444',
  },
  {
    id: '5',
    title: 'Code Sprint - Terminal App',
    start: new Date(Date.now() + 432000000),
    end: new Date(Date.now() + 432000000 + 10800000),
    description: 'Implementing tab completion and themes',
    color: '#8b5cf6',
  },
  {
    id: '6',
    title: 'Mahoe 29 Alpha 2 Release',
    start: new Date(Date.now() + 1209600000),
    end: new Date(Date.now() + 1209600000 + 86400000),
    allDay: true,
    color: '#ec4899',
  },
];

export function CalendarApp({ onClose }: { onClose: () => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isMonthView: boolean = view === 'month';
  const isWeekView: boolean = view === 'week';
  const isDayView: boolean = view === 'day';

  const monthStart = useMemo(() => {
    const date = new Date(currentDate);
    date.setDate(1);
    return date;
  }, [currentDate]);

  const monthEnd = useMemo(() => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date;
  }, [currentDate]);

  const weeks = useMemo(() => {
    const weeks: Date[][] = [];
    let week: Date[] = [];
    
    // Add leading days
    const firstDay = monthStart.getDay();
    for (let i = 0; i < firstDay; i++) {
      const d = new Date(monthStart);
      d.setDate(d.getDate() - firstDay + i);
      week.push(d);
    }

    // Add month days
    for (let d = 1; d <= monthEnd.getDate(); d++) {
      const date = new Date(currentDate);
      date.setDate(d);
      week.push(date);
      
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    // Add trailing days
    while (week.length < 7 && week.length > 0) {
      const lastDate = week[week.length - 1];
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + 1);
      week.push(nextDate);
    }
    if (week.length > 0) weeks.push(week);

    return weeks;
  }, [monthStart, monthEnd, currentDate]);

  const getEventsForDate = (date: Date) => {
    return demoEvents.filter(event => {
      const eventStart = new Date(event.start);
      eventStart.setHours(0, 0, 0, 0);
      const eventEnd = new Date(event.end);
      eventEnd.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      return checkDate >= eventStart && checkDate <= eventEnd;
    });
  };

  const getEventsForWeek = (weekStart: Date) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return demoEvents.filter(event => {
      const eventStart = new Date(event.start);
      eventStart.setHours(0, 0, 0, 0);
      const eventEnd = new Date(event.end);
      eventEnd.setHours(0, 0, 0, 0);
      return eventStart <= weekEnd && eventEnd >= weekStart;
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const navigateMonth = (delta: number) => {
    setCurrentDate(prev => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() + delta);
      return date;
    });
  };

  const navigateWeek = (delta: number) => {
    setCurrentDate(prev => {
      const date = new Date(prev);
      date.setDate(date.getDate() + delta * 7);
      return date;
    });
  };

  const navigateDay = (delta: number) => {
    setCurrentDate(prev => {
      const date = new Date(prev);
      date.setDate(date.getDate() + delta);
      return date;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  if (isMonthView) {
    return (
      <div className="flex h-full flex-col bg-[var(--color-bg-primary)]">
        {/* Toolbar */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-[var(--color-text-primary)]">
              {currentDate.toLocaleDateString([], { month: 'long', year: 'numeric' })}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border border-[var(--color-border-primary)] rounded-lg overflow-hidden">
              <Button variant="ghost" size="sm" onClick={() => setView('month')} className={isMonthView ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>Month</Button>
              <Button variant="ghost" size="sm" onClick={() => setView('week')} className={isWeekView ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>Week</Button>
              <Button variant="ghost" size="sm" onClick={() => setView('day')} className={isDayView ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>Day</Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigateMonth(-1)} disabled={currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()} aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={goToToday} className="px-3">Today</Button>
            <Button variant="ghost" size="sm" onClick={() => navigateMonth(1)} aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="primary" size="sm" icon={<Plus className="h-4 w-4" />}>New Event</Button>
          </div>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-[var(--color-text-tertiary)]">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-7">
          {weeks.flatMap((week, weekIndex) =>
            week.map((date, dayIndex) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === today.toDateString();
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
              const events = getEventsForDate(date);
              const hasEvents = events.length > 0;

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    'relative min-h-[100px] border-r border-b border-[var(--color-border-primary)] p-2 transition-colors',
                    'hover:bg-[var(--color-surface-hover)]',
                    !isCurrentMonth && 'bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)]',
                    isToday && 'bg-[var(--color-accent-light)]',
                    isSelected && 'ring-2 ring-[var(--color-accent)] ring-inset',
                    dayIndex === 6 && 'border-r-0'
                  )}
                >
                  <div className={cn(
                    'text-sm font-medium',
                    isToday ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]',
                    !isCurrentMonth && 'text-[var(--color-text-tertiary)]'
                  )}>
                    {date.getDate()}
                  </div>
                  {hasEvents && (
                    <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                      {events.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className="text-xs px-1.5 py-0.5 rounded truncate cursor-pointer hover:opacity-80"
                          style={{ backgroundColor: event.color + '20', borderLeft: `2px solid ${event.color}` }}
                          onClick={(e) => { e.stopPropagation(); setEditingEvent(event); setShowEventDialog(true); }}
                        >
                          {event.allDay ? '' : formatTime(event.start) + ' '}
                          {event.title}
                        </div>
                      ))}
                      {events.length > 3 && (
                        <div className="text-xs text-[var(--color-text-tertiary)] text-center px-1">
                          +{events.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="border-t border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] p-4 max-h-64 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-[var(--color-text-primary)]">
                {selectedDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              {getEventsForDate(selectedDate).length > 0 && (
                <span className="text-sm text-[var(--color-text-tertiary)]">
                  {getEventsForDate(selectedDate).length} event{getEventsForDate(selectedDate).length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            {getEventsForDate(selectedDate).length === 0 ? (
              <p className="text-[var(--color-text-tertiary)] text-center py-4">No events scheduled</p>
            ) : (
              <div className="space-y-2">
                {getEventsForDate(selectedDate).map(event => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg hover:border-[var(--color-border-secondary)] transition-colors cursor-pointer"
                    onClick={() => { setEditingEvent(event); setShowEventDialog(true); }}
                  >
                    <div className="w-1 h-full rounded-full flex-shrink-0" style={{ backgroundColor: event.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[var(--color-text-primary)]">{event.title}</span>
                        <span className="text-xs px-2 py-0.5 bg-[var(--color-surface-tertiary)] rounded-full">{event.allDay ? 'All day' : formatTime(event.start) + ' - ' + formatTime(event.end)}</span>
                      </div>
                      {event.location && (
                        <p className="text-sm text-[var(--color-text-tertiary)] flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (isWeekView) {
    const weekStart = useMemo(() => {
      const date = new Date(currentDate);
      const day = date.getDay();
      date.setDate(date.getDate() - day);
      date.setHours(0, 0, 0, 0);
      return date;
    }, [currentDate]);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });

    const weekEvents = getEventsForWeek(weekStart);

    return (
      <div className="flex h-full flex-col bg-[var(--color-bg-primary)]">
        <div className="h-12 flex items-center justify-between px-4 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-[var(--color-text-primary)]">
              {weekStart.toLocaleDateString([], { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border border-[var(--color-border-primary)] rounded-lg overflow-hidden">
              <Button variant="ghost" size="sm" onClick={() => setView('month')} className={isMonthView ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>Month</Button>
              <Button variant="ghost" size="sm" onClick={() => setView('week')} className={isWeekView ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>Week</Button>
              <Button variant="ghost" size="sm" onClick={() => setView('day')} className={isDayView ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>Day</Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigateWeek(-1)} aria-label="Previous week"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={goToToday}>Today</Button>
            <Button variant="ghost" size="sm" onClick={() => navigateWeek(1)} aria-label="Next week"><ChevronRight className="h-4 w-4" /></Button>
            <Button variant="primary" size="sm" icon={<Plus className="h-4 w-4" />}>New Event</Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Time column */}
          <div className="w-20 flex-shrink-0 border-r border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] overflow-y-auto">
            {Array.from({ length: 24 }, (_, h) => (
              <div key={h} className="h-24 border-b border-[var(--color-border-primary)] px-2 text-right text-xs text-[var(--color-text-tertiary)] flex items-end">
                {h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`}
              </div>
            ))}
          </div>

          {/* Week grid */}
          <div className="flex-1 overflow-x-auto overflow-y-auto grid grid-cols-7 min-w-0">
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="relative min-w-[140px] border-r border-[var(--color-border-primary)]">
                <div className={cn(
                  'h-12 flex items-center justify-center text-sm font-medium border-b border-[var(--color-border-primary)]',
                  day.toDateString() === today.toDateString() ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]'
                )}>
                  {day.toLocaleDateString([], { weekday: 'short', day: 'numeric' })}
                </div>
                <div className="relative h-[576px]">
                  {weekEvents
                    .filter(e => {
                      const eventStart = new Date(e.start);
                      eventStart.setHours(0, 0, 0, 0);
                      return eventStart.toDateString() === day.toDateString();
                    })
                    .map(event => {
                      const start = new Date(event.start);
                      const end = new Date(event.end);
                      const top = (start.getHours() + start.getMinutes() / 60) * 24;
                      const height = Math.max(24, ((end.getHours() + end.getMinutes() / 60) - (start.getHours() + start.getMinutes() / 60)) * 24);
                      return (
                        <div
                          key={event.id}
                          className="absolute left-1 right-1 rounded-lg px-2 py-1 text-xs overflow-hidden cursor-pointer hover:opacity-90"
                          style={{ top: `${top}px`, height: `${height}px`, backgroundColor: event.color + '30', borderLeft: `3px solid ${event.color}` }}
                          onClick={() => { setEditingEvent(event); setShowEventDialog(true); }}
                        >
                          <div className="font-medium text-[var(--color-text-primary)] truncate">{event.title}</div>
                          <div className="text-[var(--color-text-tertiary)]">{formatTime(start)} - {formatTime(end)}</div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Day view
  const dayEvents = demoEvents.filter(e => {
    const eventStart = new Date(e.start);
    eventStart.setHours(0, 0, 0, 0);
    return eventStart.toDateString() === currentDate.toDateString();
  });

  return (
    <div className="flex h-full flex-col bg-[var(--color-bg-primary)]">
      <div className="h-12 flex items-center justify-between px-4 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-[var(--color-text-primary)]">
            {currentDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-[var(--color-border-primary)] rounded-lg overflow-hidden">
            <Button variant="ghost" size="sm" onClick={() => setView('month')} className={isMonthView ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>Month</Button>
            <Button variant="ghost" size="sm" onClick={() => setView('week')} className={isWeekView ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>Week</Button>
            <Button variant="ghost" size="sm" onClick={() => setView('day')} className={isDayView ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>Day</Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigateDay(-1)} aria-label="Previous day"><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={goToToday}>Today</Button>
          <Button variant="ghost" size="sm" onClick={() => navigateDay(1)} aria-label="Next day"><ChevronRight className="h-4 w-4" /></Button>
          <Button variant="primary" size="sm" icon={<Plus className="h-4 w-4" />}>New Event</Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-20 flex-shrink-0 border-r border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] overflow-y-auto">
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="h-24 border-b border-[var(--color-border-primary)] px-2 text-right text-xs text-[var(--color-text-tertiary)] flex items-end">
              {h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-auto relative min-w-[600px]">
          <div className="relative h-[576px]">
            {dayEvents.map(event => {
              const start = new Date(event.start);
              const end = new Date(event.end);
              const top = (start.getHours() + start.getMinutes() / 60) * 24;
              const height = Math.max(48, ((end.getHours() + end.getMinutes() / 60) - (start.getHours() + start.getMinutes() / 60)) * 24);
              return (
                <div
                  key={event.id}
                  className="absolute left-4 right-4 rounded-lg px-3 py-2 overflow-hidden cursor-pointer hover:opacity-90 shadow-md"
                  style={{ top: `${top}px`, height: `${height}px`, backgroundColor: event.color + '25', borderLeft: `4px solid ${event.color}` }}
                  onClick={() => { setEditingEvent(event); setShowEventDialog(true); }}
                >
                  <div className="font-medium text-[var(--color-text-primary)]">{event.title}</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">{formatTime(start)} - {formatTime(end)}</div>
                  {event.location && (
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] mt-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}