import { motion } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { themes, ThemeId } from '@/lib/store';

interface SettingsPageProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

const themePreviewColors: Record<ThemeId, string[]> = {
  default: ['hsl(262,83%,68%)', 'hsl(160,52%,72%)', 'hsl(10,85%,72%)'],
  'solana-night': ['hsl(160,90%,50%)', 'hsl(240,10%,12%)', 'hsl(262,60%,50%)'],
  'sakura-study': ['hsl(340,70%,75%)', 'hsl(340,50%,92%)', 'hsl(0,0%,100%)'],
  'finance-grind': ['hsl(35,90%,55%)', 'hsl(240,10%,12%)', 'hsl(240,10%,18%)'],
};

const SettingsPage = ({ currentTheme, onThemeChange }: SettingsPageProps) => (
  <div className="flex-1 p-6 md:p-8 overflow-auto">
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-1">Settings ⚙️</h1>
      <p className="text-muted-foreground text-sm">Customize your Focus experience.</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Palette className="w-5 h-5 text-primary" />
        <h2 className="font-heading font-bold text-lg text-foreground">Theme Store</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themes.map((theme, i) => {
          const isActive = currentTheme === theme.id;
          const colors = themePreviewColors[theme.id];

          return (
            <motion.button
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px -5px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onThemeChange(theme.id)}
              className={`bubbly-card p-5 text-left relative overflow-hidden ${
                isActive ? 'ring-2 ring-primary' : ''
              }`}
            >
              {/* Color preview bar */}
              <div className="flex gap-1 mb-3">
                {colors.map((c, ci) => (
                  <div key={ci} className="h-6 flex-1 rounded-full" style={{ background: c }} />
                ))}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{theme.emoji}</span>
                <span className="font-heading font-bold text-sm text-foreground">{theme.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{theme.description}</p>

              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full gradient-lavender flex items-center justify-center"
                >
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  </div>
);

export default SettingsPage;
