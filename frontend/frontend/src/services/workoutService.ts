import api from './api';
import { Workout, ApiResponse } from '../types';

export const workoutService = {
  getAll: async (params?: {
    type?: string;
    category?: string;
    difficulty?: string;
    trainer?: string;
    search?: string;
  }): Promise<ApiResponse<Workout[]>> => {
    const response = await api.get<ApiResponse<Workout[]>>('/workouts', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Workout> => {
    const response = await api.get<ApiResponse<Workout>>(`/workouts/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Workout>): Promise<Workout> => {
    const response = await api.post<ApiResponse<Workout>>('/workouts', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Workout>): Promise<Workout> => {
    const response = await api.put<ApiResponse<Workout>>(`/workouts/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/workouts/${id}`);
  },

  addReview: async (id: string, review: { rating: number; comment: string }): Promise<Workout> => {
    const response = await api.post<ApiResponse<Workout>>(`/workouts/${id}/reviews`, review);
    return response.data.data;
  },
};

