import './GiftsList.scss';

import { useCallback, useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { GiftList as GiftListModel } from '../../api/models/gift';

import { useCategories } from '../../api/hooks/categories';

import { TranslatedText } from '../translated-text/TranslatedText';
import { useGiftsForUser } from '../../api/hooks/gifts';

import { SingleGift } from './SingleGift';

interface GiftsListProps {
  userId: number;
  adminActions?: boolean;
  showDeleted?: boolean;
  editGift?: (giftId: number) => void;
}

interface GiftsByCategory {
  categoryName: string;
  gifts: GiftListModel[];
}

export const GiftsList = (props: GiftsListProps) => {
  const { userId, editGift, adminActions = false, showDeleted = false } = props;
  const [giftsByCategory, setGiftsByCategory] = useState<GiftsByCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { isLoading: areGiftsLoading, data: giftsData } =
    useGiftsForUser(userId);

  const { isLoading: areCategoriesLoading, data: categoriesData } =
    useCategories();

  const getGiftsByCategory = useCallback(() => {
    if (!giftsData || !categoriesData) return;

    const tempGiftsByCategory: GiftsByCategory[] = [];

    giftsData.forEach((gift) => {
      if (!showDeleted && gift.deleted) return;

      const currentCategory = categoriesData.filter(
        (category) => category.id === gift.categoryId
      )[0];

      const currentGiftsForCategory = tempGiftsByCategory.filter(
        (g) => g.categoryName === currentCategory.name
      )[0];

      if (currentGiftsForCategory) {
        currentGiftsForCategory.gifts.push(gift);
        return;
      }

      tempGiftsByCategory.push({
        categoryName: currentCategory.name,
        gifts: [gift],
      });
    });

    setGiftsByCategory(tempGiftsByCategory);
    setLoading(false);
  }, [categoriesData, giftsData, showDeleted]);

  useEffect(() => {
    if (!areCategoriesLoading && !areGiftsLoading) {
      getGiftsByCategory();
    }
  }, [areCategoriesLoading, areGiftsLoading, getGiftsByCategory]);

  return areCategoriesLoading || areCategoriesLoading ? (
    <p>
      <TranslatedText lKey="loading" />
    </p>
  ) : giftsData ? (
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
                  categoryId={gift.categoryId}
                  deleted={gift.deleted}
                  id={gift.id}
                  name={gift.name}
                  price={gift.price}
                  reserved={gift.reserved}
                  url={gift.url}
                  giftedUserId={gift.giftedUserId}
                  adminActions={adminActions}
                  editGift={editGift}
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
