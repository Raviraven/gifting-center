/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Category } from 'api/models';

import { CategorySchema } from './category-schema';

describe('category-schema tests', () => {
  test.each([{ id: null }, { id: 'test id' }])(
    'should show id must be a number message',
    async ({ id }) => {
      const test = {
        id: id,
        name: 'test',
      } as unknown as Category;

      await expect(CategorySchema.validate(test)).rejects.toThrow(
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
      id: -1,
      name: 'test',
    } as unknown as Category;

    await expect(CategorySchema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining('validationIdCannotBeLowerThanZero'),
      })
    );
  });

  test('should show name required message', async () => {
    const test = {
      id: 1,
      name: null,
    } as unknown as Category;

    await expect(CategorySchema.validate(test)).rejects.toThrow(
      expect.objectContaining({
        name: 'ValidationError',
        message: expect.stringContaining('validationNameFieldRequired'),
      })
    );
  });
});
