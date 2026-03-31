import { motion } from 'framer-motion';
import { Task } from '@/lib/store';

interface WeeklyCardProps {
  tasks: Task[];
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });

const WeeklyCard = ({ tasks }: WeeklyCardProps) => {
  const tasksByDay = days.map((day) => ({
    day,
    tasks: tasks.filter((t) => t.date === day),
    isToday: day === today,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bubbly-card overflow-hidden"
    >
      <div className="gradient-lavender px-6 py-4">
        <h3 className="font-heading font-bold text-lg text-primary-foreground">📅 Weekly Grind</h3>
      </div>
      <div className="p-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 min-w-max snap-x snap-mandatory">
          {tasksByDay.map(({ day, tasks: dayTasks, isToday }, i) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: isToday ? 1.1 : 1 }}
              transition={{ delay: 0.25 + i * 0.04 }}
              whileHover={{ scale: isToday ? 1.13 : 1.05, y: -2 }}
              className={`w-32 shrink-0 rounded-[20px] p-3 flex flex-col gap-2 snap-center relative ${
                isToday
                  ? 'bg-primary/10 ring-2 ring-primary/40 shadow-[0_0_20px_hsl(262,83%,68%,0.3)]'
                  : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`font-heading font-bold text-sm ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {day}
                </span>
                {isToday && (
                  <motion.span
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
              {dayTasks.length === 0 ? (
                <span className="text-xs text-muted-foreground italic">Free ✨</span>
              ) : (
                dayTasks.map((t) => (
                  <div key={t.id} className="text-xs text-foreground bg-card rounded-xl px-2 py-1.5 shadow-sm">
                    {t.title}
                    {t.time && <span className="block text-muted-foreground mt-0.5">{t.time}</span>}
                  </div>
                ))
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyCard;
