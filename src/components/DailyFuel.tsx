import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { aiQuotes } from '@/lib/store';
import { useMemo } from 'react';

const DailyFuel = () => {
  const quote = useMemo(() => aiQuotes[Math.floor(Math.random() * aiQuotes.length)], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bubbly-card p-8 flex flex-col items-center text-center"
    >
      <Flame className="w-5 h-5 text-accent mb-3" />
      <h3 className="font-heading font-bold text-[13px] text-muted-foreground mb-4 tracking-wide uppercase">Daily Fuel</h3>
      <p className="text-foreground text-[14px] italic leading-relaxed max-w-xs">
        "{quote}"
      </p>
    </motion.div>
  );
};

export default DailyFuel;
