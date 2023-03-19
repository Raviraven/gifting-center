import { useMutation, useQuery } from 'react-query';

import { GiftAdd, GiftEdit } from '../models/gift';
import {
  AddGift,
  DeleteGift,
  GetGiftsForUser,
  UpdateGift,
} from '../services/gifts';

export const useAddGift = () => useMutation((gift: GiftAdd) => AddGift(gift));

export const useDeleteGift = () =>
  useMutation((giftId: number) => DeleteGift(giftId));

export const useGiftsForUser = (userId: number) =>
  useQuery('gifts-list', () => GetGiftsForUser(userId));

export const useUpdateGift = () =>
  useMutation((gift: GiftEdit) => UpdateGift(gift.id, gift));
