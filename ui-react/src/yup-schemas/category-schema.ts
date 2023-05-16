import * as yup from 'yup';

import { Category } from '../api/models/categories';

export const CategorySchema: yup.Schema<Category> = yup.object({
  id: yup.number().min(0, 'validationIdCannotBeLowerThanZero').required(),
  name: yup.string().required('validationNameFieldRequired'),
});
