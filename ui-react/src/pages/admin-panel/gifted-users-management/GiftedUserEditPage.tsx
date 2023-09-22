import { useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import { useCallback } from 'react';

import { GiftedUserEdit } from 'components/gifted-user/GiftedUserEdit';

export const GiftedUserEditPage = () => {
  const params = useParams();
  const giftedUserId = Number(params.id ?? 0);
  const navigate = useNavigate();

  const onSubmitClick = useCallback(() => {
    navigate('/admin-panel/gifted-users');
  }, [navigate]);

  return giftedUserId ? (
    <GiftedUserEdit id={giftedUserId} onSubmitClick={onSubmitClick} />
  ) : (
    <Typography variant="body1">no id</Typography>
  );
};
