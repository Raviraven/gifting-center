import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { axiosInstance } from '../axios';
import { GiftAdd, GiftEdit, GiftList } from '../models/gift';

export const AddGift = async (gift: GiftAdd) => {
  try {
    const result = await axiosInstance.post<GiftAdd>('gifts', gift);
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.response?.statusText);
  }
};

export const GetGiftById = async (id: number) => {
  try {
    const result = await axiosInstance.get<GiftList>(`/gifts/${id}`);
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error((err.response?.data as { message: string }).message);
  }
};

export const GetGiftsForUser = async (userId: number) => {
  try {
    const result = await axiosInstance.get<GiftList[]>(`/gifts/user/${userId}`);
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error((err.response?.data as { message: string }).message);
  }
};

export const UpdateGift = async (giftId: number, gift: GiftEdit) => {
  try {
    const result = await axiosInstance.put<GiftEdit>('/gifts', gift);
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.response?.statusText);
  }
};

export const DeleteGift = async (giftId: number) => {
  try {
    const result = await axiosInstance.delete<number>(`/gifts/${giftId}`);
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.response?.statusText);
  }
};
