import './GiftsList.scss';

import { useCallback, useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useCategories, useGiftsForUser } from 'api/hooks';

import { TranslatedText } from 'components';

import { SingleGift } from './SingleGift';
import { GetGiftsByCategory, GiftsByCategory } from './GiftsList.Utils';

interface GiftsListProps {
  userId: number;
  adminActions?: boolean;
  showDeleted?: boolean;
}

export const GiftsList = (props: GiftsListProps) => {
  const { userId, adminActions = false, showDeleted = false } = props;
  const [giftsByCategory, setGiftsByCategory] = useState<GiftsByCategory[]>([]);
  const navigate = useNavigate();

  const { isLoading: areGiftsLoading, data: giftsData } =
    useGiftsForUser(userId);

  const { isLoading: areCategoriesLoading, data: categoriesData } =
    useCategories();

  const editGift = useCallback(
    (giftId: number) => {
      navigate(`gift-edit/${giftId}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (!areCategoriesLoading && !areGiftsLoading) {
      setGiftsByCategory(
        GetGiftsByCategory(giftsData, categoriesData, showDeleted).sort(
          (a, b) => (a.categoryName > b.categoryName ? -1 : 1)
        )
      );
    }
  }, [
    areCategoriesLoading,
    areGiftsLoading,
    categoriesData,
    giftsData,
    showDeleted,
  ]);

  return areCategoriesLoading || areCategoriesLoading ? (
    <Typography variant="body2">
      <TranslatedText lKey="loading" />
    </Typography>
  ) : giftsData && giftsData.length > 0 ? (
    <Grid container>
      {giftsByCategory.map((giftCategory, gci) => (
        <Grid
          item
          key={`gift-category-${giftCategory.categoryName}-${gci}`}
          xs={12}
        >
          <Typography variant="h3" component="header">
            {giftCategory.categoryName}
          </Typography>
          <Grid container spacing={1} component="main">
            {giftCategory.gifts.map((gift, gi) => (
              <Grid item xs={12} md={12} key={`key-${gift.id}-${gi}`}>
                <SingleGift
                  gift={gift}
                  adminActions={adminActions}
                  editGift={() => editGift(gift.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  ) : (
    <TranslatedText lKey="noGiftsForSelectedUser" />
  );
};
