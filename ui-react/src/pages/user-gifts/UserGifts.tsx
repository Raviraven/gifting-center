import { useQuery } from 'react-query';

import { GetGiftedUserById } from '../../api/services/gifted-users';
import { GiftsList } from '../../components/gifts-list/GiftsList';

interface UserGiftsProps {
  userId: number;
}

export const UserGifts = ({ userId }: UserGiftsProps) => {
  const { isLoading, data } = useQuery(['gifted-user', userId], () =>
    GetGiftedUserById(userId)
  );

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <h2 className="user-name">{data?.name}</h2>
      <GiftsList userId={userId} />
    </section>
  );
};
