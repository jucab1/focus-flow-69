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
      className="bubbly-card p-6 flex flex-col items-center text-center"
    >
      <Flame className="w-6 h-6 text-accent mb-2" />
      <h3 className="font-heading font-bold text-sm text-muted-foreground mb-3">Daily Fuel</h3>
      <p className="text-foreground text-sm italic leading-relaxed font-serif">
        "{quote}"
      </p>
    </motion.div>
  );
};

export default DailyFuel;
