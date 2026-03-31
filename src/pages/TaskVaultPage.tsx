import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check } from 'lucide-react';
import { Task, TaskTag, tagColors } from '@/lib/store';
import TaskBadge from '@/components/TaskBadge';

interface TaskVaultPageProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

const filterPills: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'University', value: 'university' },
  { label: 'Trading', value: 'trading' },
  { label: 'Finance', value: 'finance' },
  { label: 'Personal', value: 'personal' },
];

const TaskVaultPage = ({ tasks, onToggle }: TaskVaultPageProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

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
    <div className="flex-1 p-6 md:p-8 overflow-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-1">Task Vault 🗂️</h1>
          <p className="text-muted-foreground text-sm">All your tasks in bubbly buckets.</p>
        </div>

        {/* Morphing search */}
        <motion.div
          layout
          className="flex items-center"
        >
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.div
                key="input"
                initial={{ width: 40 }}
                animate={{ width: 260 }}
                exit={{ width: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex items-center bg-muted rounded-full px-3 py-2 gap-2"
              >
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              >
                <Search className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Pill filters */}
      <div className="mt-6 flex gap-2 flex-wrap sticky top-0 z-10 bg-background py-2">
        {filterPills.map((pill) => (
          <motion.button
            key={pill.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(pill.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeFilter === pill.value
                ? 'gradient-lavender text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {pill.label}
          </motion.button>
        ))}
      </div>

      {/* Buckets */}
      <div className="mt-6 space-y-6">
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
              <div className="px-6 py-4 bg-muted/30 border-b border-border">
                <h3 className="font-heading font-bold text-base text-foreground">📦 {bucket}</h3>
                <p className="text-xs text-muted-foreground">{bTasks.length} task{bTasks.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {bTasks.map((task, i) => (
                  <motion.button
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: bi * 0.05 + i * 0.03 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 25px -5px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onToggle(task.id)}
                    className="flex items-center gap-3 p-3 rounded-[20px] hover:bg-muted/50 transition-colors text-left"
                  >
                    <motion.div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        task.completed ? 'bg-secondary border-secondary' : 'border-primary'
                      }`}
                      whileTap={{ scale: 1.4 }}
                    >
                      <AnimatePresence>
                        {task.completed && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="w-3.5 h-3.5 text-secondary-foreground" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <span className={`text-sm font-semibold flex-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </span>
                    {task.tag && <TaskBadge tag={task.tag} />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {buckets.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground py-12">
            No tasks match your search.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default TaskVaultPage;
