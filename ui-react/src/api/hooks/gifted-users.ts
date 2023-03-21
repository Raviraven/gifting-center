import { useMutation, useQuery } from 'react-query';

import { AddGiftedUser, GetGiftedUsers } from '../services/gifted-users';

export enum GiftedUsersQueryKeys {
  giftedUsers = 'gifted-users',
}

export const useAddGiftedUser = () =>
  useMutation(({ name }: { name: string }) => AddGiftedUser({ name }));

export const useGiftedUsers = () =>
  useQuery(GiftedUsersQueryKeys.giftedUsers, GetGiftedUsers);
