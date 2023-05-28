import { useCallback, useEffect, useState } from 'react';

import { useQueryClient } from 'react-query';

import { SelectChangeEvent, Typography } from '@mui/material';

import { GiftsList } from '../../../components/gifts-list/GiftsList';
import {
  SelectField,
  SelectFieldOption,
} from '../../../components/material/SelectField';
import { useGiftedUsers } from '../../../api/hooks/gifted-users';

import { TranslatedText } from '../../../components/translated-text/TranslatedText';
import { GiftsQueryKeys } from '../../../api/hooks/gifts';

export const GiftsPerSelectedUser = () => {
  const [giftedUsersDropdownOptions, setGiftedUsersDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);
  const [giftedUserIdString, setGiftedUserIdString] = useState<string>('0');
  const [id, setId] = useState<number>(0);
  const queryClient = useQueryClient();

  const { isLoading, data } = useGiftedUsers();

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
      void queryClient.invalidateQueries([GiftsQueryKeys.giftsList, id]);
    },
    [id, queryClient]
  );

  useEffect(() => {
    setId(Number(giftedUserIdString) ?? 0);
  }, [giftedUserIdString]);

  return isLoading ? (
    <Typography variant="body2">
      <TranslatedText lKey="loading" />
    </Typography>
  ) : (
    <>
      <SelectField
        label="giftedUser"
        name="giftedUserId"
        options={giftedUsersDropdownOptions}
        onChange={handleOnChange}
        value={giftedUserIdString}
      />
      <GiftsList userId={id} adminActions={true} />
    </>
  );
};
