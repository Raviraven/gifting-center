import './SingleGift.scss';

import { Formik, Form } from 'formik';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { GiftEdit } from '../../api/models/gift';
import { updateGift } from '../../api/services/gifts';
import { TranslatedText } from '../translated-text/TranslatedText';

interface SingleGiftProps {
  id: number;
  name: string;
  price: number;
  url: string;
  reserved: boolean;
  deleted: boolean;
  categoryId: number;
  giftedUserId: number;
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
}: SingleGiftProps) => {
  const queryClient = useQueryClient();

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
      await updateGift(editedGift.id, editedGift);
      await queryClient.invalidateQueries('gifts-list');
    },
    [queryClient]
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
        </div>
      </main>
    </section>
  );
};
