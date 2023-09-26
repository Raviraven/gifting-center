import * as yup from 'yup';

import { GiftedUser } from 'api/models';

export const GiftedUserSchema = () =>
  yup.object<GiftedUser>({
    id: yup.number().min(0, 'validationIdCannotBeLowerThanZero').required(),
    name: yup.string().required('validationNameFieldRequired'),
  });
