import { SelectChangeEvent } from '@mui/material/Select';
import { FormikProps } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useGiftedUsers } from '../../api/hooks/gifted-users';
import { GiftAdd } from '../../components/gift/GiftAdd';
import { GiftEdit } from '../../components/gift/GiftEdit';
import { GiftsList } from '../../components/gifts-list/GiftsList';
import { SelectFieldOption } from '../../components/material/formik/SelectFieldFormik';
import { SelectField } from '../../components/material/SelectField';
import { TranslatedText } from '../../components/translated-text/TranslatedText';

export const UserGiftsManagement = () => {
  const [giftedUsersDropdownOptions, setGiftedUsersDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);
  const [giftedUserId, setGiftedUserId] = useState<number>(0);
  const [editedGiftId, setEditedGiftId] = useState<number | null>();
  const queryClient = useQueryClient();

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
    //void queryClient.invalidateQueries('gifts-list');
  }, []);

  return isLoading ? (
    <>
      <TranslatedText lKey="loading" />
    </>
  ) : (
    <>
      {editedGiftId ? (
        <GiftEdit id={editedGiftId} onSubmit={() => setEditedGiftId(null)} />
      ) : (
        <GiftAdd />
      )}
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

          {giftedUserId !== 0 ? (
            <GiftsList
              userId={giftedUserId}
              adminActions={true}
              editGift={(id: number) => setEditedGiftId(id)}
            />
          ) : (
            <></>
          )}
        </main>
      </section>
    </>
  );
};
