import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';

import { FormikHelpers } from 'formik';

import { GiftsQueryKeys, useAddGift } from 'api/hooks';

import { GiftAdd as GiftAddModel, GiftList } from 'api/models';

import { GiftForm } from './GiftForm';

export const GiftAdd = () => {
  const queryClient = useQueryClient();
  const addGiftMutation = useAddGift();
  const { t } = useTranslation();

  const submitSucceeded = useCallback(async () => {
    await queryClient.invalidateQueries(GiftsQueryKeys.giftsList);
    toast.success(t('giftSuccessfullyAdded'));
  }, [queryClient, t]);

  const submitForm = useCallback(
    (values: GiftAddModel, formikHelpers: FormikHelpers<GiftList>) => {
      addGiftMutation.mutate(values, {
        onSuccess: () => submitSucceeded(),
        onSettled: () => formikHelpers.resetForm(),
      });
    },
    [addGiftMutation, submitSucceeded]
  );

  return <GiftForm handleSubmit={submitForm} submitButtonLKey="add" />;
};
