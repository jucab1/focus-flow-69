import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

const SettingsPage = () => (
  <div className="flex-1 p-6 md:p-8 overflow-auto">
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-1">Settings ⚙️</h1>
      <p className="text-muted-foreground text-sm">Customize your Focus experience.</p>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15 }}
      className="mt-8 bubbly-card p-12 flex flex-col items-center justify-center text-center"
    >
      <Settings className="w-16 h-16 text-primary/30 mb-4" />
      <p className="text-muted-foreground font-semibold">Settings coming soon</p>
      <p className="text-sm text-muted-foreground mt-1">Themes, notifications & more ✨</p>
    </motion.div>
  </div>
);

export default SettingsPage;
