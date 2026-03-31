import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check, Pencil, Trash2 } from 'lucide-react';
import { Task } from '@/lib/store';
import TaskBadge from '@/components/TaskBadge';

interface TaskVaultPageProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

const filterPills: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'University', value: 'university' },
  { label: 'Trading', value: 'trading' },
  { label: 'Finance', value: 'finance' },
  { label: 'Personal', value: 'personal' },
];

const TaskVaultPage = ({ tasks, onToggle, onEditTask, onDeleteTask }: TaskVaultPageProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = tasks;
    if (activeFilter !== 'all') {
      result = result.filter((t) => t.tag === activeFilter || t.bucket?.toLowerCase().includes(activeFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q) || t.bucket?.toLowerCase().includes(q));
    }
    return result;
  }, [tasks, activeFilter, searchQuery]);

  const buckets = useMemo(() => {
    const map: Record<string, Task[]> = {};
    filtered.forEach((t) => {
      const b = t.bucket || 'Uncategorized';
      if (!map[b]) map[b] = [];
      map[b].push(t);
    });
    return Object.entries(map);
  }, [filtered]);

  return (
    <div className="flex-1 p-10 md:p-14 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-[28px] text-foreground tracking-tight">Task Vault</h1>
            <p className="text-muted-foreground text-[14px] mt-1">All your tasks, organized.</p>
          </div>

          <motion.div layout className="flex items-center">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="input"
                  initial={{ width: 40 }}
                  animate={{ width: 240 }}
                  exit={{ width: 40 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex items-center glass-card rounded-full px-4 py-2.5 gap-2"
                >
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks..."
                    className="flex-1 bg-transparent outline-none text-[13px] text-foreground placeholder:text-muted-foreground"
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="icon"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchOpen(true)}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <div className="mt-8 flex gap-2 flex-wrap sticky top-0 z-10 py-3 -mx-2 px-2">
          {filterPills.map((pill) => (
            <motion.button
              key={pill.value}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(pill.value)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                activeFilter === pill.value
                  ? 'gradient-lavender text-primary-foreground'
                  : 'glass-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {pill.label}
            </motion.button>
          ))}
        </div>

        <div className="mt-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {buckets.map(([bucket, bTasks], bi) => (
              <motion.div
                key={bucket}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: bi * 0.05 }}
                className="bubbly-card overflow-hidden"
              >
                <div className="px-7 py-5 border-b border-border/30">
                  <h3 className="font-heading font-bold text-[14px] text-foreground tracking-tight">{bucket}</h3>
                  <p className="text-[12px] text-muted-foreground">{bTasks.length} task{bTasks.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  {bTasks.map((task, i) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: task.completed ? 0.4 : 1, x: 0 }}
                      transition={{ delay: bi * 0.05 + i * 0.03, duration: task.completed ? 1.5 : 0.3 }}
                      className="flex items-center gap-3 p-3.5 rounded-[18px] hover:bg-muted/20 transition-colors group"
                    >
                      <motion.button
                        className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          task.completed ? 'bg-secondary border-secondary' : 'border-muted-foreground/30 hover:border-primary/50'
                        }`}
                        whileTap={{ scale: 1.4 }}
                        onClick={() => onToggle(task.id)}
                      >
                        <AnimatePresence>
                          {task.completed && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check className="w-3 h-3 text-secondary-foreground" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                      <span className={`text-[13px] font-medium flex-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </span>
                      {task.tag && <TaskBadge tag={task.tag} />}

                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEditTask?.(task)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40"
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
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {buckets.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground py-16">
              No tasks match your search.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskVaultPage;
