import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { GiftsQueryKeys, useAddGift } from '../../api/hooks/gifts';

import { GiftAdd as GiftAddModel } from '../../api/models/gift';

import { GiftForm } from './GiftForm';

export const GiftAdd = () => {
  const queryClient = useQueryClient();
  const addGiftMutation = useAddGift();

  const submitForm = useCallback(
    (values: GiftAddModel) => {
      addGiftMutation.mutate(values, {
        onSuccess: () =>
          queryClient.invalidateQueries(GiftsQueryKeys.giftsList),
      });
    },
    [addGiftMutation, queryClient]
  );

  return <GiftForm handleSubmit={submitForm} />;
};
