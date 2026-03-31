import { TaskTag, tagColors } from '@/lib/store';

interface TaskBadgeProps {
  tag: TaskTag;
}

const labels: Record<TaskTag, string> = {
  finance: 'Finance',
  personal: 'Personal',
  academic: 'Academic',
  trading: 'Trading',
  university: 'University',
};

const TaskBadge = ({ tag }: TaskBadgeProps) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${tagColors[tag]}`}>
    {labels[tag]}
  </span>
);

export default TaskBadge;
