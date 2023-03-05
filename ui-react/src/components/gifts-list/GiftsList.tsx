import './GiftsList.scss';

import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { GiftList as GiftListModel } from '../../api/models/gift';

import { getGiftsForUser } from '../../api/services/gifts';
import { getCategories } from '../../api/services/categories';

import { SingleGift } from './SingleGift';

interface GiftsListProps {
  userId: number;
}

interface GiftsByCategory {
  categoryName: string;
  gifts: GiftListModel[];
}

export const GiftsList = (props: GiftsListProps) => {
  const { userId } = props;
  const [giftsByCategory, setGiftsByCategory] = useState<GiftsByCategory[]>([]);

  // const queryClient = useQueryClient();
  //queryClient.invalidateQueries('gifts-list');

  const { isLoading: areGiftsLoading, data: giftsData } = useQuery(
    'gifts-list',
    () => {
      return getGiftsForUser(userId);
    }
  );

  const { isLoading: areCategoriesLoading, data: categoriesData } = useQuery(
    'categories',
    getCategories
  );

  const getGiftsByCategory = useCallback(() => {
    if (!giftsData || !categoriesData) return;

    const tempGiftsByCategory: GiftsByCategory[] = [];

    giftsData.forEach((gift) => {
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
  }, [categoriesData, giftsData]);

  useEffect(() => {
    if (!areCategoriesLoading && !areGiftsLoading) {
      getGiftsByCategory();
    }
  }, [areCategoriesLoading, areGiftsLoading, getGiftsByCategory]);

  return areGiftsLoading && areCategoriesLoading ? (
    <p>Loading... </p>
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
              />
            ))}
          </main>
        </section>
      ))}
    </>
  );
};
