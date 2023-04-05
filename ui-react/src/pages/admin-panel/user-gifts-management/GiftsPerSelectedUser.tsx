import { useCallback, useEffect, useState } from 'react';

import { useQueryClient } from 'react-query';

import { SelectChangeEvent } from '@mui/material';

import { GiftsList } from '../../../components/gifts-list/GiftsList';
import {
  SelectField,
  SelectFieldOption,
} from '../../../components/material/SelectField';
import { useGiftedUsers } from '../../../api/hooks/gifted-users';

import { TranslatedText } from '../../../components/translated-text/TranslatedText';

export const GiftsPerSelectedUser = () => {
  const [giftedUsersDropdownOptions, setGiftedUsersDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);
  const [giftedUserIdString, setGiftedUserIdString] = useState<string>('0');
  const [id, setId] = useState<number>(0);

  const [editedGiftId, setEditedGiftId] = useState<number | null>();
  const queryClient = useQueryClient();

  const { isLoading, data } = useGiftedUsers();

  useEffect(() => {
    setId(Number(giftedUserIdString) ?? 0);
  }, [giftedUserIdString]);

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      setGiftedUsersDropdownOptions([
        ...data.map((gu) => {
          return { key: gu.id, value: gu.name };
        }),
      ]);
    }
  }, [data, isLoading]);

  const handleOnChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setGiftedUserIdString(event.target.value);

      void queryClient.invalidateQueries('gifts-list');
    },
    [queryClient]
  );

  return isLoading ? (
    <>
      <TranslatedText lKey="loading" />
    </>
  ) : (
    <>
      <SelectField
        label="giftedUser"
        name="giftedUserId"
        options={giftedUsersDropdownOptions}
        onChange={handleOnChange}
        value={giftedUserIdString}
      />
      <GiftsList
        userId={id}
        adminActions={true}
        editGift={(id: number) => setEditedGiftId(id)}
      />
    </>
  );
};
