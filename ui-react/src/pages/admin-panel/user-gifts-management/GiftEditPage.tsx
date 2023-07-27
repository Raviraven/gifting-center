import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GiftEdit } from 'components';

export const GiftEditPage = () => {
  const params = useParams();
  const giftId = Number(params.id ?? 0);
  const navigate = useNavigate();

  const onSubmitClick = useCallback(() => {
    const userIdParam = params.userId ? `/${params.userId}` : '';
    navigate('/admin-panel/gifts' + userIdParam);
  }, [navigate, params.userId]);

  return giftId ? (
    <GiftEdit id={giftId} onSubmit={onSubmitClick} />
  ) : (
    <Typography variant="body1">no id</Typography>
  );
};
