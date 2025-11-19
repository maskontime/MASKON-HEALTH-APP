import api from './api';
import { Herb, ApiResponse } from '../types';

export const herbService = {
  getAll: async (params?: {
    category?: string;
    region?: string;
    availability?: string;
    search?: string;
  }): Promise<ApiResponse<Herb[]>> => {
    const response = await api.get<ApiResponse<Herb[]>>('/herbs', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Herb> => {
    const response = await api.get<ApiResponse<Herb>>(`/herbs/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Herb>): Promise<Herb> => {
    const response = await api.post<ApiResponse<Herb>>('/herbs', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Herb>): Promise<Herb> => {
    const response = await api.put<ApiResponse<Herb>>(`/herbs/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/herbs/${id}`);
  },
};

