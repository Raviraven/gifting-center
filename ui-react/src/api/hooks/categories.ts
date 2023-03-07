import { useQuery } from 'react-query';

import { getCategories } from '../services/categories';

//export const useCategory = (categoryId: number) => useQuery

export const useCategories = () => useQuery('categories', getCategories);
