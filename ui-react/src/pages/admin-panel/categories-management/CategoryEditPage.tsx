import { useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import { useCallback } from 'react';

import { CategoryEdit } from 'components';

export const CategoryEditPage = () => {
  const params = useParams();
  const categoryId = Number(params.id ?? 0);
  const navigate = useNavigate();

  const onSubmitClick = useCallback(() => {
    navigate('/admin-panel/categories');
  }, [navigate]);

  return params.id ? (
    <CategoryEdit id={categoryId} onSubmitClick={onSubmitClick} />
  ) : (
    <Typography variant="body1">no id</Typography>
  );
};
