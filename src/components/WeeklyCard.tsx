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
      <div className="gradient-lavender px-7 py-5">
        <h3 className="font-heading font-bold text-[15px] text-primary-foreground tracking-tight">📅 Weekly Grind</h3>
      </div>
      <div className="p-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 min-w-max snap-x snap-mandatory">
          {tasksByDay.map(({ day, tasks: dayTasks, isToday }, i) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: isToday ? 1.1 : 1 }}
              transition={{ delay: 0.25 + i * 0.04 }}
              whileHover={{ scale: isToday ? 1.12 : 1.04, y: -2 }}
              className={`w-[120px] shrink-0 rounded-[18px] p-3.5 flex flex-col gap-2 snap-center relative ${
                isToday
                  ? 'bg-primary/8 ring-1 ring-primary/20'
                  : 'bg-muted/40'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`font-heading font-bold text-[13px] ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {day}
                </span>
                {isToday && (
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
              {dayTasks.length === 0 ? (
                <span className="text-[11px] text-muted-foreground">Free ✨</span>
              ) : (
                dayTasks.map((t) => (
                  <div key={t.id} className="text-[11px] text-foreground bg-card rounded-[12px] px-2.5 py-1.5 border border-border">
                    {t.title}
                    {t.time && <span className="block text-muted-foreground mt-0.5 text-[10px]">{t.time}</span>}
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
