import './SingleGift.scss';

import { Formik, Form } from 'formik';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { GiftEdit } from '../../api/models/gift';
import { TranslatedText } from '../translated-text/TranslatedText';
import { useDeleteGift, useUpdateGift } from '../../api/hooks/gifts';

interface SingleGiftProps {
  id: number;
  name: string;
  price: number;
  url: string;
  reserved: boolean;
  deleted: boolean;
  categoryId: number;
  giftedUserId: number;

  adminActions?: boolean;
}

export const SingleGift = ({
  categoryId,
  deleted,
  id,
  name,
  price,
  reserved,
  url,
  giftedUserId,
  adminActions = false,
}: SingleGiftProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteGiftMutate } = useDeleteGift();
  const { mutate: updateGiftMutate } = useUpdateGift();

  const gift: GiftEdit = {
    categoryId: categoryId,
    deleted: deleted,
    giftedUserId: giftedUserId,
    id: id,
    name: name,
    price: price,
    reserved: true,
    url: url,
  };

  const onSubmit = useCallback(
    async (editedGift: GiftEdit) => {
      updateGiftMutate(editedGift);
      await queryClient.invalidateQueries('gifts-list');
    },
    [queryClient, updateGiftMutate]
  );

  const onDeleteSubmit = useCallback(
    async ({ id }: { id: number }) => {
      deleteGiftMutate(id);
      await queryClient.invalidateQueries('gifts-list');
    },
    [deleteGiftMutate, queryClient]
  );

  return (
    <section className="gift">
      <header className="header">
        <p>{name}</p>
        <p>{price}</p>
      </header>
      <main className="main">
        <div>
          <Link to={url} target="_blank" rel="noopener noreferrer">
            Link
          </Link>
        </div>
        <div>
          {reserved ? (
            <>
              ✅ <TranslatedText lKey="reserved" />
            </>
          ) : (
            <Formik<GiftEdit> initialValues={gift} onSubmit={onSubmit}>
              <Form>
                <button type="submit">
                  <TranslatedText lKey="reserve" />
                </button>
              </Form>
            </Formik>
          )}

          {adminActions && !deleted ? (
            <Formik initialValues={{ id: id }} onSubmit={onDeleteSubmit}>
              <Form>
                <button type="submit">
                  ❌ <TranslatedText lKey="delete" />
                </button>
              </Form>
            </Formik>
          ) : (
            <></>
          )}
        </div>
      </main>
    </section>
  );
};
