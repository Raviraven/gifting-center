import { Formik, Form } from 'formik';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { GiftEdit } from '../../api/models/gift';

import { getGiftsForUser, updateGift } from '../../api/services/gifts';

interface GiftsListProps {
  userId: number;
}

export const GiftsList = (props: GiftsListProps) => {
  const { userId } = props;

  // const queryClient = useQueryClient();
  const { isLoading, data } = useQuery('gifts-list', () => {
    return getGiftsForUser(userId);
  });

  //queryClient.invalidateQueries('gifts-list');

  return isLoading ? (
    <p>Loading... </p>
  ) : (
    <>
      {data?.map((gift, i) => (
        <SingleGift
          key={`key-${gift.id}-${i}`}
          categoryId={gift.categoryId}
          deleted={gift.deleted}
          id={gift.id}
          name={gift.name}
          price={gift.price}
          reserved={gift.reserved}
          url={gift.url}
          giftedUserId={gift.giftedUserId}
        />
      ))}
    </>
  );
};

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

const SingleGift = ({
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
    <section>
      <header>
        <p>{name}</p>
        <p>{price}</p>
      </header>
      <main>
        <div>{url}</div>
        <div>
          Reserved?
          {reserved ? (
            '✅'
          ) : (
            <Formik<GiftEdit> initialValues={gift} onSubmit={onSubmit}>
              <Form>
                <button type="submit">Reserve</button>
              </Form>
            </Formik>
          )}
        </div>
      </main>
    </section>
  );
};
