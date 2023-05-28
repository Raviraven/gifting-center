import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { FormikHelpers } from 'formik';

import { toast } from 'react-toastify';

import {
  GiftedUsersQueryKeys,
  useAddGiftedUser,
} from '../../api/hooks/gifted-users';

import { GiftedUser } from '../../api/models/gifted-user';

import { GiftedUserForm } from './GiftedUserForm';

export const GiftedUserAdd = () => {
  const queryClient = useQueryClient();

  const { mutate } = useAddGiftedUser();

  const onSuccessSubmit = useCallback(async () => {
    await queryClient.invalidateQueries(GiftedUsersQueryKeys.giftedUsers);
    toast.success('giftedUserSuccessfullyAdded');
  }, [queryClient]);

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
