import api from "./axios";
import type { LoginPayload, RegisterPayload, AuthResponse, ApiResponse } from "../types";

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

export const registerUser = async (payload: RegisterPayload): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/auth/register", payload);
  return response.data;
};
