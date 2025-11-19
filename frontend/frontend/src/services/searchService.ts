import api from './api';
import { SearchResults, ApiResponse } from '../types';

export const searchService = {
  globalSearch: async (query: string, type?: string, limit?: number): Promise<ApiResponse<SearchResults>> => {
    const response = await api.get<ApiResponse<SearchResults>>('/search', {
      params: { q: query, type, limit },
    });
    return response.data;
  },

  advancedSearch: async (data: {
    query: string;
    types?: string[];
    filters?: Record<string, any>;
  }): Promise<ApiResponse<SearchResults>> => {
    const response = await api.post<ApiResponse<SearchResults>>('/search/advanced', data);
    return response.data;
  },
};

