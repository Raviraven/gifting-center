import { Form, Formik, FormikHelpers } from 'formik';

import { Button } from '@mui/material';

import { TextFieldFormik } from '../material/formik/TextField';
import { TranslatedText } from '../translated-text/TranslatedText';
import { GiftedUser } from '../../api/models/gifted-user';
import { GiftedUserSchema } from '../../yup-schemas/gifted-user-schema';

interface GiftedUserFormProps {
  giftedUser?: GiftedUser;
  submitButtonLKey: string;
  handleSubmit: (
    giftedUser: GiftedUser,
    formikHelpers: FormikHelpers<GiftedUser>
  ) => void;
}

export const GiftedUserForm = ({
  handleSubmit,
  submitButtonLKey = 'add',
  giftedUser,
}: GiftedUserFormProps) => {
  const defaultInitialValue: GiftedUser = {
    id: 0,
    name: '',
  };

  return (
    <section>
      <Formik<GiftedUser>
        initialValues={giftedUser ? giftedUser : defaultInitialValue}
        validationSchema={GiftedUserSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextFieldFormik label="giftedUserName" name="name" type={'text'} />

          <Button variant="outlined" type="submit" fullWidth>
            <TranslatedText lKey={submitButtonLKey} />
          </Button>
        </Form>
      </Formik>
    </section>
  );
};
