import api from "./axios";
import type {
  CreateLeadPayload,
  UpdateLeadPayload,
  LeadsApiResponse,
  SingleLeadApiResponse,
  ApiResponse,
} from "../types";

export const fetchLeads = async (params: URLSearchParams): Promise<LeadsApiResponse> => {
  const response = await api.get<LeadsApiResponse>(`/leads?${params.toString()}`);
  return response.data;
};

export const fetchLeadById = async (id: string): Promise<SingleLeadApiResponse> => {
  const response = await api.get<SingleLeadApiResponse>(`/leads/${id}`);
  return response.data;
};

export const createLead = async (payload: CreateLeadPayload): Promise<SingleLeadApiResponse> => {
  const response = await api.post<SingleLeadApiResponse>("/leads", payload);
  return response.data;
};

export const updateLead = async (
  id: string,
  payload: UpdateLeadPayload
): Promise<SingleLeadApiResponse> => {
  const response = await api.put<SingleLeadApiResponse>(`/leads/${id}`, payload);
  return response.data;
};

export const deleteLead = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/leads/${id}`);
  return response.data;
};

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  lost: number;
}

export const fetchLeadStats = async (): Promise<{ success: boolean; data: LeadStats }> => {
  const response = await api.get<{ success: boolean; data: LeadStats }>("/leads/stats");
  return response.data;
};
