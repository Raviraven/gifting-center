import { toast } from 'react-toastify';

import { axiosInstance } from '../axios';
import { GiftEdit, GiftList } from '../models/gift';

export const getGiftsForUser = async (userId: number) => {
  const result = await axiosInstance.get<GiftList[]>(`/gifts/user/${userId}`);

  if (result.status === 200) {
    return result.data;
  } else {
    toast.error(result.statusText);
  }
};

export const updateGift = async (giftId: number, gift: GiftEdit) => {
  const result = await axiosInstance.put<GiftEdit>('/gifts', gift);

  if (result.status === 200) {
    return result.data;
  } else {
    toast.error(result.statusText);
  }
};
