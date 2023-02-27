import { useQuery } from 'react-query';

import { getGiftsForUser } from '../../api/services/gifts';

export const GiftsList = () => {
  // const queryClient = useQueryClient();
  const { isLoading, data } = useQuery('gifts-list', () => {
    return getGiftsForUser(1);
  });

  //queryClient.invalidateQueries('gifts-list');

  return isLoading ? (
    <p>Loading... </p>
  ) : (
    <>
      {data?.map((gift, i) => (
        <div key={`key-${gift.id}-${i}`}>
          {gift.id} - {gift.categoryId} - {gift.name} - {gift.price}
        </div>
      ))}
    </>
  );
};
