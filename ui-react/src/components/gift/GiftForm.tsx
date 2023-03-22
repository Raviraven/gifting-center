import { useEffect, useState } from 'react';

import { Form, Formik } from 'formik';

import { GiftList } from '../../api/models/gift';
import { SelectFieldOption } from '../material/SelectField';

import { useCategories } from '../../api/hooks/categories';
import { useGiftedUsers } from '../../api/hooks/gifted-users';
import { TranslatedText } from '../translated-text/TranslatedText';
import { TextFieldFormik } from '../material/formik/TextField';
import { SelectFieldFormik } from '../material/formik/SelectFieldFormik';

interface GiftFormProps {
  gift?: GiftList;
  handleSubmit: (values: GiftList) => void;
}

export const GiftForm = ({ gift, handleSubmit }: GiftFormProps) => {
  const [categoriesDropdownOptions, setCategoriesDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);
  const [giftedUsersDropdownOptions, setGiftedUsersDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);

  const initialValue: GiftList = {
    id: 0,
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

  return areCategoriesLoading ? (
    <>
      <TranslatedText lKey="loading" />
    </>
  ) : (
    <section>
      <Formik<GiftList>
        initialValues={gift ?? initialValue}
        onSubmit={handleSubmit}
      >
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
