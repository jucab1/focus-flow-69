import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HistoryItem, Task } from '@/lib/store';

interface CalendarPageProps {
  history?: HistoryItem[];
  tasks?: Task[];
}

const CalendarPage = ({ history = [], tasks = [] }: CalendarPageProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const todayDate = new Date();
  const isCurrentMonth = todayDate.getFullYear() === year && todayDate.getMonth() === month;

  const daySlots = useMemo(() => {
    const slots: (number | null)[] = [];
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) slots.push(null);
    for (let d = 1; d <= daysInMonth; d++) slots.push(d);
    return slots;
  }, [firstDay, daysInMonth]);

  const dayHasTask = (day: number): boolean => {
    const dateObj = new Date(year, month, day);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    return tasks.some((t) => t.date === dayName || t.date === 'today');
  };

  const dumpsForDay = useMemo(() => {
    if (selectedDay === null) return [];
    return history.filter((h) => {
      const d = h.timestamp;
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDay;
    });
  }, [selectedDay, history, year, month]);

  const tasksForDay = useMemo(() => {
    if (selectedDay === null) return [];
    const dateObj = new Date(year, month, selectedDay);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const isToday = isCurrentMonth && selectedDay === todayDate.getDate();
    return tasks.filter((t) => t.date === dayName || (isToday && t.date === 'today'));
  }, [selectedDay, tasks, year, month, isCurrentMonth, todayDate]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="flex-1 p-10 md:p-14 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading font-bold text-[28px] text-foreground tracking-tight">Calendar</h1>
          <p className="text-muted-foreground text-[14px] mt-1">Your month at a glance.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-10 bubbly-card overflow-hidden"
        >
          <div className="flex items-center justify-between px-7 py-5 border-b border-border">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevMonth}
              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </motion.button>
            <span className="font-heading font-bold text-[16px] text-foreground tracking-tight">{monthName}</span>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextMonth}
              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-foreground" />
            </motion.button>
          </div>

          <div className="grid grid-cols-7 px-5 pt-5">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="text-center text-[11px] font-bold text-muted-foreground py-2 uppercase tracking-wider">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 px-5 pb-5 gap-1.5">
            {daySlots.map((day, i) => {
              if (day === null) return <div key={`e-${i}`} />;
              const isToday = isCurrentMonth && day === todayDate.getDate();
              const isSelected = day === selectedDay;
              const hasTasks = dayHasTask(day);
              const hasDumps = history.some((h) => {
                const d = h.timestamp;
                return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
              });
              const hasContent = hasTasks || hasDumps;

              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  className={`aspect-square rounded-[14px] flex flex-col items-center justify-center text-[13px] font-medium relative transition-colors ${
                    isSelected
                      ? 'gradient-lavender text-primary-foreground'
                      : isToday
                      ? 'bg-primary/8 text-primary ring-1 ring-primary/20'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {day}
                  {hasContent && !isSelected && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedDay !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 space-y-6"
            >
              <h3 className="font-heading font-bold text-[15px] text-foreground tracking-tight">
                {monthName.split(' ')[0]} {selectedDay}
              </h3>

              {tasksForDay.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">Tasks</p>
                  {tasksForDay.map((t) => (
                    <div key={t.id} className="bubbly-card p-4 flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${t.completed ? 'bg-secondary' : 'bg-primary'}`} />
                      <span className={`text-[13px] font-medium ${t.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{t.title}</span>
                      {t.time && <span className="text-[11px] text-muted-foreground ml-auto">{t.time}</span>}
                    </div>
                  ))}
                </div>
              )}

              {dumpsForDay.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">Dumps</p>
                  {dumpsForDay.map((d) => (
                    <div key={d.id} className="bubbly-card p-5">
                      <p className="text-[13px] font-mono text-muted-foreground">"{d.rawText}"</p>
                    </div>
                  ))}
                </div>
              )}

              {tasksForDay.length === 0 && dumpsForDay.length === 0 && (
                <p className="text-muted-foreground text-[14px]">Nothing on this day ✨</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CalendarPage;
