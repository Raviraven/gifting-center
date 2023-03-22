import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import {
  CategoriesQueryKeys,
  useAddCategory,
} from '../../api/hooks/categories';
import { TextFieldFormik } from '../material/formik/TextField';
import { TranslatedText } from '../translated-text/TranslatedText';

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
    <section>
      <Formik<{ name: string }>
        initialValues={{ name: '' }}
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
