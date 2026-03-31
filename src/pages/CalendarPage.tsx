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

  const dumpsForDay = useMemo(() => {
    if (selectedDay === null) return [];
    return history.filter((h) => {
      const d = h.timestamp;
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDay;
    });
  }, [selectedDay, history, year, month]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-1">Calendar 📆</h1>
        <p className="text-muted-foreground text-sm">Your month at a glance.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-8 bubbly-card overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevMonth}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <span className="font-heading font-bold text-lg text-foreground">{monthName}</span>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextMonth}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 px-4 pt-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="text-center text-xs font-bold text-muted-foreground py-2">{d}</div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 px-4 pb-4 gap-1">
          {daySlots.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />;
            const isToday = isCurrentMonth && day === todayDate.getDate();
            const isSelected = day === selectedDay;
            const hasDumps = history.some((h) => {
              const d = h.timestamp;
              return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
            });

            return (
              <motion.button
                key={day}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                className={`aspect-square rounded-[16px] flex flex-col items-center justify-center text-sm font-semibold relative transition-colors ${
                  isSelected
                    ? 'gradient-lavender text-primary-foreground'
                    : isToday
                    ? 'bg-primary/10 text-primary ring-2 ring-primary/30'
                    : 'hover:bg-muted/60 text-foreground'
                }`}
              >
                {day}
                {hasDumps && !isSelected && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Selected day dumps */}
      <AnimatePresence>
        {selectedDay !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6"
          >
            <h3 className="font-heading font-bold text-base text-foreground mb-3">
              Dumps for {monthName.split(' ')[0]} {selectedDay}
            </h3>
            {dumpsForDay.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nothing dumped on this day ✨</p>
            ) : (
              <div className="space-y-3">
                {dumpsForDay.map((d) => (
                  <div key={d.id} className="bubbly-card p-4">
                    <p className="text-sm font-mono text-muted-foreground">"{d.rawText}"</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarPage;
