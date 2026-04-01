import UrgentCard from '@/components/UrgentCard';
import { Task } from '@/lib/store';

interface UrgentPageProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const UrgentPage = ({ tasks, onToggle, onEditTask, onDeleteTask }: UrgentPageProps) => {
  const urgentTasks = tasks.filter((t) => t.category === 'urgent');

  return (
    <div className="flex-1 p-10 md:p-14 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading font-bold text-[28px] text-foreground tracking-tight mb-2">Urgent</h1>
        <p className="text-muted-foreground text-[14px] mb-10">Tasks that need immediate attention.</p>
        <UrgentCard tasks={urgentTasks} onToggle={onToggle} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
      </div>
    </div>
  );
};

export default UrgentPage;
