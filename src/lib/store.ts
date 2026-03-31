export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: 'urgent' | 'weekly';
  date: string;
  time?: string;
}

export interface HistoryItem {
  id: string;
  rawText: string;
  extractedTasks: number;
  extractedEvents: number;
  timestamp: Date;
}

export const initialTasks: Task[] = [
  { id: '1', title: 'Finance Quiz @ 2 PM', completed: false, category: 'urgent', date: 'today', time: '2:00 PM' },
  { id: '2', title: 'Submit Lab Report', completed: false, category: 'urgent', date: 'today', time: '5:00 PM' },
  { id: '3', title: 'Email Prof. about extension', completed: true, category: 'urgent', date: 'today' },
  { id: '4', title: 'Group project meeting', completed: false, category: 'weekly', date: 'Mon' },
  { id: '5', title: 'Read Ch. 7 Macroeconomics', completed: false, category: 'weekly', date: 'Mon' },
  { id: '6', title: 'Gym session', completed: false, category: 'weekly', date: 'Tue' },
  { id: '7', title: 'Start essay outline', completed: false, category: 'weekly', date: 'Wed' },
  { id: '8', title: 'Dentist appointment', completed: false, category: 'weekly', date: 'Wed', time: '10:00 AM' },
  { id: '9', title: 'Code review PR #42', completed: false, category: 'weekly', date: 'Thu' },
  { id: '10', title: 'Meal prep Sunday', completed: false, category: 'weekly', date: 'Sun' },
];

export const initialHistory: HistoryItem[] = [
  {
    id: 'h1',
    rawText: "ok so I have this finance quiz at 2 and I still havent studied, also need to submit that lab report by tonight and oh yeah email my prof about the extension thing",
    extractedTasks: 3,
    extractedEvents: 1,
    timestamp: new Date(),
  },
  {
    id: 'h2',
    rawText: "monday group project meeting, need to read chapter 7 before that. also gym tuesday, essay outline wednesday, and dentist at 10am wednesday too",
    extractedTasks: 4,
    extractedEvents: 2,
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: 'h3',
    rawText: "code review for PR 42 sometime thursday, meal prep on sunday, don't forget to buy groceries before that",
    extractedTasks: 3,
    extractedEvents: 0,
    timestamp: new Date(Date.now() - 86400000 * 3),
  },
];
