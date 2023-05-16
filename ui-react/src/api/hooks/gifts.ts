import { useMutation, useQuery } from 'react-query';

import { GiftAdd, GiftEdit } from '../models/gift';
import {
  AddGift,
  DeleteGift,
  GetGiftById,
  GetGiftsForUser,
  UpdateGift,
} from '../services/gifts';

export enum GiftsQueryKeys {
  gift = 'gift',
  giftsList = 'gifts-list',
}

export const useAddGift = () => useMutation((gift: GiftAdd) => AddGift(gift));

export const useDeleteGift = () =>
  useMutation((giftId: number) => DeleteGift(giftId));

export const useGift = (id: number) =>
  useQuery([GiftsQueryKeys.gift, id], () => GetGiftById(id));

export const useGiftsForUser = (userId: number) =>
  useQuery([GiftsQueryKeys.giftsList, userId], () => GetGiftsForUser(userId));

export const useUpdateGift = () =>
  useMutation((gift: GiftEdit) => UpdateGift(gift.id, gift));
