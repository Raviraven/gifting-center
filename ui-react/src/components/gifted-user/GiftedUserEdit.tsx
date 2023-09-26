import { useQueryClient } from 'react-query';

import { useCallback } from 'react';

import { Typography } from '@mui/material';

import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';

import {
  GiftedUsersQueryKeys,
  useEditGiftedUser,
  useGiftedUser,
} from 'api/hooks';

import { GiftedUser } from 'api/models';

import { TranslatedText } from 'components';

import { GiftedUserForm } from './GiftedUserForm';

interface GiftedUserEditProps {
  id: number;
  onSubmitClick: () => void;
}

export const GiftedUserEdit = ({ id, onSubmitClick }: GiftedUserEditProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useEditGiftedUser();
  const { data, isLoading } = useGiftedUser(id);
  const { t } = useTranslation();

  const onSuccessSubmit = useCallback(async () => {
    await queryClient.invalidateQueries(GiftedUsersQueryKeys.giftedUsers);
    await queryClient.invalidateQueries([GiftedUsersQueryKeys.giftedUser, id]);

    toast.success(t('giftedUserSuccessfullyEdited'));

    if (onSubmitClick) {
      onSubmitClick();
    }
  }, [id, onSubmitClick, queryClient, t]);

  const handleSubmit = useCallback(
    (user: GiftedUser) => {
      mutate(user, {
        onSuccess: () => onSuccessSubmit(),
      });
    },
    [mutate, onSuccessSubmit]
  );

  return isLoading ? (
    <Typography variant="body2">
      <TranslatedText lKey="loading" />
    </Typography>
  ) : data ? (
    <GiftedUserForm
      handleSubmit={handleSubmit}
      submitButtonLKey="save"
      giftedUser={data}
    />
  ) : (
    <Typography variant="body2">
      <TranslatedText lKey="wrongDataReceivedFromServer" />
    </Typography>
  );
};
