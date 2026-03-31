import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBar from '@/components/MessageBar';
import UrgentCard from '@/components/UrgentCard';
import WeeklyCard from '@/components/WeeklyCard';
import { initialTasks, initialHistory, Task, HistoryItem } from '@/lib/store';

interface DashboardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
}

const Dashboard = ({ tasks, setTasks, history, setHistory }: DashboardProps) => {
  const [messageBarActive, setMessageBarActive] = useState(false);

  const urgentTasks = tasks.filter((t) => t.category === 'urgent');
  const weeklyTasks = tasks.filter((t) => t.category === 'weekly');

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleSubmit = (text: string) => {
    const newHistory: HistoryItem = {
      id: `h${Date.now()}`,
      rawText: text,
      extractedTasks: Math.floor(Math.random() * 4) + 1,
      extractedEvents: Math.floor(Math.random() * 2),
      timestamp: new Date(),
    };
    setHistory([newHistory, ...history]);
    setMessageBarActive(false);
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2"
      >
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-1">
          Good vibes only ✨
        </h1>
        <p className="text-muted-foreground text-sm">Let's make today count.</p>
      </motion.div>

      <div className="mt-6">
        <MessageBar onSubmit={handleSubmit} />
      </div>

      <motion.div
        animate={{
          opacity: messageBarActive ? 0 : 1,
          scale: messageBarActive ? 0.95 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <UrgentCard tasks={urgentTasks} onToggle={toggleTask} />
        <WeeklyCard tasks={weeklyTasks} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
