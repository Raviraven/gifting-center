import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { axiosInstance } from '../axios';
import { GiftedUser } from '../models/gifted-user';

export const GetGiftedUsers = async () => {
  try {
    const result = await axiosInstance.get<GiftedUser[]>('/giftedusers');

    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.response?.statusText);
  }
};

export const GetGiftedUserById = async (userId: number) => {
  try {
    const result = await axiosInstance.get<GiftedUser>(
      `/giftedusers/${userId}`
    );

    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.response?.statusText);
  }
};
