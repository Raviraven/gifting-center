import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GiftEdit } from '../../../components/gift/GiftEdit';

export const GiftEditPage = () => {
  const params = useParams();
  const giftId = Number(params.id ?? 0);
  const navigate = useNavigate();

  const onSubmitClick = useCallback(() => {
    navigate('/admin-panel/gifts');
  }, [navigate]);

  return giftId ? (
    <GiftEdit id={giftId} onSubmit={onSubmitClick} />
  ) : (
    <Typography variant="body1">no id</Typography>
  );
};
