import './SingleGift.scss';

import { Formik, Form } from 'formik';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { Button, Card, Typography, Link as LinkMaterial } from '@mui/material';

import Grid from '@mui/material/Grid/Grid';

import { GiftEdit } from '../../api/models/gift';
import { TranslatedText } from '../translated-text/TranslatedText';
import { useDeleteGift, useUpdateGift } from '../../api/hooks/gifts';

interface SingleGiftProps {
  id: number;
  name: string;
  price: number;
  url: string;
  reserved: boolean;
  deleted: boolean;
  categoryId: number;
  giftedUserId: number;

  adminActions?: boolean;
  editGift?: (giftId: number) => void;
}

export const SingleGift = ({
  categoryId,
  deleted,
  id,
  name,
  price,
  reserved,
  url,
  giftedUserId,
  editGift,
  adminActions = false,
}: SingleGiftProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteGiftMutate } = useDeleteGift();
  const { mutate: updateGiftMutate } = useUpdateGift();

  const gift: GiftEdit = {
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
    async (editedGift: GiftEdit) => {
      updateGiftMutate(editedGift);
      await queryClient.invalidateQueries('gifts-list');
    },
    [queryClient, updateGiftMutate]
  );

  const onDeleteSubmit = useCallback(
    async ({ id }: { id: number }) => {
      deleteGiftMutate(id);
      await queryClient.invalidateQueries('gifts-list');
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
      <Grid container padding="0.5rem">
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
            {price}zł
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
          <Grid item xs={4}>
            {reserved ? (
              <>
                ✅ <TranslatedText lKey="reserved" />
              </>
            ) : (
              <Formik<GiftEdit> initialValues={gift} onSubmit={onSubmit}>
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
              {!deleted ? (
                <Grid item xs={4}>
                  <Formik initialValues={{ id: id }} onSubmit={onDeleteSubmit}>
                    <Form>
                      <Button variant="outlined" type="submit" fullWidth>
                        ❌ <TranslatedText lKey="delete" />
                      </Button>
                    </Form>
                  </Formik>
                </Grid>
              ) : (
                <></>
              )}
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  type="submit"
                  onClick={() => handleEdit(id)}
                  fullWidth
                >
                  <TranslatedText lKey="edit" />
                </Button>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};
