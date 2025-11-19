import api from './api';
import { Personnel, ApiResponse } from '../types';

export const personnelService = {
  getAll: async (params?: {
    role?: string;
    specialization?: string;
    location?: string;
    isVerified?: boolean;
    search?: string;
  }): Promise<ApiResponse<Personnel[]>> => {
    const response = await api.get<ApiResponse<Personnel[]>>('/personnel', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Personnel> => {
    const response = await api.get<ApiResponse<Personnel>>(`/personnel/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Personnel>): Promise<Personnel> => {
    const response = await api.post<ApiResponse<Personnel>>('/personnel', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Personnel>): Promise<Personnel> => {
    const response = await api.put<ApiResponse<Personnel>>(`/personnel/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/personnel/${id}`);
  },

  addReview: async (id: string, review: { rating: number; comment: string }): Promise<Personnel> => {
    const response = await api.post<ApiResponse<Personnel>>(`/personnel/${id}/reviews`, review);
    return response.data.data;
  },

  verify: async (id: string): Promise<Personnel> => {
    const response = await api.put<ApiResponse<Personnel>>(`/personnel/${id}/verify`);
    return response.data.data;
  },
};

