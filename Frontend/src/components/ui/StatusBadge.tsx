import type { LeadStatus } from "../../types";

interface StatusBadgeProps {
  status: LeadStatus;
}

const statusConfig: Record<LeadStatus, { label: string; classes: string }> = {
  new: {
    label: "New",
    classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  contacted: {
    label: "Contacted",
    classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  qualified: {
    label: "Qualified",
    classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  lost: {
    label: "Lost",
    classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.classes}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {config.label}
    </span>
  );
}

export default StatusBadge;
