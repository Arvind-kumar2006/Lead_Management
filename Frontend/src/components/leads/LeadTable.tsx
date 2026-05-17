import type { Lead } from "../../types";
import StatusBadge from "../ui/StatusBadge";
import SourceBadge from "../ui/SourceBadge";

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
  isAdmin: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100 dark:border-white/5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 rounded w-full" />
        </td>
      ))}
    </tr>
  );
}

function LeadTable({ leads, isLoading, isAdmin, onEdit, onDelete }: LeadTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/5 shadow-md">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
            {["Name", "Email", "Status", "Source", "Created", "Actions"].map((col) => (
              <th
                key={col}
                className={`px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide ${col === "Actions" ? "text-center" : "text-left"}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-[#13131f]">
          {isLoading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

          {!isLoading &&
            leads.map((lead, index) => (
              <tr
                key={lead._id}
                className="border-b border-gray-100 dark:border-white/5 hover:bg-indigo-50/50 dark:hover:bg-white/5 transition-colors duration-150 animate-fade-in"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-xs font-bold flex-shrink-0">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{lead.name}</span>
                  </div>
                </td>

                <td className="px-4 py-3.5 text-gray-600 dark:text-gray-400">{lead.email}</td>

                <td className="px-4 py-3.5">
                  <StatusBadge status={lead.status} />
                </td>

                <td className="px-4 py-3.5">
                  <SourceBadge source={lead.source} />
                </td>

                <td className="px-4 py-3.5 text-gray-500 dark:text-gray-500 text-xs">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      id={`edit-lead-${lead._id}`}
                      onClick={() => onEdit(lead)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all duration-150"
                      aria-label={`Edit ${lead.name}`}
                    >
                      ✏️ Edit
                    </button>

                    {isAdmin && (
                      <button
                        id={`delete-lead-${lead._id}`}
                        onClick={() => onDelete(lead)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all duration-150"
                        aria-label={`Delete ${lead.name}`}
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

          {!isLoading && leads.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-16 bg-white dark:bg-[#13131f]">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-5xl">🔍</div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No leads found</p>
                  <p className="text-gray-400 dark:text-gray-600 text-sm">
                    Try adjusting your filters or add a new lead
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
