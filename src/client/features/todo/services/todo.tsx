import axios from 'axios';
import { ITodoResponse } from '../types/todoTypes';

const baseURL = import.meta.env.VITE_API_URL || '';
const axiosInstance = axios.create({
  baseURL: `${baseURL}/api/todos`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default class TodoService {
  async getAll(params?: {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
  }): Promise<ITodoResponse> {
    try {
      const response = await axiosInstance.get('/', { params });
      return { success: true, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, error: error.response.data.errmsg };
      }
      return { success: false, error: `Failed to fetch todos: ${error}` };
    }
  }

  async getById(id: string): Promise<ITodoResponse> {
    try {
      const response = await axiosInstance.get(`/${id}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          return { success: false, error: 'Todo not found' };
        }
        return { success: false, error: error.response.data.errmsg };
      }
      return { success: false, error: `Failed to fetch todo: ${error}` };
    }
  }

  async create(name: string, choreListId: string): Promise<ITodoResponse> {
    try {
      const response = await axiosInstance.post('/', { name, choreListId });
      return { success: response.status === 201 };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, error: error.response.data.response };
      }
      return { success: false, error: `Failed to create todo: ${error}` };
    }
  }

  async update(
    id: string,
    payload: { name: string; emailAddress: string; completed: boolean },
  ): Promise<ITodoResponse> {
    try {
      const response = await axiosInstance.put(`/${id}`, payload);
      return { success: true, data: response.data.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, error: error.response.data.errmsg };
      }
      return { success: false, error: `Failed to update todo: ${error}` };
    }
  }

  async deleteById(id: string): Promise<ITodoResponse> {
    try {
      await axiosInstance.delete(`/${id}`);
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, error: error.response.data.errmsg };
      }
      return { success: false, error: `Failed to delete todo: ${error}` };
    }
  }
}

