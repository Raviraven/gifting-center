import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import {
  CategoriesQueryKeys,
  useCategory,
  useEditCategory,
} from '../../api/hooks/categories';
import { Category } from '../../api/models/categories';
import { TextFieldFormik } from '../material/formik/TextField';
import { TranslatedText } from '../translated-text/TranslatedText';

export const CategoryEdit = ({ id }: { id: number }) => {
  const { mutate } = useEditCategory();
  const queryClient = useQueryClient();

  const { isLoading, data } = useCategory(id);

  const handleSubmit = useCallback(
    (category: { name: string }) => {
      mutate(category, {
        onSuccess: () =>
          queryClient.invalidateQueries(CategoriesQueryKeys.categories),
      });
    },
    [mutate, queryClient]
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

          <button type="submit">
            <TranslatedText lKey="add" />
          </button>
        </Form>
      </Formik>
    </section>
  );
};
