import type { Lead } from "../types";

export const exportLeadsToCsv = (leads: Lead[]): void => {
  if (leads.length === 0) {
    alert("No leads to export!");
    return;
  }

  const headers = ["Name", "Email", "Status", "Source", "Created At"];

  const rows = leads.map((lead) => [
    `"${lead.name}"`,
    `"${lead.email}"`,
    `"${lead.status}"`,
    `"${lead.source}"`,
    `"${new Date(lead.createdAt).toLocaleDateString()}"`,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `leads-export-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};