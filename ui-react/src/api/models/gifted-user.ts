export interface GiftedUser {
  id: number;
  name: string;
}

export type GiftedUserAdd = Omit<GiftedUser, 'id'>;
