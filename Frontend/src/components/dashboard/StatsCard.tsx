interface StatsCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
}

function StatsCard({ label, value, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-[#13131f] rounded-2xl border border-gray-100 dark:border-white/5 p-5 shadow-sm hover:shadow-md dark:hover:shadow-black/30 transition-all duration-200 animate-fade-in">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${color}`}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
}

export default StatsCard;
