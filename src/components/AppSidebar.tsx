import { LayoutDashboard, Clock, Calendar, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const AppSidebar = ({ activeTab, onTabChange, collapsed, onToggle }: AppSidebarProps) => {
  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-screen bg-card border-r border-border flex flex-col overflow-hidden shrink-0"
    >
      {/* Burger */}
      <button
        onClick={onToggle}
        className="p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors"
      >
        <motion.div
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-bubbly bg-primary/10 flex items-center justify-center"
        >
          <div className="flex flex-col gap-[3px]">
            <motion.span animate={{ rotate: collapsed ? 0 : 0 }} className="block w-5 h-[3px] rounded-full bg-primary" />
            <motion.span animate={{ width: collapsed ? 20 : 14 }} className="block h-[3px] rounded-full bg-primary" />
            <motion.span className="block w-5 h-[3px] rounded-full bg-primary" />
          </div>
        </motion.div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-heading font-bold text-xl text-foreground"
          >
            Focus.
          </motion.span>
        )}
      </button>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 px-3 py-3 rounded-bubbly transition-colors relative ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-bubbly"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className="w-5 h-5 relative z-10 shrink-0" strokeWidth={2.5} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-semibold text-sm relative z-10 whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default AppSidebar;
