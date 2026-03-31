import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import AppSidebar from '@/components/AppSidebar';
import EditDrawer from '@/components/EditDrawer';
import Dashboard from '@/pages/Dashboard';
import HistoryPage from '@/pages/HistoryPage';
import CalendarPage from '@/pages/CalendarPage';
import SettingsPage from '@/pages/SettingsPage';
import TaskVaultPage from '@/pages/TaskVaultPage';
import { initialTasks, initialHistory, Task, HistoryItem, ThemeId, themes } from '@/lib/store';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('default');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleThemeChange = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    const root = document.documentElement;
    root.classList.remove('theme-solana', 'theme-sakura', 'theme-finance', 'dark');
    const theme = themes.find((t) => t.id === themeId);
    if (theme?.className) {
      root.classList.add(theme.className);
      if (themeId === 'solana-night' || themeId === 'finance-grind') {
        root.classList.add('dark');
      }
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDrawerOpen(true);
  };

  const handleTaskSave = (updated: Task) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast.success('Task deleted');
  };

  const handleSubmit = (text: string) => {
    // Add a single task with the exact text
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: text,
      completed: false,
      category: 'urgent',
      date: 'today',
      tag: 'personal',
      bucket: 'Personal',
    };
    setTasks((prev) => [newTask, ...prev]);

    // Add to history
    const newHistory: HistoryItem = {
      id: `h${Date.now()}`,
      rawText: text,
      extractedTasks: 1,
      extractedEvents: 0,
      timestamp: new Date(),
      tags: ['personal'],
    };
    setHistory([newHistory, ...history]);
    toast.success('Task logged!');
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard tasks={tasks} setTasks={setTasks} history={history} setHistory={setHistory} onEditTask={handleEditTask} onDeleteTask={deleteTask} onSubmit={handleSubmit} />;
      case 'tasks':
        return <TaskVaultPage tasks={tasks} onToggle={toggleTask} onEditTask={handleEditTask} onDeleteTask={deleteTask} />;
      case 'history':
        return <HistoryPage history={history} />;
      case 'calendar':
        return <CalendarPage history={history} tasks={tasks} />;
      case 'settings':
        return <SettingsPage currentTheme={currentTheme} onThemeChange={handleThemeChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full mesh-bg grainy">
      <AppSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col min-w-0"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <EditDrawer
        task={editingTask}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleTaskSave}
      />
    </div>
  );
};

export default Index;
