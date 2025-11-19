import api from './api';
import { Honey, ApiResponse, Review } from '../types';

export const honeyService = {
  getAll: async (params?: {
    type?: string;
    region?: string;
    minPurity?: number;
    search?: string;
  }): Promise<ApiResponse<Honey[]>> => {
    const response = await api.get<ApiResponse<Honey[]>>('/honey', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Honey> => {
    const response = await api.get<ApiResponse<Honey>>(`/honey/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Honey>): Promise<Honey> => {
    const response = await api.post<ApiResponse<Honey>>('/honey', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Honey>): Promise<Honey> => {
    const response = await api.put<ApiResponse<Honey>>(`/honey/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/honey/${id}`);
  },

  addReview: async (id: string, review: { rating: number; comment: string }): Promise<Honey> => {
    const response = await api.post<ApiResponse<Honey>>(`/honey/${id}/reviews`, review);
    return response.data.data;
  },
};

