import * as yup from 'yup';

import { Category, GiftedUser } from 'api/models';

export const GiftSchema = (categories: Category[], giftedUsers: GiftedUser[]) =>
  yup.object({
    id: yup.number().min(0, 'validationIdCannotBeLowerThanZero').required(),
    name: yup.string().required('validationNameFieldRequired'),
    price: yup
      .string()
      .test((value, context) => {
        if (value) {
          const parsedValue = Number(value);
          if (Number.isNaN(parsedValue)) {
            return context.createError({
              message: 'validationPriceMustBeANumber',
            });
          } else if (parsedValue <= 0) {
            return context.createError({
              message: 'validationPriceMustBeHigherThanZero',
            });
          }
        }

        return true;
      })
      .required('validationPriceFieldRequired'),
    url: yup
      .string()
      .test((value, context) => {
        if (value) {
          const expression =
            // eslint-disable-next-line no-useless-escape
            /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
          const regex = new RegExp(expression);

          if (!value.match(regex)) {
            return context.createError({
              message: 'validationUrlFieldMustBeValidUrlAddress',
            });
          }
        }

        return true;
      })
      .required('validationUrlFieldRequired'),
    reserved: yup.boolean().required('validationReservedFieldRequired'),
    deleted: yup.boolean().required('validationDeletedFieldRequired'),
    categoryId: yup
      .number()
      .required()
      .test((value, context) => {
        //if (value) {
        if (categories.length > 0) {
          if (categories.findIndex((n) => n.id === value) === -1) {
            return context.createError({
              message: 'validationCategoryIdFieldMustMatchOneOfCategoriesId',
            });
          }
        } else {
          return context.createError({
            message: 'validationCategoryIdFieldCategoriesNotProvided',
          });
        }
        //}

        return true;
      }),
    giftedUserId: yup
      .number()
      .required()
      .test((value, context) => {
        //if (value) {
        if (giftedUsers.length > 0) {
          if (giftedUsers.findIndex((n) => n.id === value) === -1) {
            return context.createError({
              message: 'validationGiftedUserIdFieldMustMatchOneOfGiftedUsersId',
            });
          }
        } else {
          return context.createError({
            message: 'validationGiftedUserIdFieldGiftedUsersNotProvided',
          });
        }
        //}

        return true;
      }),
  });
