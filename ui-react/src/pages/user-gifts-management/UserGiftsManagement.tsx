import { SelectChangeEvent } from '@mui/material/Select';
import { Formik, Form, FormikProps } from 'formik';
import { useCallback, useEffect, useState } from 'react';

import { useGiftedUsers } from '../../api/hooks/gifted-users';
import { GiftAdd } from '../../components/gift-add/GiftAdd';
import { GiftsList } from '../../components/gifts-list/GiftsList';
import {
  SelectFieldFormik,
  SelectFieldOption,
} from '../../components/material/formik/SelectFieldFormik';
import { SelectField } from '../../components/material/SelectField';
import { TranslatedText } from '../../components/translated-text/TranslatedText';

export const UserGiftsManagement = () => {
  const [giftedUsersDropdownOptions, setGiftedUsersDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);
  const [giftedUserId, setGiftedUserId] = useState<number>(0);

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
      setGiftedUserId(giftedUserId);
    },
    []
  );

  const handleSelect = useCallback(
    (props: FormikProps<{ giftedUserId: number }>) => {
      void props.submitForm();
    },
    []
  );

  const handleOnChange = useCallback((event: SelectChangeEvent<string>) => {
    setGiftedUserId(Number(event.target.value) ?? 0);
  }, []);

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
          {/* <Formik initialValues={{ giftedUserId: 0 }} onSubmit={handleSubmit}>
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
          </Formik> */}

          <SelectField
            label="giftedUser"
            name="giftedUserId"
            options={giftedUsersDropdownOptions}
            onChange={handleOnChange}
          />

          <GiftsList userId={giftedUserId} adminActions={true} />
        </main>
      </section>
    </>
  );
};

//const GiftedUserSelect = () => {};
