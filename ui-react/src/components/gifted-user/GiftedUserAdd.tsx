import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { FormikHelpers } from 'formik';

import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';

import { GiftedUsersQueryKeys, useAddGiftedUser } from 'api/hooks';

import { GiftedUser } from 'api/models';

import { GiftedUserForm } from './GiftedUserForm';

export const GiftedUserAdd = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate } = useAddGiftedUser();

  const onSuccessSubmit = useCallback(async () => {
    await queryClient.invalidateQueries(GiftedUsersQueryKeys.giftedUsers);
    toast.success(t('giftedUserSuccessfullyAdded'));
  }, [queryClient, t]);

  const handleSubmit = useCallback(
    ({ name }: { name: string }, formikHelpers: FormikHelpers<GiftedUser>) => {
      mutate(
        { name },
        {
          onSuccess: () => onSuccessSubmit(),
          onSettled: () => formikHelpers.resetForm(),
        }
      );
    },
    [mutate, onSuccessSubmit]
  );

  return <GiftedUserForm handleSubmit={handleSubmit} submitButtonLKey="add" />;
};
