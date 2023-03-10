import { Formik, Form, FormikProps } from 'formik';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useGiftedUsers } from '../../api/hooks/gifted-users';
import { GiftAdd } from '../../components/gift-add/GiftAdd';
import { GiftsList } from '../../components/gifts-list/GiftsList';
import {
  SelectField,
  SelectFieldOption,
} from '../../components/material/SelectField';
import { TranslatedText } from '../../components/translated-text/TranslatedText';

export const UserGiftsManagement = () => {
  const [giftedUsersDropdownOptions, setGiftedUsersDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);
  const [giftedUser, setGiftedUser] = useState<number>();
  const form = useRef<HTMLFormElement>(null);

  const { isLoading, data } = useGiftedUsers();

  useEffect(() => {
    if (!isLoading && data) {
      setGiftedUsersDropdownOptions([
        ...data.map((gu) => {
          return { key: gu.id, value: gu.name };
        }),
      ]);
    }
  }, [data, isLoading]);

  const handleSubmit = useCallback(
    ({ giftedUserId }: { giftedUserId: number }) => {
      setGiftedUser(giftedUserId);
    },
    []
  );

  const handleSelect = useCallback(
    (props: FormikProps<{ giftedUserId: number }>) => {
      void props.submitForm();
    },
    []
  );

  return isLoading ? (
    <>
      <TranslatedText lKey="loading" />
    </>
  ) : (
    <>
      <GiftAdd />
      <section>
        <header>
          <h2>
            <TranslatedText lKey="giftsForSelectedUser" />
          </h2>
        </header>
        <main>
          <Formik initialValues={{ giftedUserId: 0 }} onSubmit={handleSubmit}>
            {(props) => (
              <Form>
                <SelectField
                  label="giftedUser"
                  name="giftedUserId"
                  options={giftedUsersDropdownOptions}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSelect={() => handleSelect(props)}
                />
              </Form>
            )}
          </Formik>

          {giftedUser && giftedUser !== 0 ? (
            <>
              <GiftsList userId={giftedUser} />{' '}
            </>
          ) : (
            <></>
          )}
        </main>
      </section>
    </>
  );
};
