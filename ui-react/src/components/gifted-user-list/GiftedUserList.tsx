import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import { Form, Formik } from 'formik';
import { EditOutlined, RemoveCircle } from '@mui/icons-material';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { useNavigate } from 'react-router-dom';

import { TranslatedText } from '../translated-text/TranslatedText';
import {
  GiftedUsersQueryKeys,
  useDeleteGiftedUser,
  useGiftedUsers,
} from '../../api/hooks/gifted-users';

export const GiftedUserList = () => {
  const { isLoading, data } = useGiftedUsers();
  const { mutate: deleteGiftedUserMutate } = useDeleteGiftedUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onDeleteSubmit = useCallback(
    ({ id }: { id: number }) => {
      deleteGiftedUserMutate(id, {
        onSuccess: () =>
          queryClient.invalidateQueries(GiftedUsersQueryKeys.giftedUsers),
      });
    },
    [deleteGiftedUserMutate, queryClient]
  );

  const handleEdit = useCallback(
    (giftedUserId: number) => {
      navigate(`gifted-user-edit/${giftedUserId}`);
    },
    [navigate]
  );

  return isLoading ? (
    <Typography variant="body2">
      <TranslatedText lKey="loading" />
    </Typography>
  ) : data && data.length > 0 ? (
    <Grid container>
      {data.map((gUser, gUi) => (
        <Grid item key={`gifted-user-${gUser.name}-${gUi}`} xs={12}>
          <Card>
            <CardContent>
              <Grid
                item
                xs={12}
                component="header"
                container
                justifyContent={'space-between'}
              >
                <Typography variant="h5" component="p" align="center">
                  {gUser.name}
                </Typography>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Formik
                    initialValues={{ id: gUser.id }}
                    onSubmit={onDeleteSubmit}
                  >
                    <Form>
                      <Button
                        variant="outlined"
                        type="submit"
                        fullWidth
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <RemoveCircle
                          color="error"
                          sx={{ marginRight: '0.25rem' }}
                        />
                        <TranslatedText lKey="delete" />
                      </Button>
                    </Form>
                  </Formik>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={() => handleEdit(gUser.id)}
                    fullWidth
                  >
                    <EditOutlined sx={{ marginRight: '0.25rem' }} />
                    <TranslatedText lKey="edit" />
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : (
    <p>
      <TranslatedText lKey="noGiftedUsers" />
    </p>
  );
};
