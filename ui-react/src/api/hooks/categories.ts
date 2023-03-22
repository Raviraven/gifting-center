import { useMutation, useQuery } from 'react-query';

import { addCategory, getCategories } from '../services/categories';

export enum CategoriesQueryKeys {
  categories = 'categories',
}

//export const useCategory = (categoryId: number) => useQuery

export const useAddCategory = () =>
  useMutation((category: { name: string }) => addCategory(category));

export const useCategories = () =>
  useQuery(CategoriesQueryKeys.categories, getCategories);
