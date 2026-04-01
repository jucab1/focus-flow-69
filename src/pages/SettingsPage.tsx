import { motion } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { themes, ThemeId } from '@/lib/store';

interface SettingsPageProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

const themePreviewColors: Record<ThemeId, string[]> = {
  default: ['hsl(262,83%,58%)', 'hsl(160,45%,65%)', 'hsl(16,80%,68%)'],
  'solana-night': ['hsl(160,90%,50%)', 'hsl(240,10%,12%)', 'hsl(262,60%,50%)'],
  'sakura-study': ['hsl(340,70%,75%)', 'hsl(340,50%,92%)', 'hsl(0,0%,100%)'],
  'finance-grind': ['hsl(35,90%,55%)', 'hsl(240,10%,12%)', 'hsl(240,10%,18%)'],
};

const SettingsPage = ({ currentTheme, onThemeChange }: SettingsPageProps) => (
  <div className="flex-1 p-10 md:p-14 overflow-auto">
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading font-bold text-[28px] text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-[14px] mt-1">Customize your Focus experience.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-10"
      >
        <div className="flex items-center gap-2 mb-8">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-[16px] text-foreground tracking-tight">Theme Store</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {themes.map((theme, i) => {
            const isActive = currentTheme === theme.id;
            const colors = themePreviewColors[theme.id];

            return (
              <motion.button
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onThemeChange(theme.id)}
                className={`bubbly-card p-6 text-left relative overflow-hidden ${
                  isActive ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex gap-1.5 mb-4">
                  {colors.map((c, ci) => (
                    <div key={ci} className="h-5 flex-1 rounded-full" style={{ background: c }} />
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{theme.emoji}</span>
                  <span className="font-heading font-bold text-[14px] text-foreground tracking-tight">{theme.name}</span>
                </div>
                <p className="text-[12px] text-muted-foreground">{theme.description}</p>

                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full gradient-lavender flex items-center justify-center"
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
  </div>
);

export default SettingsPage;
