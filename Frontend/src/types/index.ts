export type LeadStatus = "new" | "contacted" | "qualified" | "lost";

export type LeadSource = "website" | "instagram" | "referral" | "other";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface UpdateLeadPayload {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface LeadsApiResponse {
  success: boolean;
  data: Lead[];
  pagination: PaginationMeta;
}

export interface SingleLeadApiResponse {
  success: boolean;
  data: Lead;
}

export type UserRole = "admin" | "sales";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export type SortOrder = "latest" | "oldest";

export interface LeadFilters {
  search: string;
  status: LeadStatus | "";
  source: LeadSource | "";
  sort: SortOrder;
  page: number;
}
