import { useMutation, useQuery } from 'react-query';

import {
  AddGiftedUser,
  EditGiftedUser,
  GetGiftedUserById,
  GetGiftedUsers,
} from '../services/gifted-users';
import { GiftedUser } from '../models/gifted-user';

export enum GiftedUsersQueryKeys {
  giftedUser = 'gifted-user',
  giftedUsers = 'gifted-users',
}

export const useAddGiftedUser = () =>
  useMutation(({ name }: { name: string }) => AddGiftedUser({ name }));

export const useEditGiftedUser = () =>
  useMutation((user: GiftedUser) => EditGiftedUser(user));

export const useGiftedUser = (id: number) =>
  useQuery([GiftedUsersQueryKeys.giftedUser, id], () => GetGiftedUserById(id));

export const useGiftedUsers = () =>
  useQuery(GiftedUsersQueryKeys.giftedUsers, GetGiftedUsers);
