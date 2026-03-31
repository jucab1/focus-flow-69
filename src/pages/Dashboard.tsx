import { useState } from 'react';
import { motion } from 'framer-motion';
import MessageBar from '@/components/MessageBar';
import UrgentCard from '@/components/UrgentCard';
import WeeklyCard from '@/components/WeeklyCard';
import FocusScore from '@/components/FocusScore';
import DailyFuel from '@/components/DailyFuel';
import { Task, HistoryItem } from '@/lib/store';

interface DashboardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
  onTaskClick: (task: Task) => void;
}

const floatAnimation = {
  y: [0, -3, 0],
  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const },
};

const Dashboard = ({ tasks, setTasks, history, setHistory, onTaskClick }: DashboardProps) => {
  const [messageBarActive, setMessageBarActive] = useState(false);

  const urgentTasks = tasks.filter((t) => t.category === 'urgent');
  const weeklyTasks = tasks.filter((t) => t.category === 'weekly');
  const completedCount = tasks.filter((t) => t.completed).length;

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleSubmit = (text: string) => {
    const tags = (['finance', 'personal', 'academic'] as const).slice(0, Math.floor(Math.random() * 3) + 1);
    const newHistory: HistoryItem = {
      id: `h${Date.now()}`,
      rawText: text,
      extractedTasks: Math.floor(Math.random() * 4) + 1,
      extractedEvents: Math.floor(Math.random() * 2),
      timestamp: new Date(),
      tags: [...tags],
    };
    setHistory([newHistory, ...history]);
    setMessageBarActive(false);
  };

  return (
    <div className="flex-1 p-10 md:p-14 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <MessageBar onSubmit={handleSubmit} />
        </div>

        <motion.div
          animate={{
            opacity: messageBarActive ? 0 : 1,
            scale: messageBarActive ? 0.95 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          {/* Task cards row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div animate={floatAnimation}>
              <UrgentCard tasks={urgentTasks} onToggle={toggleTask} onTaskClick={onTaskClick} />
            </motion.div>
            <motion.div animate={floatAnimation}>
              <WeeklyCard tasks={weeklyTasks} />
            </motion.div>
          </div>

          {/* Bottom widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div animate={floatAnimation}>
              <FocusScore completed={completedCount} total={tasks.length} />
            </motion.div>
            <motion.div animate={floatAnimation}>
              <DailyFuel />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
