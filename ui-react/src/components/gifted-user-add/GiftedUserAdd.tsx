import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import {
  GiftedUsersQueryKeys,
  useAddGiftedUser,
} from '../../api/hooks/gifted-users';

import { TextFieldFormik } from '../material/formik/TextField';
import { TranslatedText } from '../translated-text/TranslatedText';

export const GiftedUserAdd = () => {
  const queryClient = useQueryClient();

  const { mutate } = useAddGiftedUser();

  const handleSubmit = useCallback(
    ({ name }: { name: string }) => {
      mutate(
        { name },
        {
          onSuccess: () =>
            queryClient.invalidateQueries(GiftedUsersQueryKeys.giftedUsers),
        }
      );
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
          <TextFieldFormik label="giftedUserName" name="name" type={'text'} />

          <button type="submit">
            <TranslatedText lKey="add" />
          </button>
        </Form>
      </Formik>
    </section>
  );
};
