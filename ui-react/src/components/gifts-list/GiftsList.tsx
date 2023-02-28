import { useQuery } from 'react-query';

import { getGiftsForUser } from '../../api/services/gifts';

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
  //giftedUserId: number;
}

const SingleGift = ({
  categoryId,
  deleted,
  id,
  name,
  price,
  reserved,
  url,
}: SingleGiftProps) => {
  return (
    <section>
      <header>
        <p>{name}</p>
        <p>{price}</p>
      </header>
      <main>
        <div>{url}</div>
        <div>{reserved ? '✅' : '⛔'}</div>
        <form></form>
      </main>
    </section>
  );
};
