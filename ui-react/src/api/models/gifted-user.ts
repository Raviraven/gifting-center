export interface GiftedUser {
  id: number;
  name: string;
  visibleOnIndexPage: boolean;
}

export type GiftedUserAdd = Omit<GiftedUser, 'id'>;
