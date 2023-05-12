import { useEffect, useState } from 'react';

import { Form, Formik } from 'formik';

import { Typography } from '@mui/material';

import { GiftList } from '../../api/models/gift';
import { SelectFieldOption } from '../material/SelectField';

import { useCategories } from '../../api/hooks/categories';
import { useGiftedUsers } from '../../api/hooks/gifted-users';
import { TranslatedText } from '../translated-text/TranslatedText';
import { TextFieldFormik } from '../material/formik/TextField';
import { SelectFieldFormik } from '../material/formik/SelectFieldFormik';
import { GiftSchema } from '../../yup-schemas/gift-schema';

interface GiftFormProps {
  gift?: GiftList;
  submitButtonLKey?: string;
  handleSubmit: (values: GiftList) => void;
}

export const GiftForm = ({
  gift,
  submitButtonLKey = 'add',
  handleSubmit,
}: GiftFormProps) => {
  const [categoriesDropdownOptions, setCategoriesDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);
  const [giftedUsersDropdownOptions, setGiftedUsersDropdownOptions] = useState<
    SelectFieldOption[]
  >([]);

  const initialValue: GiftList = {
    id: 0,
    name: '',
    price: '0',
    url: '',
    reserved: false,
    deleted: false,
    categoryId: 0,
    giftedUserId: 0,
  };

  const {
    isLoading: areCategoriesLoading,
    data: categoriesData,
    isError: categoriesIsError,
    //error: categoriesError,
  } = useCategories();

  const {
    isLoading: areGiftedUsersLoading,
    data: giftedUsersData,
    isError: giftedUsersIsError,
    //error: giftedUsersError,
  } = useGiftedUsers();

  useEffect(() => {
    if (
      !areCategoriesLoading &&
      categoriesData &&
      Array.isArray(categoriesData)
    ) {
      setCategoriesDropdownOptions([
        ...categoriesData.map((c) => {
          return { key: c.id, value: c.name };
        }),
      ]);
    }
  }, [areCategoriesLoading, categoriesData]);

  useEffect(() => {
    if (
      !areGiftedUsersLoading &&
      giftedUsersData &&
      Array.isArray(giftedUsersData)
    ) {
      setGiftedUsersDropdownOptions([
        ...giftedUsersData.map((gu) => {
          return { key: gu.id, value: gu.name };
        }),
      ]);
    }
  }, [areGiftedUsersLoading, giftedUsersData]);

  if (categoriesIsError || giftedUsersIsError) {
    return (
      <>
        {categoriesIsError ? (
          <Typography variant="body1">
            <TranslatedText lKey="cannotFetchCategories" />
          </Typography>
        ) : (
          <></>
        )}
        {giftedUsersIsError ? (
          <Typography variant="body1">
            <TranslatedText lKey="cannotFetchGiftedUsers" />
          </Typography>
        ) : (
          <></>
        )}
      </>
    );
  }

  return areCategoriesLoading || areGiftedUsersLoading ? (
    <>
      <TranslatedText lKey="loading" />
    </>
  ) : (
    <section>
      <Formik<GiftList>
        initialValues={gift ?? initialValue}
        onSubmit={handleSubmit}
        validationSchema={GiftSchema(
          categoriesData ?? [],
          giftedUsersData ?? []
        )}
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
            <TranslatedText lKey={submitButtonLKey} />
          </button>
        </Form>
      </Formik>
    </section>
  );
};
