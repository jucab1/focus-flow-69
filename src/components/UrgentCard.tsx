import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Task } from '@/lib/store';

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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(task.id)}
            className="flex items-center gap-3 p-3 rounded-bubbly hover:bg-muted/50 transition-colors text-left"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
              task.completed ? 'bg-secondary border-secondary' : 'border-coral'
            }`}>
              {task.completed && <Check className="w-3.5 h-3.5 text-secondary-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-sm font-semibold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </span>
              {task.time && (
                <span className="text-xs text-muted-foreground ml-2">{task.time}</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default UrgentCard;
