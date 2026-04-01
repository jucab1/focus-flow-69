import FocusScore from '@/components/FocusScore';
import DailyFuel from '@/components/DailyFuel';
import { Task } from '@/lib/store';

interface FocusScorePageProps {
  tasks: Task[];
}

const FocusScorePage = ({ tasks }: FocusScorePageProps) => {
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="flex-1 p-10 md:p-14 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading font-bold text-[28px] text-foreground tracking-tight mb-2">Focus Score</h1>
        <p className="text-muted-foreground text-[14px] mb-10">Track your productivity.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FocusScore completed={completedCount} total={tasks.length} />
          <DailyFuel />
        </div>
      </div>
    </div>
  );
};

export default FocusScorePage;
