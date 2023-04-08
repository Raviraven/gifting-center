import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import {
  CategoriesQueryKeys,
  useAddCategory,
} from '../../api/hooks/categories';

import { CategoryForm } from './CategoryForm';

export const CategoryAdd = () => {
  const { mutate } = useAddCategory();
  const queryClient = useQueryClient();

  const handleSubmit = useCallback(
    (category: { name: string }) => {
      mutate(category, {
        onSuccess: () =>
          queryClient.invalidateQueries(CategoriesQueryKeys.categories),
      });
    },
    [mutate, queryClient]
  );

  return (
    <CategoryForm
      category={{ id: 0, name: '' }}
      handleSubmit={handleSubmit}
      lKeySubmitButton="add"
    />
  );
};
