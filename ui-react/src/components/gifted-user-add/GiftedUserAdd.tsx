import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import {
  GiftedUsersQueryKeys,
  useAddGiftedUser,
} from '../../api/hooks/gifted-users';

import { GiftedUserForm } from './GiftedUserForm';

export const GiftedUserAdd = () => {
  const queryClient = useQueryClient();

  const { mutate } = useAddGiftedUser();

  const handleSubmit = useCallback(
    ({ name }: { name: string }) => {
      mutate(
        { name },
        {
          onSuccess: () =>
            queryClient.invalidateQueries(GiftedUsersQueryKeys.giftedUsers),
        }
      );
    },
    [mutate, queryClient]
  );

  return <GiftedUserForm handleSubmit={handleSubmit} submitButtonLKey="add" />;
};
