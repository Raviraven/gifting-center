import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { axiosInstance } from '../axios';
import { GiftedUser } from '../models/gifted-user';

export const AddGiftedUser = async ({ name }: { name: string }) => {
  try {
    const result = await axiosInstance.post<GiftedUser>('giftedusers', {
      name,
    });
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.response?.statusText);
  }
};

export const EditGiftedUser = async (user: GiftedUser) => {
  const result = await axiosInstance.put<GiftedUser>(
    `giftedusers/${user.id}`,
    user
  );
  return result.data;
};

export const GetGiftedUsers = async () => {
  const result = await axiosInstance.get<GiftedUser[]>('giftedusers');
  return result.data;
};

export const GetGiftedUserById = async (userId: number) => {
  const result = await axiosInstance.get<GiftedUser>(`giftedusers/${userId}`);
  return result.data;
};
