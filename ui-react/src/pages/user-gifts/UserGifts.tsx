import { useQuery } from 'react-query';

import { Typography } from '@mui/material';

import { GetGiftedUserById } from '../../api/services/gifted-users';
import { GiftsList } from '../../components/gifts-list/GiftsList';
import { TranslatedText } from '../../components/translated-text/TranslatedText';

interface UserGiftsProps {
  userId: number;
}

export const UserGifts = ({ userId }: UserGiftsProps) => {
  const { isLoading, data } = useQuery(['gifted-user', userId], () =>
    GetGiftedUserById(userId)
  );

  return isLoading ? (
    <Typography variant="body2">
      <TranslatedText lKey="loading" />
    </Typography>
  ) : (
    <section>
      <h2 className="user-name">{data?.name}</h2>
      <GiftsList userId={userId} />
    </section>
  );
};
