import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCategories } from '../../api/hooks/categories';
import { useGiftedUsers } from '../../api/hooks/gifted-users';
import { useAddGift } from '../../api/hooks/gifts';

import { GiftAdd as GiftAddModel } from '../../api/models/gift';
import {
  SelectFieldFormik,
  SelectFieldOption,
} from '../material/formik/SelectFieldFormik';
import { TextFieldFormik } from '../material/formik/TextField';
import { TranslatedText } from '../translated-text/TranslatedText';

export const GiftAdd = () => {
  const [categoriesDropdownOptions, setCategoriesDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);
  const [giftedUsersDropdownOptions, setGiftedUsersDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);

  const queryClient = useQueryClient();

  const initialValue: GiftAddModel = {
    name: '',
    price: 0,
    url: '',
    reserved: false,
    deleted: false,
    categoryId: 0,
    giftedUserId: 0,
  };

  const { isLoading: areCategoriesLoading, data: categoriesData } =
    useCategories();

  const { isLoading: areGiftedUsersLoading, data: giftedUsersData } =
    useGiftedUsers();

  const addGiftMutation = useAddGift();

  useEffect(() => {
    if (!areCategoriesLoading && categoriesData) {
      setCategoriesDropdownOptions([
        ...categoriesData.map((c) => {
          return { key: c.id, value: c.name };
        }),
      ]);
    }
  }, [areCategoriesLoading, categoriesData]);

  useEffect(() => {
    if (!areGiftedUsersLoading && giftedUsersData) {
      setGiftedUsersDropdownOptions([
        ...giftedUsersData.map((gu) => {
          return { key: gu.id, value: gu.name };
        }),
      ]);
    }
  }, [areGiftedUsersLoading, giftedUsersData]);

  const submitForm = useCallback(
    async (values: GiftAddModel) => {
      // eslint-disable-next-line no-console
      console.log(values);
      addGiftMutation.mutate(values);

      await queryClient.invalidateQueries('gifts-list');
    },
    [addGiftMutation, queryClient]
  );

  return areCategoriesLoading ? (
    <>
      <TranslatedText lKey="loading" />
    </>
  ) : (
    <section>
      <Formik<GiftAddModel> initialValues={initialValue} onSubmit={submitForm}>
        <Form>
          <TextFieldFormik label="giftName" name="name" type={'text'} />
          <TextFieldFormik label="giftPrice" name="price" type={'text'} />
          <TextFieldFormik label="giftUrl" name="url" type={'url'} />

          <SelectFieldFormik
            label="category"
            name="categoryId"
            options={categoriesDropdownOptions}
          />

          <SelectFieldFormik
            label="giftedUser"
            name="giftedUserId"
            options={giftedUsersDropdownOptions}
          />

          <button type="submit">
            <TranslatedText lKey="add" />
          </button>
        </Form>
      </Formik>
    </section>
  );
};
