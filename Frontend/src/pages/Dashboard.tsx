import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLeads, createLead, updateLead, deleteLead, fetchLeadStats } from "../api/leads";
import { useAuthStore } from "../store/authStore";
import useDebounce from "../hooks/useDebounce";
import { exportLeadsToCsv } from "../utils/exportCsv";
import Navbar from "../components/layout/Navbar";
import FilterBar from "../components/leads/FilterBar";
import LeadTable from "../components/leads/LeadTable";
import Pagination from "../components/leads/Pagination";
import StatsCard from "../components/dashboard/StatsCard";
import Modal from "../components/ui/Modal";
import LeadForm from "../components/leads/LeadForm";
import Spinner from "../components/ui/Spinner";
import type { Lead, LeadFilters, CreateLeadPayload } from "../types";

const DEFAULT_FILTERS: LeadFilters = {
  search: "",
  status: "",
  source: "",
  sort: "latest",
  page: 1,
};

function Dashboard() {
  const { user, isDarkMode } = useAuthStore();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const [filters, setFilters] = useState<LeadFilters>(DEFAULT_FILTERS);
  const debouncedSearch = useDebounce(filters.search, 500);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const queryParams = new URLSearchParams();
  queryParams.append("page", String(filters.page));
  if (filters.status) queryParams.append("status", filters.status);
  if (filters.source) queryParams.append("source", filters.source);
  if (debouncedSearch) queryParams.append("search", debouncedSearch);
  if (filters.sort === "oldest") queryParams.append("sort", "oldest");
  const queryString = queryParams.toString();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leads", queryString],
    queryFn: () => fetchLeads(queryParams),
    staleTime: 30_000,
  });

  const leads: Lead[] = data?.data ?? [];
  const pagination = data?.pagination;

  const { data: statsData } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchLeadStats,
    staleTime: 60_000,
  });

  const totalLeads     = statsData?.data.total     ?? 0;
  const newLeadsCount  = statsData?.data.new       ?? 0;
  const contactedCount = statsData?.data.contacted ?? 0;
  const qualifiedCount = statsData?.data.qualified ?? 0;
  const lostCount      = statsData?.data.lost      ?? 0;

  const createMutation = useMutation({
    mutationFn: (payload: CreateLeadPayload) => createLead(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      setIsCreateModalOpen(false);
      setToast({ message: "Lead created successfully! 🎉", type: "success" });
    },
    onError: () => {
      setToast({ message: "Failed to create lead. Try again.", type: "error" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: CreateLeadPayload) => updateLead(selectedLead!._id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      setIsEditModalOpen(false);
      setSelectedLead(null);
      setToast({ message: "Lead updated successfully! ✅", type: "success" });
    },
    onError: () => {
      setToast({ message: "Failed to update lead. Try again.", type: "error" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLead(selectedLead!._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      setIsDeleteModalOpen(false);
      setSelectedLead(null);
      setToast({ message: "Lead deleted. 🗑️", type: "success" });
    },
    onError: () => {
      setToast({ message: "Failed to delete lead. Try again.", type: "error" });
    },
  });

  function handleFilterChange(key: keyof LeadFilters, value: string | number) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : prev.page,
    }));
  }

  function handleEditClick(lead: Lead) {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  }

  function handleDeleteClick(lead: Lead) {
    setSelectedLead(lead);
    setIsDeleteModalOpen(true);
  }

  function handleExportCSV() {
    exportLeadsToCsv(leads);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-300">
      <Navbar />

      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 animate-bounce-in flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium shadow-xl border ${
            toast.type === "success"
              ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/30"
              : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/30"
          }`}
        >
          {toast.message}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Welcome back,{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user?.name}</span>!
              Here&apos;s your leads overview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="export-csv"
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all duration-200"
            >
              📥 Export CSV
            </button>

            <button
              id="add-lead-button"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/30 transition-all duration-200"
            >
              + Add Lead
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white dark:bg-[#13131f] rounded-2xl border border-gray-100 dark:border-white/5 p-5">
                <div className="skeleton h-10 w-10 rounded-xl mb-4" />
                <div className="skeleton h-8 w-16 rounded mb-2" />
                <div className="skeleton h-4 w-24 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatsCard label="Total Leads" value={totalLeads}     icon="📊" color="bg-indigo-50 dark:bg-indigo-500/10" />
            <StatsCard label="New"         value={newLeadsCount}  icon="🔵" color="bg-blue-50 dark:bg-blue-500/10" />
            <StatsCard label="Contacted"   value={contactedCount} icon="🟡" color="bg-yellow-50 dark:bg-yellow-500/10" />
            <StatsCard label="Qualified"   value={qualifiedCount} icon="✅" color="bg-green-50 dark:bg-green-500/10" />
            <StatsCard label="Lost"        value={lostCount}      icon="📉" color="bg-red-50 dark:bg-red-500/10" />
          </div>
        )}

        <div className="mb-6">
          <FilterBar
            filters={filters}
            onChange={handleFilterChange}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />
        </div>

        {isError && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[#13131f] rounded-2xl border border-gray-100 dark:border-white/5">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Failed to load leads
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
              Something went wrong. Please check your connection and try again.
            </p>
            <button
              onClick={() => queryClient.invalidateQueries({ queryKey: ["leads"] })}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Try again
            </button>
          </div>
        )}

        {!isError && (
          <>
            <LeadTable
              leads={leads}
              isLoading={isLoading}
              isAdmin={isAdmin}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />

            {pagination && (
              <div className="mt-6">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalRecords={pagination.totalRecords}
                  onPageChange={(page) => handleFilterChange("page", page)}
                />
              </div>
            )}
          </>
        )}
      </main>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="✨ Add New Lead">
        <LeadForm
          mode="create"
          isSubmitting={createMutation.isPending}
          onSubmit={(formData) => createMutation.mutate(formData)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedLead(null); }}
        title="✏️ Edit Lead"
      >
        {selectedLead && (
          <LeadForm
            mode="edit"
            defaultValues={{
              name: selectedLead.name,
              email: selectedLead.email,
              status: selectedLead.status,
              source: selectedLead.source,
            }}
            isSubmitting={updateMutation.isPending}
            onSubmit={(formData) => updateMutation.mutate(formData)}
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setSelectedLead(null); }}
        title="🗑️ Delete Lead"
        size="sm"
      >
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Are you sure you want to delete</p>
          <p className="font-bold text-gray-900 dark:text-white mb-5">{selectedLead?.name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-6">This action cannot be undone.</p>

          <div className="flex gap-3">
            <button
              id="cancel-delete"
              onClick={() => { setIsDeleteModalOpen(false); setSelectedLead(null); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              id="confirm-delete"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-700 text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-red-500/20"
            >
              {deleteMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" />
                  Deleting...
                </span>
              ) : (
                "Yes, delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;