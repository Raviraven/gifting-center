import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { useGift, useUpdateGift, GiftsQueryKeys } from '../../api/hooks/gifts';
import { GiftEdit as GiftEditModel } from '../../api/models/gift';
import { TranslatedText } from '../translated-text/TranslatedText';

import { GiftForm } from './GiftForm';

interface GiftEditProps {
  id: number;
  onSubmit?: () => void;
}

export const GiftEdit = ({ id, onSubmit }: GiftEditProps) => {
  const { isLoading, data } = useGift(id);
  const updateGiftMutation = useUpdateGift();
  const queryClient = useQueryClient();

  const handleSubmit = useCallback(
    (values: GiftEditModel) => {
      updateGiftMutation.mutate(values, {
        onSuccess: () =>
          queryClient.invalidateQueries(GiftsQueryKeys.giftsList),
      });

      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit, queryClient, updateGiftMutation]
  );

  return isLoading ? (
    <TranslatedText lKey="loading" />
  ) : (
    <GiftForm handleSubmit={handleSubmit} gift={data} />
  );
};
