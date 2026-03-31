import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Task } from '@/lib/store';
import TaskBadge from './TaskBadge';

interface UrgentCardProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

const UrgentCard = ({ tasks, onToggle }: UrgentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bubbly-card overflow-hidden"
    >
      <div className="gradient-coral px-6 py-4">
        <h3 className="font-heading font-bold text-lg text-accent-foreground">🔥 Urgent</h3>
      </div>
      <div className="p-4 flex flex-col gap-2">
        {tasks.map((task, i) => (
          <motion.button
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 25px -5px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onToggle(task.id)}
            className="flex items-center gap-3 p-3 rounded-[20px] hover:bg-muted/50 transition-colors text-left"
          >
            <div className="relative">
              <motion.div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  task.completed ? 'bg-secondary border-secondary' : 'border-coral'
                }`}
                whileTap={{ scale: 1.4 }}
              >
                <AnimatePresence>
                  {task.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-3.5 h-3.5 text-secondary-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
              <span className={`text-sm font-semibold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </span>
              {task.tag && <TaskBadge tag={task.tag} />}
              {task.time && (
                <span className="text-xs text-muted-foreground">{task.time}</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default UrgentCard;
