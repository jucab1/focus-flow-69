import { motion } from 'framer-motion';
import MessageBar from '@/components/MessageBar';
import { Task, HistoryItem } from '@/lib/store';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskBadge from '@/components/TaskBadge';

interface DashboardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onSubmit: (text: string) => void;
}

const Dashboard = ({ tasks, setTasks, onEditTask, onDeleteTask, onSubmit }: DashboardProps) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const nextTasks = tasks.filter((t) => !t.completed).slice(0, 3);

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="flex-1 p-10 md:p-14 overflow-auto">
      <div className="max-w-2xl mx-auto">
        {/* Hero: Focus Bar */}
        <div className="mt-[15vh] mb-16">
          <MessageBar onSubmit={onSubmit} />
        </div>

        {/* Next 3 Tasks */}
        {nextTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-heading font-bold text-[13px] text-muted-foreground tracking-wide uppercase mb-5">
              Up Next
            </h2>
            <div className="space-y-3">
              {nextTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className="matte-card px-6 py-4 flex items-center gap-4 group"
                >
                  <motion.button
                    whileTap={{ scale: 1.4 }}
                    onClick={() => toggleTask(task.id)}
                    className="w-[22px] h-[22px] rounded-full border-2 border-muted-foreground/30 hover:border-primary/50 flex items-center justify-center shrink-0 transition-colors"
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
                    <span className="text-[14px] font-medium text-foreground">{task.title}</span>
                    {task.tag && <TaskBadge tag={task.tag} />}
                    {task.time && <span className="text-[12px] text-muted-foreground">{task.time}</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEditTask(task)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </motion.button>

                  {confirmDeleteId === task.id ? (
                    <div className="flex items-center gap-1">
                      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => { onDeleteTask(task.id); setConfirmDeleteId(null); }}
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
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
