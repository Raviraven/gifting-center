import * as yup from 'yup';

import { Category } from '../api/models/categories';

export const CategorySchema: yup.Schema<Category> = yup.object({
  id: yup.number().min(0, 'Id field cannot be lower than 0').required(),
  name: yup.string().required('Name field required'),
});
