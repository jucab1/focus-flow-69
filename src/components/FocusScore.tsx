import { motion } from 'framer-motion';

interface FocusScoreProps {
  completed: number;
  total: number;
}

const FocusScore = ({ completed, total }: FocusScoreProps) => {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bubbly-card p-8 flex flex-col items-center bg-card/60 backdrop-blur-sm"
    >
      <h3 className="font-heading font-bold text-[13px] text-muted-foreground mb-5 tracking-wide uppercase">Focus Score</h3>
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="5" />
          <motion.circle
            cx="50" cy="50" r="45" fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-heading font-bold text-2xl text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {pct}%
          </motion.span>
        </div>
      </div>
      <p className="text-[12px] text-muted-foreground mt-4">{completed}/{total} tasks done</p>
    </motion.div>
  );
};

export default FocusScore;
