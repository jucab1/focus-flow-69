import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Task } from '@/lib/store';
import TaskBadge from './TaskBadge';

interface UrgentCardProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onTaskClick?: (task: Task) => void;
}

const UrgentCard = ({ tasks, onToggle, onTaskClick }: UrgentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bubbly-card overflow-hidden"
    >
      <div className="gradient-coral px-7 py-5">
        <h3 className="font-heading font-bold text-[15px] text-accent-foreground tracking-tight">🔥 Urgent</h3>
      </div>
      <div className="p-5 flex flex-col gap-1.5">
        {tasks.map((task, i) => (
          <motion.button
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTaskClick?.(task)}
            className="flex items-center gap-3 p-3.5 rounded-[18px] hover:bg-muted/40 transition-colors text-left"
          >
            <div
              className="relative"
              onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
            >
              <motion.div
                className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  task.completed ? 'bg-secondary border-secondary' : 'border-muted-foreground/30'
                }`}
                whileTap={{ scale: 1.4 }}
              >
                <AnimatePresence>
                  {task.completed && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check className="w-3 h-3 text-secondary-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
              <span className={`text-[13px] font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </span>
              {task.tag && <TaskBadge tag={task.tag} />}
              {task.time && (
                <span className="text-[12px] text-muted-foreground">{task.time}</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default UrgentCard;
