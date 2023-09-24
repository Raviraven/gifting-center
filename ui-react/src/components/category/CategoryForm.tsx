import { Form, Formik, FormikHelpers } from 'formik';

import { Button } from '@mui/material';

import { TextFieldFormik } from 'components/material';
import { TranslatedText } from 'components';
import { Category } from 'api/models';

import { CategorySchema } from 'yup-schemas';

interface CategoryFormProps {
  lKeySubmitButton: string;
  category: Category;
  handleSubmit: (
    values: Category,
    formikHelpers: FormikHelpers<Category>
  ) => void;
}

export const CategoryForm = (props: CategoryFormProps) => {
  const { handleSubmit, category, lKeySubmitButton } = props;

  return (
    <section>
      <Formik<Category>
        initialValues={category}
        onSubmit={handleSubmit}
        validationSchema={CategorySchema}
      >
        <Form>
          <TextFieldFormik label="categoryName" name="name" type={'text'} />

          <Button variant="outlined" type="submit" fullWidth>
            <TranslatedText lKey={lKeySubmitButton} />
          </Button>
        </Form>
      </Formik>
    </section>
  );
};
