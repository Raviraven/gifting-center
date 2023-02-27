import { axiosInstance } from '../axios';
import { GiftList } from '../models/gift';

export const getGiftsForUser = async (userId: number) => {
  const result = await axiosInstance.get<GiftList[]>(`/gifts/user/${userId}`);

  if (result.status === 200) {
    return result.data;
  } else {
    // toast
  }
};
