import type { LeadFilters, LeadStatus, LeadSource, SortOrder } from "../../types";

interface FilterBarProps {
  filters: LeadFilters;
  onChange: (key: keyof LeadFilters, value: string | number) => void;
  onReset: () => void;
}

function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "" ||
    filters.source !== "" ||
    filters.sort !== "latest";

  const controlStyle =
    "h-10 px-4 rounded-xl border text-sm bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";

  return (
    <div className="bg-white dark:bg-[#13131f] rounded-2xl border border-gray-100 dark:border-white/5 p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            id="leads-search"
            type="text"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
            className={`${controlStyle} w-full pl-9`}
          />
        </div>

        <select
          id="filter-status"
          value={filters.status}
          onChange={(e) => onChange("status", e.target.value as LeadStatus | "")}
          className={`${controlStyle} min-w-[150px]`}
        >
          <option value="">All Status</option>
          <option value="new">🔵 New</option>
          <option value="contacted">🟡 Contacted</option>
          <option value="qualified">🟢 Qualified</option>
          <option value="lost">🔴 Lost</option>
        </select>

        <select
          id="filter-source"
          value={filters.source}
          onChange={(e) => onChange("source", e.target.value as LeadSource | "")}
          className={`${controlStyle} min-w-[150px]`}
        >
          <option value="">All Sources</option>
          <option value="website">🌐 Website</option>
          <option value="instagram">📸 Instagram</option>
          <option value="referral">🤝 Referral</option>
          <option value="other">📌 Other</option>
        </select>

        <select
          id="filter-sort"
          value={filters.sort}
          onChange={(e) => onChange("sort", e.target.value as SortOrder)}
          className={`${controlStyle} min-w-[130px]`}
        >
          <option value="latest">⬇ Latest</option>
          <option value="oldest">⬆ Oldest</option>
        </select>

        {hasActiveFilters && (
          <button
            id="reset-filters"
            onClick={onReset}
            className="h-10 px-4 rounded-xl text-sm font-medium whitespace-nowrap text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all duration-200"
          >
            ✕ Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
