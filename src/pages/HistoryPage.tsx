import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import { HistoryItem } from '@/lib/store';

interface HistoryPageProps {
  history: HistoryItem[];
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return 'Last Week';
}

function groupByDate(items: HistoryItem[]): Record<string, HistoryItem[]> {
  const groups: Record<string, HistoryItem[]> = {};
  items.forEach((item) => {
    const key = formatRelativeDate(item.timestamp);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
}

const HistoryPage = ({ history }: HistoryPageProps) => {
  const groups = groupByDate(history);

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-1">
          Memory Lane 🧠
        </h1>
        <p className="text-muted-foreground text-sm">Everything you've dumped, organized.</p>
      </motion.div>

      <div className="mt-8 space-y-8">
        {Object.entries(groups).map(([date, items], gi) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-heading font-bold text-sm text-primary">{date}</span>
            </div>
            <div className="space-y-3 ml-2 border-l-2 border-primary/20 pl-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="bubbly-card p-5"
                >
                  <p className="text-sm text-foreground leading-relaxed mb-3">"{item.rawText}"</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lavender-light text-xs font-semibold text-foreground">
                      <Sparkles className="w-3 h-3 text-primary" />
                      AI found {item.extractedTasks} Task{item.extractedTasks !== 1 ? 's' : ''}
                      {item.extractedEvents > 0 && ` and ${item.extractedEvents} Event${item.extractedEvents !== 1 ? 's' : ''}`}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {history.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">No dumps yet. Go vibe-check yourself!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
