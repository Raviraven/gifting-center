import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { Typography } from '@mui/material';

import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';

import {
  CategoriesQueryKeys,
  useCategory,
  useEditCategory,
} from '../../api/hooks/categories';
import { TranslatedText } from '../translated-text/TranslatedText';

import { CategoryForm } from './CategoryForm';

interface CategoryEditProps {
  id: number;
  onSubmitClick?: () => void;
}

export const CategoryEdit = ({ id, onSubmitClick }: CategoryEditProps) => {
  const { mutate } = useEditCategory();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, data } = useCategory(id);

  const onSuccessSubmit = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: CategoriesQueryKeys.categories,
      exact: true,
    });
    await queryClient.invalidateQueries({
      queryKey: [CategoriesQueryKeys.category, id],
      exact: true,
    });

    toast.success(t('categorySuccessfullyEdited'));

    if (onSubmitClick) {
      onSubmitClick();
    }
  }, [id, onSubmitClick, queryClient, t]);

  const handleSubmit = useCallback(
    (category: { name: string }) => {
      mutate(category, {
        onSuccess: () => onSuccessSubmit(),
      });
    },
    [mutate, onSuccessSubmit]
  );

  return isLoading ? (
    <Typography variant="body2">
      <TranslatedText lKey="loading" />
    </Typography>
  ) : data ? (
    <CategoryForm
      category={data}
      handleSubmit={handleSubmit}
      lKeySubmitButton="save"
    />
  ) : (
    <Typography variant="body2">
      <TranslatedText lKey="wrongDataReceivedFromServer" />
    </Typography>
  );
};
