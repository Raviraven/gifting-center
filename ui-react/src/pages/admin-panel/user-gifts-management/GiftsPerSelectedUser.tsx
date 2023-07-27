import { useCallback, useEffect, useState } from 'react';

import { useQueryClient } from 'react-query';

import { SelectChangeEvent, Typography } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';

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
  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useGiftedUsers();

  const handleOnChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const val = event.target.value;
      const navigateUrlParam = val !== '0' ? `/${val}` : '';

      setGiftedUserIdString(val);
      void queryClient.invalidateQueries([GiftsQueryKeys.giftsList, id]);
      navigate('/admin-panel/gifts' + navigateUrlParam);
    },
    [id, navigate, queryClient]
  );

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      setGiftedUsersDropdownOptions([
        ...data.map((gu) => {
          return { key: gu.id, value: gu.name };
        }),
      ]);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (params.userId) {
      setGiftedUserIdString(params.userId);
    }
  }, [params.userId]);

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
