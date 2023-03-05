import { toast } from 'react-toastify';

import { axiosInstance } from '../axios';
import { Category } from '../models/categories';

export const getCategories = async () => {
  const result = await axiosInstance.get<Category[]>('/categories');

  if (result.status === 200) {
    return result.data;
  } else {
    toast.error(result.statusText);
  }
};

export const getCategoryById = async (categoryId: number) => {
  const result = await axiosInstance.get<Category>(`/categories/${categoryId}`);

  if (result.status === 200) {
    return result.data;
  } else {
    toast.error(result.statusText);
  }
};
