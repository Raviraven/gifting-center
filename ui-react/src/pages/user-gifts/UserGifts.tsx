import { useQuery } from 'react-query';

import { Typography } from '@mui/material';

import { GiftsList, TranslatedText } from 'components';

import { GetGiftedUserById } from 'api/services';

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
