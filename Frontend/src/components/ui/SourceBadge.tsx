import type { LeadSource } from "../../types";

interface SourceBadgeProps {
  source: LeadSource;
}

const sourceConfig: Record<LeadSource, { label: string; emoji: string; classes: string }> = {
  website: {
    label: "Website",
    emoji: "🌐",
    classes: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  instagram: {
    label: "Instagram",
    emoji: "📸",
    classes: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  },
  referral: {
    label: "Referral",
    emoji: "🤝",
    classes: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  other: {
    label: "Other",
    emoji: "📌",
    classes: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
};

function SourceBadge({ source }: SourceBadgeProps) {
  const config = sourceConfig[source];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.classes}`}>
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
}

export default SourceBadge;
