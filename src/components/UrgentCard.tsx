import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { Task } from '@/lib/store';
import TaskBadge from './TaskBadge';

interface UrgentCardProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

const UrgentCard = ({ tasks, onToggle, onEditTask, onDeleteTask }: UrgentCardProps) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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
        <AnimatePresence>
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: task.completed ? 0.4 : 1, x: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ delay: task.completed ? 0 : 0.15 + i * 0.05, duration: task.completed ? 1.5 : 0.3 }}
              className="flex items-center gap-3 p-3.5 rounded-[18px] hover:bg-muted/40 transition-colors group"
            >
              <motion.button
                whileTap={{ scale: 1.4 }}
                onClick={() => onToggle(task.id)}
                className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  task.completed ? 'bg-secondary border-secondary' : 'border-muted-foreground/30 hover:border-primary/50'
                }`}
              >
                <AnimatePresence>
                  {task.completed && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check className="w-3 h-3 text-secondary-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                <span className={`text-[13px] font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {task.title}
                </span>
                {task.tag && <TaskBadge tag={task.tag} />}
                {task.time && <span className="text-[12px] text-muted-foreground">{task.time}</span>}
              </div>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEditTask?.(task)}
                className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Pencil className="w-3.5 h-3.5" />
              </motion.button>

              {confirmDeleteId === task.id ? (
                <div className="flex items-center gap-1">
                  <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ scale: 0.9 }}
                    onClick={() => { onDeleteTask?.(task.id); setConfirmDeleteId(null); }}
                    className="px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-[11px] font-medium"
                  >Delete</motion.button>
                  <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setConfirmDeleteId(null)}
                    className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-[11px] font-medium"
                  >Cancel</motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setConfirmDeleteId(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UrgentCard;
