/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Category } from '../api/models/categories';
import { GiftList } from '../api/models/gift';
import { GiftedUser } from '../api/models/gifted-user';

import { GiftSchema } from './gift-schema';

const defaultGift: GiftList = {
  id: 0,
  name: 'test',
  price: '10',
  url: 'http://test.com',
  reserved: false,
  deleted: false,
  categoryId: 1,
  giftedUserId: 1,
};

const defaultCategories: Category[] = [
  {
    id: 1,
    name: 'first category',
  },
];

const defaultGiftedUsers: GiftedUser[] = [
  {
    id: 1,
    name: 'first gifted user',
  },
];

describe('gift-schema tests', () => {
  const schema = GiftSchema(defaultCategories, defaultGiftedUsers);

  test('should pass validation', async () => {
    await expect(schema.validate(defaultGift)).resolves.toBeTruthy();
  });

  test.each([{ id: null }, { id: 'test id' }])(
    'should show id must be a number message',
    async ({ id }) => {
      const test = {
        ...defaultGift,
        id: id,
      } as unknown as GiftList;

      await expect(schema.validate(test)).rejects.toThrow(
        expect.objectContaining({
          name: 'ValidationError',
          message: expect.stringContaining(
            'id must be a `number` type, but the final value was: `NaN`'
          ),
        })
      );
    }
  );

  test('should show id cant be lower than 0 message', async () => {
    const test = {
      ...defaultGift,
      id: -1,
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining('validationIdCannotBeLowerThanZero'),
      })
    );
  });

  test('should show name required message', async () => {
    const test = {
      ...defaultGift,
      name: null,
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining('validationNameFieldRequired'),
      })
    );
  });

  test('should show price required message', async () => {
    const test: GiftList = {
      ...defaultGift,
      price: null,
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining('validationPriceFieldRequired'),
      })
    );
  });

  test('should show price must be a number message', async () => {
    const test: GiftList = {
      ...defaultGift,
      price: 'test',
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining('validationPriceMustBeANumber'),
      })
    );
  });

  test.each([{ price: '0' }, { price: '-13' }])(
    'should show price must be a number message',
    async ({ price }) => {
      const test: GiftList = {
        ...defaultGift,
        price: price,
      } as unknown as GiftList;

      await expect(schema.validate(test)).rejects.toThrow(
        expect.objectContaining({
          name: 'ValidationError',
          message: expect.stringContaining(
            'validationPriceMustBeHigherThanZero'
          ),
        })
      );
    }
  );

  test('should show url required message', async () => {
    const test: GiftList = {
      ...defaultGift,
      url: null,
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining('validationUrlFieldRequired'),
      })
    );
  });

  test.each([
    { url: 'test' },
    { url: '12348' },
    { url: 't.t.t.t' },
    { url: 'http://test' },
  ])('should show url must match regex message', async ({ url }) => {
    const test: GiftList = {
      ...defaultGift,
      url: url,
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining(
          'validationUrlFieldMustBeValidUrlAddress'
        ),
      })
    );
  });

  test('should show reserved must be a boolean', async () => {
    const test: GiftList = {
      ...defaultGift,
      reserved: 'not boolean',
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining(
          'reserved must be a `boolean` type, but the final value was: `"not boolean"`'
        ),
      })
    );
  });

  test('should show reserved required message', async () => {
    const test: GiftList = {
      ...defaultGift,
      reserved: null,
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining('validationReservedFieldRequired'),
      })
    );
  });

  test('should show deleted must be a boolean', async () => {
    const test: GiftList = {
      ...defaultGift,
      deleted: 'not boolean',
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining(
          'deleted must be a `boolean` type, but the final value was: `"not boolean"`'
        ),
      })
    );
  });

  test('should show deleted required message', async () => {
    const test: GiftList = {
      ...defaultGift,
      deleted: null,
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining('validationDeletedFieldRequired'),
      })
    );
  });

  test.each([{ categoryId: null }, { categoryId: 'category id' }])(
    'should show categoryId must be a number message',
    async ({ categoryId }) => {
      const test: GiftList = {
        ...defaultGift,
        categoryId: categoryId,
      } as unknown as GiftList;

      await expect(schema.validate(test)).rejects.toThrow(
        expect.objectContaining({
          name: 'ValidationError',
          message: expect.stringContaining(
            'categoryId must be a `number` type, but the final value was: `NaN`'
          ),
        })
      );
    }
  );

  test('should show categoryId must be one of provided categories', async () => {
    const test: GiftList = {
      ...defaultGift,
      categoryId: 3,
    } as unknown as GiftList;

    const categories: Category[] = [
      ...defaultCategories,
      { id: 2, name: 'second category' },
      { id: 4, name: 'fourth category' },
    ];

    await expect(
      GiftSchema(categories, defaultGiftedUsers).validate(test)
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining(
          'validationCategoryIdFieldMustMatchOneOfCategoriesId'
        ),
      })
    );
  });

  test('should show error message when no categories provided', async () => {
    await expect(
      GiftSchema([], defaultGiftedUsers).validate(defaultGift)
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining(
          'validationCategoryIdFieldCategoriesNotProvided'
        ),
      })
    );
  });

  test.each([{ giftedUserId: null }, { giftedUserId: 'gifted user id' }])(
    'should show giftedUserId must be a number message',
    async ({ giftedUserId }) => {
      const test: GiftList = {
        ...defaultGift,
        giftedUserId: giftedUserId,
      } as unknown as GiftList;

      await expect(schema.validate(test)).rejects.toThrow(
        expect.objectContaining({
          name: 'ValidationError',
          message: expect.stringContaining(
            'giftedUserId must be a `number` type, but the final value was: `NaN`'
          ),
        })
      );
    }
  );

  test('should show giftedUserId must be one of provided gifted users', async () => {
    const test: GiftList = {
      ...defaultGift,
      giftedUserId: 2,
    } as unknown as GiftList;

    await expect(schema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining(
          'validationGiftedUserIdFieldMustMatchOneOfGiftedUsersId'
        ),
      })
    );
  });

  test('should show error message when no gifted users provided', async () => {
    await expect(
      GiftSchema(defaultCategories, []).validate(defaultGift)
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining(
          'validationGiftedUserIdFieldGiftedUsersNotProvided'
        ),
      })
    );
  });
});
