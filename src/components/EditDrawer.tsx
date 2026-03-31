import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarDays, Clock, Tag } from 'lucide-react';
import { Task, TaskTag, tagColors } from '@/lib/store';

interface EditDrawerProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const allTags: TaskTag[] = ['finance', 'personal', 'academic', 'trading', 'university'];

const EditDrawer = ({ task, open, onClose, onSave }: EditDrawerProps) => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<TaskTag | undefined>();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setTag(task.tag);
      setDate(task.date || '');
      setStartTime(task.time?.split(' - ')[0] || '');
      setEndTime(task.time?.split(' - ')[1] || '');
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;
    const timeStr = startTime && endTime ? `${startTime} - ${endTime}` : startTime || task.time;
    onSave({ ...task, title, tag, date, time: timeStr });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && task && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-foreground/5 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md rounded-l-[36px] flex flex-col overflow-hidden shadow-2xl"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              WebkitBackdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              borderRight: 'none',
            }}
          >
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <span className="text-muted-foreground text-[13px] font-medium tracking-wide uppercase">Edit Task</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-auto px-8 pb-8 space-y-8">
              <div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent outline-none text-[24px] font-bold text-foreground placeholder:text-muted-foreground tracking-tight"
                  placeholder="Task name"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="w-4 h-4" />
                  <span className="text-[13px] font-medium">Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((t) => (
                    <motion.button
                      key={t}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTag(t)}
                      className={`px-4 py-2 rounded-full text-[13px] font-medium capitalize transition-colors ${
                        tag === t ? tagColors[t] : 'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-[13px] font-medium">Due Date</span>
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-muted/50 rounded-[16px] px-4 py-3 text-[14px] text-foreground outline-none border border-border/30"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-[13px] font-medium">Time Range</span>
                </div>
                <div className="flex gap-3">
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1 bg-muted/50 rounded-[16px] px-4 py-3 text-[14px] text-foreground outline-none border border-border/30" />
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1 bg-muted/50 rounded-[16px] px-4 py-3 text-[14px] text-foreground outline-none border border-border/30" />
                </div>
              </div>
            </div>

            <div className="p-8 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="bubbly-btn shimmer-btn w-full py-4 gradient-lavender text-primary-foreground text-[15px] font-semibold"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditDrawer;
