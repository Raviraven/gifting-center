import './GiftsList.scss';

import { useCallback, useEffect, useState } from 'react';

import { GiftList as GiftListModel } from '../../api/models/gift';

import { useCategories } from '../../api/hooks/categories';

import { TranslatedText } from '../translated-text/TranslatedText';
import { useGiftsForUser } from '../../api/hooks/gifts';

import { SingleGift } from './SingleGift';

interface GiftsListProps {
  userId: number;
  adminActions?: boolean;
  showDeleted?: boolean;
}

interface GiftsByCategory {
  categoryName: string;
  gifts: GiftListModel[];
}

export const GiftsList = (props: GiftsListProps) => {
  const { userId, adminActions = false, showDeleted = false } = props;
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

      setLoading(false);
    });

    setGiftsByCategory(tempGiftsByCategory);
  }, [categoriesData, giftsData, showDeleted]);

  useEffect(() => {
    if (!areCategoriesLoading && !areGiftsLoading) {
      getGiftsByCategory();
    }
  }, [areCategoriesLoading, areGiftsLoading, getGiftsByCategory]);

  useEffect(() => {
    if (areCategoriesLoading || areGiftsLoading) {
      setLoading(true);
    }
  }, [areCategoriesLoading, areGiftsLoading]);

  return loading ? (
    <p>
      <TranslatedText lKey="loading" />
    </p>
  ) : (
    <>
      {giftsByCategory.map((giftCategory, gci) => (
        <section key={`gift-category-${giftCategory.categoryName}-${gci}`}>
          <header>{giftCategory.categoryName}</header>
          <main>
            {giftCategory.gifts.map((gift, gi) => (
              <SingleGift
                key={`key-${gift.id}-${gi}`}
                categoryId={gift.categoryId}
                deleted={gift.deleted}
                id={gift.id}
                name={gift.name}
                price={gift.price}
                reserved={gift.reserved}
                url={gift.url}
                giftedUserId={gift.giftedUserId}
                adminActions={adminActions}
              />
            ))}
          </main>
        </section>
      ))}
    </>
  );
};
