import './SingleGift.scss';

import { Formik, Form } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Link as LinkMaterial,
} from '@mui/material';

import { RemoveCircle, EditOutlined } from '@mui/icons-material';

import { GiftEdit, GiftList } from 'api/models';
import { TranslatedText } from 'components';
import { GiftsQueryKeys, useDeleteGift, useUpdateGift } from 'api/hooks';

import { ReserveGiftSection } from './ReserveGiftSection';

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

  const [priceNumber, setPriceNumber] = useState<number>(0);

  const initialGiftValues: GiftEdit = useMemo(() => {
    return {
      categoryId: categoryId,
      deleted: deleted,
      giftedUserId: giftedUserId,
      id: id,
      name: name,
      price: price,
      reserved: reserved,
      url: url,
    };
  }, [categoryId, deleted, giftedUserId, id, name, price, reserved, url]);

  const onReserveClick = useCallback(
    ({ reserved }: { reserved: boolean }) => {
      const editedGift = { ...initialGiftValues, reserved: reserved };

      updateGiftMutate(editedGift, {
        onSuccess: () =>
          queryClient.invalidateQueries([
            GiftsQueryKeys.giftsList,
            giftedUserId,
          ]),
      });
    },
    [giftedUserId, initialGiftValues, queryClient, updateGiftMutate]
  );

  const onDeleteSubmit = useCallback(
    ({ id }: { id: number }) => {
      deleteGiftMutate(id, {
        onSuccess: () =>
          queryClient.invalidateQueries([
            GiftsQueryKeys.giftsList,
            giftedUserId,
          ]),
      });
    },
    [deleteGiftMutate, giftedUserId, queryClient]
  );

  const handleEdit = useCallback(
    (id: number) => {
      if (editGift) {
        editGift(id);
      }
    },
    [editGift]
  );

  useEffect(() => {
    setPriceNumber(Number(price));
  }, [price]);

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
            {`${priceNumber.toFixed(2)} zł`}
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
          <ReserveGiftSection
            reserved={reserved}
            onSubmit={onReserveClick}
            adminActions={adminActions}
          />
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
