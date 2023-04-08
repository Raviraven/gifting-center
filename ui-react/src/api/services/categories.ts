import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { axiosInstance } from '../axios';
import { Category } from '../models/categories';

export const addCategory = async (category: { name: string }) => {
  try {
    const result = await axiosInstance.post<Category>('/categories', category);
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.response?.statusText);
  }
};

export const EditCategory = async (category: { name: string }) => {
  try {
    const result = await axiosInstance.put<Category>('/categories', category);
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.response?.statusText);
  }
};

export const GetCategories = async () => {
  try {
    const result = await axiosInstance.get<Category[]>('/categories');
    return result.data;
  } catch {
    return [];
  }
};

export const GetCategoryById = async (categoryId: number) => {
  try {
    const result = await axiosInstance.get<Category>(
      `/categories/${categoryId}`
    );
    return result.data;
  } catch {
    return null;
  }
};
