import { useQuery } from 'react-query';

import { Grid, Typography } from '@mui/material';

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
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold">
          {data?.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <GiftsList userId={userId} />
      </Grid>
    </Grid>
  );
};
