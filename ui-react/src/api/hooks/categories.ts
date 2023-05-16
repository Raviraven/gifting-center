import { useMutation, useQuery } from 'react-query';

import {
  AddCategory,
  EditCategory,
  GetCategories,
  GetCategoryById,
} from '../services/categories';

export enum CategoriesQueryKeys {
  categories = 'categories',
  category = 'category',
}

//export const useCategory = (categoryId: number) => useQuery

export const useAddCategory = () =>
  useMutation((category: { name: string }) => AddCategory(category));

export const useEditCategory = () =>
  useMutation((category: { name: string }) => EditCategory(category));

export const useCategory = (id: number) =>
  useQuery([CategoriesQueryKeys.category, id], () => GetCategoryById(id));

export const useCategories = () =>
  useQuery(CategoriesQueryKeys.categories, GetCategories);
