import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { Button } from '@mui/material';

import {
  CategoriesQueryKeys,
  useCategory,
  useEditCategory,
} from '../../api/hooks/categories';
import { Category } from '../../api/models/categories';
import { TextFieldFormik } from '../material/formik/TextField';
import { TranslatedText } from '../translated-text/TranslatedText';

interface CategoryEditProps {
  id: number;
  onSubmitClick: () => void;
}

export const CategoryEdit = ({ id, onSubmitClick }: CategoryEditProps) => {
  const { mutate } = useEditCategory();
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
    onSubmitClick();
  }, [id, onSubmitClick, queryClient]);

  const handleSubmit = useCallback(
    (category: { name: string }) => {
      mutate(category, {
        onSuccess: () => onSuccessSubmit(),
      });
    },
    [mutate, onSuccessSubmit]
  );

  return isLoading ? (
    <p>
      <TranslatedText lKey="loading" />
    </p>
  ) : (
    <section>
      <Formik<Category>
        initialValues={{ id: data?.id ?? 0, name: data?.name ?? '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextFieldFormik label="categoryName" name="name" type={'text'} />

          <Button type="submit" variant="outlined" fullWidth>
            <TranslatedText lKey="save" />
          </Button>
        </Form>
      </Formik>
    </section>
  );
};
