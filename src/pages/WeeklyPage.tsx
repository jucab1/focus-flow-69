import WeeklyCard from '@/components/WeeklyCard';
import { Task } from '@/lib/store';

interface WeeklyPageProps {
  tasks: Task[];
}

const WeeklyPage = ({ tasks }: WeeklyPageProps) => {
  const weeklyTasks = tasks.filter((t) => t.category === 'weekly');

  return (
    <div className="flex-1 p-10 md:p-14 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading font-bold text-[28px] text-foreground tracking-tight mb-2">Weekly Grind</h1>
        <p className="text-muted-foreground text-[14px] mb-10">Your week at a glance.</p>
        <WeeklyCard tasks={weeklyTasks} />
      </div>
    </div>
  );
};

export default WeeklyPage;
