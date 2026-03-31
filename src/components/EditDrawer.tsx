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
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setTag(task.tag);
      setDate(task.date || '');
      setStartTime(task.time?.split(' - ')[0] || '');
      setEndTime(task.time?.split(' - ')[1] || '');
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;
    const timeStr = startTime && endTime ? `${startTime} - ${endTime}` : startTime || task.time;
    onSave({
      ...task,
      title,
      tag,
      date,
      time: timeStr,
      completed,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && task && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-foreground/5 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border rounded-l-[36px] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <span className="text-muted-foreground text-[13px] font-medium tracking-wide uppercase">Edit Task</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto px-8 pb-8 space-y-8">
              {/* Title */}
              <div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent outline-none text-[24px] font-bold text-foreground placeholder:text-muted-foreground tracking-tight"
                  placeholder="Task name"
                />
              </div>

              {/* Tag */}
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
                        tag === t
                          ? tagColors[t]
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Due date */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-[13px] font-medium">Due Date</span>
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-muted rounded-[16px] px-4 py-3 text-[14px] text-foreground outline-none border-0"
                />
              </div>

              {/* Time range */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-[13px] font-medium">Time Range</span>
                </div>
                <div className="flex gap-3">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1 bg-muted rounded-[16px] px-4 py-3 text-[14px] text-foreground outline-none"
                    placeholder="Start"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1 bg-muted rounded-[16px] px-4 py-3 text-[14px] text-foreground outline-none"
                    placeholder="End"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-3">
                <span className="text-[13px] font-medium text-muted-foreground">Status</span>
                <div className="flex gap-3">
                  {[false, true].map((val) => (
                    <motion.button
                      key={String(val)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCompleted(val)}
                      className={`flex-1 py-3 rounded-[16px] text-[14px] font-medium transition-colors ${
                        completed === val
                          ? val
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {val ? 'Done' : 'Not Done'}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Save button */}
            <div className="p-8 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="bubbly-btn shimmer-btn grainy w-full py-4 gradient-lavender text-primary-foreground text-[15px] font-semibold"
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
