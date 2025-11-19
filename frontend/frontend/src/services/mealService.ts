import api from './api';
import { Meal, ApiResponse } from '../types';

export const mealService = {
  getAll: async (params?: {
    category?: string;
    region?: string;
    search?: string;
  }): Promise<ApiResponse<Meal[]>> => {
    const response = await api.get<ApiResponse<Meal[]>>('/meals', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Meal> => {
    const response = await api.get<ApiResponse<Meal>>(`/meals/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Meal>): Promise<Meal> => {
    const response = await api.post<ApiResponse<Meal>>('/meals', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Meal>): Promise<Meal> => {
    const response = await api.put<ApiResponse<Meal>>(`/meals/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/meals/${id}`);
  },
};

