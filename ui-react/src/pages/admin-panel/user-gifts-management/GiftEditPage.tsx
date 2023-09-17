import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GiftEdit } from 'components';

export const GiftEditPage = () => {
  const params = useParams();
  const giftId = Number(params.id ?? 0);
  const userId = Number(params.userId ?? 0);
  const navigate = useNavigate();

  const onSubmitClick = useCallback(() => {
    const userIdParam = userId > 0 ? `/${userId}` : '';
    navigate('/admin-panel/gifts' + userIdParam);
  }, [navigate, params.userId]);

  return giftId ? (
    <GiftEdit id={giftId} userId={userId} onSubmit={onSubmitClick} />
  ) : (
    <Typography variant="body1">no id</Typography>
  );
};
