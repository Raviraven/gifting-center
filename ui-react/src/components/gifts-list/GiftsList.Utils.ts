import { Category, GiftList } from 'api/models';

export interface GiftsByCategory {
  categoryName: string;
  gifts: GiftList[];
}

export const GetGiftsByCategory = (
  giftsData?: GiftList[],
  categoriesData?: Category[],
  showDeleted?: boolean
) => {
  if (!giftsData || !categoriesData) return [];

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

  return SortGifts(tempGiftsByCategory);
};

const SortGifts = (giftsGrouped: GiftsByCategory[]) => {
  const result = [
    ...giftsGrouped.sort((a, b) => (a.categoryName > b.categoryName ? 1 : -1)),
  ];
  result.forEach(
    (g) => (g.gifts = [...g.gifts.sort((a, b) => (a.id > b.id ? 1 : -1))])
  );
  return result;
};
