export type TaskTag = 'finance' | 'personal' | 'academic' | 'trading' | 'university';

export const tagColors: Record<TaskTag, string> = {
  finance: 'bg-[hsl(262,58%,65%)] text-white',
  personal: 'bg-[hsl(160,52%,50%)] text-white',
  academic: 'bg-[hsl(0,68%,60%)] text-white',
  trading: 'bg-[hsl(45,90%,55%)] text-white',
  university: 'bg-[hsl(210,70%,55%)] text-white',
};

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: 'urgent' | 'weekly';
  date: string;
  time?: string;
  tag?: TaskTag;
  bucket?: string;
}

export interface HistoryItem {
  id: string;
  rawText: string;
  extractedTasks: number;
  extractedEvents: number;
  timestamp: Date;
  tags?: TaskTag[];
}

export const initialTasks: Task[] = [
  { id: '1', title: 'Finance Quiz @ 2 PM', completed: false, category: 'urgent', date: 'today', time: '2:00 PM', tag: 'finance', bucket: 'Finance 101' },
  { id: '2', title: 'Submit Lab Report', completed: false, category: 'urgent', date: 'today', time: '5:00 PM', tag: 'academic', bucket: 'Finance 101' },
  { id: '3', title: 'Email Prof. about extension', completed: true, category: 'urgent', date: 'today', tag: 'university', bucket: 'Finance 101' },
  { id: '4', title: 'Group project meeting', completed: false, category: 'weekly', date: 'Mon', tag: 'university', bucket: 'Finance 101' },
  { id: '5', title: 'Read Ch. 7 Macroeconomics', completed: false, category: 'weekly', date: 'Mon', tag: 'academic', bucket: 'Finance 101' },
  { id: '6', title: 'Gym session', completed: false, category: 'weekly', date: 'Tue', tag: 'personal', bucket: 'Personal' },
  { id: '7', title: 'Start essay outline', completed: false, category: 'weekly', date: 'Wed', tag: 'academic', bucket: 'Finance 101' },
  { id: '8', title: 'Dentist appointment', completed: false, category: 'weekly', date: 'Wed', time: '10:00 AM', tag: 'personal', bucket: 'Personal' },
  { id: '9', title: 'Code review PR #42', completed: false, category: 'weekly', date: 'Thu', tag: 'trading', bucket: 'Trading' },
  { id: '10', title: 'Meal prep Sunday', completed: false, category: 'weekly', date: 'Sun', tag: 'personal', bucket: 'Personal' },
];

export const initialHistory: HistoryItem[] = [
  {
    id: 'h1',
    rawText: "ok so I have this finance quiz at 2 and I still havent studied, also need to submit that lab report by tonight and oh yeah email my prof about the extension thing",
    extractedTasks: 3,
    extractedEvents: 1,
    timestamp: new Date(),
    tags: ['finance', 'academic', 'university'],
  },
  {
    id: 'h2',
    rawText: "monday group project meeting, need to read chapter 7 before that. also gym tuesday, essay outline wednesday, and dentist at 10am wednesday too",
    extractedTasks: 4,
    extractedEvents: 2,
    timestamp: new Date(Date.now() - 86400000),
    tags: ['university', 'academic', 'personal'],
  },
  {
    id: 'h3',
    rawText: "code review for PR 42 sometime thursday, meal prep on sunday, don't forget to buy groceries before that",
    extractedTasks: 3,
    extractedEvents: 0,
    timestamp: new Date(Date.now() - 86400000 * 3),
    tags: ['trading', 'personal'],
  },
];

export const aiQuotes = [
  "The secret of getting ahead is getting started. — Mark Twain",
  "Focus on being productive instead of busy. — Tim Ferriss",
  "It's not that I'm so smart, it's just that I stay with problems longer. — Einstein",
  "Do the hard jobs first. The easy jobs will take care of themselves. — Dale Carnegie",
  "Action is the foundational key to all success. — Pablo Picasso",
  "Your future is created by what you do today, not tomorrow. — Robert Kiyosaki",
  "The only way to do great work is to love what you do. — Steve Jobs",
];

export type ThemeId = 'default' | 'solana-night' | 'sakura-study' | 'finance-grind';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  emoji: string;
  description: string;
  className: string;
}

export const themes: ThemeConfig[] = [
  { id: 'default', name: 'Off-White Zen', emoji: '🌤️', description: 'Clean pastels, calm vibes', className: '' },
  { id: 'solana-night', name: 'Solana Night', emoji: '🌙', description: 'Dark mode, neon green accents', className: 'theme-solana' },
  { id: 'sakura-study', name: 'Sakura Study', emoji: '🌸', description: 'Soft pink & white serenity', className: 'theme-sakura' },
  { id: 'finance-grind', name: 'Finance Grind', emoji: '📊', description: 'Industrial dark, amber focus', className: 'theme-finance' },
];
