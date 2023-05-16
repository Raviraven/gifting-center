import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { axiosInstance } from '../../api/axios';
import { Category } from '../../api/models/categories';
import { GiftList } from '../../api/models/gift';

import { TestQueryClientProvider } from '../../tests/TestQueryClientProvider';

import { GiftsList } from './GiftsList';

const defaultCategories: Category[] = [
  {
    id: 1,
    name: 'Books',
  },
  {
    id: 2,
    name: 'Toys',
  },
];

const defaultUsersGifts: GiftList[] = [
  {
    categoryId: 1,
    deleted: false,
    giftedUserId: 1,
    id: 1,
    name: 'first gift',
    price: '-20.92',
    reserved: false,
    url: '',
  },
];

describe('GiftsList tests', () => {
  beforeEach(() => {
    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === '/gifts/user/-1') {
        return Promise.resolve({ data: [] });
      }

      if (url === '/gifts/user/1') {
        return Promise.resolve({ data: defaultUsersGifts });
      } else if (url === '/categories') {
        return Promise.resolve({ status: 200, data: defaultCategories });
      }
      return Promise.resolve({ data: {} });
    });

    jest.spyOn(axiosInstance, 'put').mockImplementation((url: string) => {
      if (url === '/gifts') {
        return Promise.resolve({
          status: 200,
          data: { ...defaultUsersGifts[0], reserved: true },
        });
      }

      return Promise.resolve({ data: {} });
    });
  });

  test('should show loading while fetching data from api', async () => {
    render(
      <TestQueryClientProvider>
        <MemoryRouter>
          <GiftsList userId={-1} />
        </MemoryRouter>
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  test('should show no gifts for selected user message when received 404 from backend', async () => {
    render(
      <TestQueryClientProvider>
        <MemoryRouter>
          <GiftsList userId={-1} />
        </MemoryRouter>
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('noGiftsForSelectedUser')).toBeInTheDocument();
    });
  });

  test('should show list of fetched gifts by category for user from api', async () => {
    render(
      <MemoryRouter>
        <TestQueryClientProvider>
          <GiftsList userId={1} />
        </TestQueryClientProvider>
      </MemoryRouter>
    );

    // mb adjust a lil' - add more categories and check whether gifts are shown for proper category
    await waitFor(() => {
      expect(screen.getByText('Books')).toBeInTheDocument();
      expect(screen.getByText('first gift')).toBeInTheDocument();
    });
  });

  test('should refetch gifts when reserve button clicked', async () => {
    let numberOfGiftsFetch = 0;

    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === '/gifts/user/1') {
        numberOfGiftsFetch++;
        return Promise.resolve({ data: defaultUsersGifts });
      } else if (url === '/categories') {
        return Promise.resolve({ status: 200, data: defaultCategories });
      }
      return Promise.resolve({ data: {} });
    });

    render(
      <MemoryRouter>
        <TestQueryClientProvider>
          <GiftsList userId={1} />
        </TestQueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('reserve'));
    });

    await waitFor(() => {
      expect(numberOfGiftsFetch).toBe(2);
    });
  });
});
