import { Form, Formik } from 'formik';

import { Button } from '@mui/material';

import { TextFieldFormik } from '../material/formik/TextField';
import { TranslatedText } from '../translated-text/TranslatedText';
import { Category } from '../../api/models/categories';
import { CategorySchema } from '../../yup-schemas/category-schema';

interface CategoryFormProps {
  lKeySubmitButton: string;
  category: Category;
  handleSubmit: (values: Category) => void;
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
