import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppSidebar from '@/components/AppSidebar';
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

  const handleThemeChange = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    const root = document.documentElement;
    // Remove all theme classes
    root.classList.remove('theme-solana', 'theme-sakura', 'theme-finance', 'dark');
    const theme = themes.find((t) => t.id === themeId);
    if (theme?.className) {
      root.classList.add(theme.className);
      if (themeId === 'solana-night' || themeId === 'finance-grind') {
        root.classList.add('dark');
      }
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard tasks={tasks} setTasks={setTasks} history={history} setHistory={setHistory} />;
      case 'tasks':
        return <TaskVaultPage tasks={tasks} onToggle={toggleTask} />;
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
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="flex-1 flex flex-col min-w-0"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
