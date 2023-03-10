import { useQuery } from 'react-query';

import { GetGiftedUsers } from '../services/gifted-users';

export const useGiftedUsers = () => useQuery('gifted-users', GetGiftedUsers);
