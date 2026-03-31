import { LayoutDashboard, Clock, Calendar, Settings, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'Task Vault', icon: FolderOpen },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const AppSidebar = ({ activeTab, onTabChange, collapsed, onToggle }: AppSidebarProps) => {
  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-screen flex flex-col overflow-hidden shrink-0 glass-card rounded-none rounded-r-[32px] border-l-0"
    >
      {/* Logo & burger */}
      <div className="px-4 pt-6 pb-4">
        <button onClick={onToggle} className="flex items-center gap-3 group">
          <motion.div
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.08 }}
            className="w-11 h-11 rounded-[18px] bg-primary/8 flex items-center justify-center"
          >
            <div className="flex flex-col gap-[4px]">
              <motion.span className="block w-[18px] h-[2.5px] rounded-full bg-foreground/70" />
              <motion.span animate={{ width: collapsed ? 18 : 12 }} className="block h-[2.5px] rounded-full bg-foreground/70" />
              <motion.span className="block w-[18px] h-[2.5px] rounded-full bg-foreground/70" />
            </div>
          </motion.div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[18px] tracking-[0.25em] font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              FOCUS
            </motion.span>
          )}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-3 py-3.5 rounded-[18px] transition-colors relative ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/8 rounded-[18px]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className="w-[20px] h-[20px] relative z-10 shrink-0" strokeWidth={2} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium text-[14px] relative z-10 whitespace-nowrap"
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
