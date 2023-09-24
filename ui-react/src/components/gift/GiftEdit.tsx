import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { useGift, useUpdateGift, GiftsQueryKeys } from 'api/hooks';
import { GiftEdit as GiftEditModel } from 'api/models';
import { TranslatedText } from 'components';

import { GiftForm } from './GiftForm';

interface GiftEditProps {
  id: number;
  userId: number;
  onSubmit?: () => void;
}

export const GiftEdit = ({ id, onSubmit, userId }: GiftEditProps) => {
  const { isLoading, data } = useGift(id);
  const { t } = useTranslation();
  const updateGiftMutation = useUpdateGift();
  const queryClient = useQueryClient();

  const onSuccessSubmit = useCallback(async () => {
    await queryClient.invalidateQueries([GiftsQueryKeys.giftsList, userId]);
    toast.success(t('giftSuccessfullyEdited'));
  }, [queryClient, t, userId]);

  const handleSubmit = useCallback(
    (values: GiftEditModel) => {
      updateGiftMutation.mutate(values, {
        onSuccess: () => onSuccessSubmit(),
      });

      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit, onSuccessSubmit, updateGiftMutation]
  );

  return isLoading ? (
    <Typography variant="body2">
      <TranslatedText lKey="loading" />
    </Typography>
  ) : (
    <GiftForm handleSubmit={handleSubmit} gift={data} submitButtonLKey="save" />
  );
};
