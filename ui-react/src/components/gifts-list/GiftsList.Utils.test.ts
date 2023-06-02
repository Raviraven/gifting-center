import { Category } from '../../api/models/categories';
import { GiftList } from '../../api/models/gift';

import { GetGiftsByCategory } from './GiftsList.Utils';

const defaultGifts: GiftList[] = [
  {
    id: 1,
    categoryId: 1,
    deleted: false,
    giftedUserId: 1,
    name: 'PC Mouse',
    price: '12',
    reserved: false,
    url: '',
  },
  {
    id: 2,
    categoryId: 2,
    deleted: false,
    giftedUserId: 1,
    name: 'Hobbit',
    price: '45',
    reserved: false,
    url: '',
  },
  {
    id: 3,
    categoryId: 2,
    deleted: true,
    giftedUserId: 1,
    name: 'DnD Players Handbook',
    price: '280',
    reserved: false,
    url: '',
  },
];

const defaultCategories: Category[] = [
  {
    id: 1,
    name: 'General',
  },
  {
    id: 2,
    name: 'Books',
  },
];

describe('GiftsList.Utils tests', () => {
  test.each([
    { gifts: undefined, categories: defaultCategories },
    { gifts: defaultGifts, categories: undefined },
  ])(
    'should return empty array when no gifts or categories provided',
    ({ categories, gifts }) => {
      expect(GetGiftsByCategory(gifts, categories)).toStrictEqual([]);
    }
  );

  test('should return dictionary with gifts per category', () => {
    const result = GetGiftsByCategory(defaultGifts, defaultCategories);

    expect(result).toStrictEqual([
      {
        categoryName: 'Books',
        gifts: [
          {
            categoryId: 2,
            deleted: false,
            giftedUserId: 1,
            id: 2,
            name: 'Hobbit',
            price: '45',
            reserved: false,
            url: '',
          },
        ],
      },
      {
        categoryName: 'General',
        gifts: [
          {
            categoryId: 1,
            deleted: false,
            giftedUserId: 1,
            id: 1,
            name: 'PC Mouse',
            price: '12',
            reserved: false,
            url: '',
          },
        ],
      },
    ]);
  });

  test('should show deleted gifts when flag provided', () => {
    const result = GetGiftsByCategory(defaultGifts, defaultCategories, true);

    expect(result).toContainEqual({
      categoryName: 'Books',
      gifts: [
        {
          categoryId: 2,
          deleted: false,
          giftedUserId: 1,
          id: 2,
          name: 'Hobbit',
          price: '45',
          reserved: false,
          url: '',
        },
        {
          id: 3,
          categoryId: 2,
          deleted: true,
          giftedUserId: 1,
          name: 'DnD Players Handbook',
          price: '280',
          reserved: false,
          url: '',
        },
      ],
    });
  });
});
