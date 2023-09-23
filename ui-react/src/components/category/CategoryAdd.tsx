import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { FormikHelpers } from 'formik';

import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';

import { Category } from 'api/models';
import { CategoriesQueryKeys, useAddCategory } from 'api/hooks';

import { CategoryForm } from './CategoryForm';

export const CategoryAdd = () => {
  const { mutate } = useAddCategory();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccessSubmit = useCallback(async () => {
    await queryClient.invalidateQueries(CategoriesQueryKeys.categories);
    toast.success(t('categorySuccessfullyAdded'));
  }, [queryClient, t]);

  const handleSubmit = useCallback(
    (category: { name: string }, formikHelpers: FormikHelpers<Category>) => {
      mutate(category, {
        onSuccess: () => onSuccessSubmit(),
        onSettled: () => formikHelpers.resetForm(),
      });
    },
    [mutate, onSuccessSubmit]
  );

  return (
    <CategoryForm
      category={{ id: 0, name: '' }}
      handleSubmit={handleSubmit}
      lKeySubmitButton="add"
    />
  );
};
