import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';

import { useCategories } from '../../api/hooks/categories';
import { useGiftedUsers } from '../../api/hooks/gifted-users';

import { GiftAdd as GiftAddModel } from '../../api/models/gift';
import { SelectField, SelectFieldOption } from '../material/SelectField';
import { TextField } from '../material/TextField';
import { TranslatedText } from '../translated-text/TranslatedText';

export const GiftAdd = () => {
  const [categoriesDropdownOptions, setCategoriesDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);
  const [giftedUsersDropdownOptions, setGiftedUsersDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);

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

  const submitForm = useCallback((values: GiftAddModel) => {
    // eslint-disable-next-line no-console
    console.log(values);
  }, []);

  return areCategoriesLoading ? (
    <>
      <TranslatedText lKey="loading" />
    </>
  ) : (
    <section>
      <Formik<GiftAddModel> initialValues={initialValue} onSubmit={submitForm}>
        <Form>
          <TextField label="giftName" name="name" type={'text'} />
          <TextField label="giftPrice" name="price" type={'text'} />
          <TextField label="giftUrl" name="url" type={'url'} />

          <SelectField
            label="category"
            name="categoryId"
            options={categoriesDropdownOptions}
          />

          <SelectField
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