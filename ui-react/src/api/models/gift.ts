export interface GiftList {
  id: number;
  name: string;
  price: number;
  url: string;
  reserved: boolean;
  deleted: boolean;
  categoryId: number;
  giftedUserId: number;
}

export type GiftEdit = GiftList;

export type GiftAdd = Omit<GiftList, 'id'>;
