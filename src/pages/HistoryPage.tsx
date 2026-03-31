import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Search } from 'lucide-react';
import { HistoryItem } from '@/lib/store';
import TaskBadge from '@/components/TaskBadge';

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
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return history;
    const q = searchQuery.toLowerCase();
    return history.filter((h) => h.rawText.toLowerCase().includes(q));
  }, [history, searchQuery]);

  const groups = groupByDate(filtered);

  return (
    <div className="flex-1 p-10 md:p-14 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading font-bold text-[28px] text-foreground tracking-tight">Memory Lane</h1>
          <p className="text-muted-foreground text-[14px] mt-1">Everything you've dumped, organized.</p>
        </motion.div>

        {/* Live search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 flex items-center gap-3 bg-muted/50 rounded-full px-5 py-3.5"
        >
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your memory..."
            className="flex-1 bg-transparent outline-none text-[14px] text-foreground placeholder:text-muted-foreground"
          />
        </motion.div>

        <div className="mt-10 space-y-10">
          <AnimatePresence mode="popLayout">
            {Object.entries(groups).map(([date, items], gi) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: gi * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-heading font-bold text-[13px] text-primary tracking-wide">{date}</span>
                </div>
                <div className="space-y-4 ml-2 border-l-2 border-primary/15 pl-7">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: gi * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.005 }}
                      className="bubbly-card p-6"
                    >
                      <p className="text-[13px] leading-relaxed mb-4 font-mono text-muted-foreground">
                        "{item.rawText}"
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lavender-light text-[12px] font-medium text-foreground">
                          <Sparkles className="w-3 h-3 text-primary" />
                          AI found {item.extractedTasks} Task{item.extractedTasks !== 1 ? 's' : ''}
                          {item.extractedEvents > 0 && ` and ${item.extractedEvents} Event${item.extractedEvents !== 1 ? 's' : ''}`}
                        </span>
                        {item.tags?.map((tag) => (
                          <TaskBadge key={tag} tag={tag} />
                        ))}
                        <span className="text-[11px] text-muted-foreground ml-auto">
                          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-muted-foreground text-[15px]">
                {searchQuery ? 'No results found.' : 'No dumps yet. Start dumping!'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
