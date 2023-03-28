import './SingleGift.scss';

import { Formik, Form } from 'formik';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Link as LinkMaterial,
} from '@mui/material';

import { CheckCircle, RemoveCircle, EditOutlined } from '@mui/icons-material';

import { GiftEdit, GiftList } from '../../api/models/gift';
import { TranslatedText } from '../translated-text/TranslatedText';
import {
  GiftsQueryKeys,
  useDeleteGift,
  useUpdateGift,
} from '../../api/hooks/gifts';

interface SingleGiftProps {
  gift: GiftList;

  adminActions?: boolean;
  editGift?: (giftId: number) => void;
}

export const SingleGift = ({
  gift,
  editGift,
  adminActions = false,
}: SingleGiftProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteGiftMutate } = useDeleteGift();
  const { mutate: updateGiftMutate } = useUpdateGift();

  const { categoryId, deleted, giftedUserId, id, name, price, reserved, url } =
    gift;

  const initialGiftValues: GiftEdit = {
    categoryId: categoryId,
    deleted: deleted,
    giftedUserId: giftedUserId,
    id: id,
    name: name,
    price: price,
    reserved: true,
    url: url,
  };

  const onSubmit = useCallback(
    (editedGift: GiftEdit) => {
      updateGiftMutate(editedGift, {
        onSuccess: () =>
          queryClient.invalidateQueries(GiftsQueryKeys.giftsList),
      });
    },
    [queryClient, updateGiftMutate]
  );

  const onDeleteSubmit = useCallback(
    ({ id }: { id: number }) => {
      deleteGiftMutate(id, {
        onSuccess: () =>
          queryClient.invalidateQueries(GiftsQueryKeys.giftsList),
      });
    },
    [deleteGiftMutate, queryClient]
  );

  const handleEdit = useCallback(
    (id: number) => {
      if (editGift) {
        editGift(id);
      }
    },
    [editGift]
  );

  return (
    <Card>
      <CardContent>
        <Grid
          item
          xs={12}
          component="header"
          container
          justifyContent={'space-between'}
        >
          <Typography variant="h5" component="p" align="left">
            {name}
          </Typography>
          <Typography variant="h6" component="p">
            {`${price.toFixed(2)} zł`}
          </Typography>
        </Grid>
        <Grid container component="main" spacing={1} justifyContent="center">
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LinkMaterial
              component={Link}
              target="_blank"
              rel="noopener noreferrer"
              to={url}
            >
              <TranslatedText lKey="linkToTheGift" />
            </LinkMaterial>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {reserved ? (
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CheckCircle color="success" />
                <Typography
                  component="p"
                  variant="body1"
                  align="center"
                  paddingLeft="0.25rem"
                >
                  <TranslatedText lKey="reserved" />
                </Typography>
              </Box>
            ) : (
              <Formik<GiftEdit>
                initialValues={initialGiftValues}
                onSubmit={onSubmit}
              >
                <Form>
                  <Button variant="outlined" type="submit" fullWidth>
                    <TranslatedText lKey="reserve" />
                  </Button>
                </Form>
              </Formik>
            )}
          </Grid>

          {adminActions ? (
            <>
              <Grid item xs={6}>
                <Formik initialValues={{ id: id }} onSubmit={onDeleteSubmit}>
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
                  onClick={() => handleEdit(id)}
                  fullWidth
                >
                  <EditOutlined sx={{ marginRight: '0.25rem' }} />
                  <TranslatedText lKey="edit" />
                </Button>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
};
