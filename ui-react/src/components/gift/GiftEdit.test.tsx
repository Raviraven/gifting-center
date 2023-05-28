import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { toast } from 'react-toastify';

import { TestQueryClientProvider } from '../../tests/TestQueryClientProvider';

import { GiftList } from '../../api/models/gift';
import { Category } from '../../api/models/categories';
import { GiftedUser } from '../../api/models/gifted-user';
import { axiosInstance } from '../../api/axios';

import { GiftEdit } from './GiftEdit';

const defaultGift: GiftList = {
  id: 13,
  name: 'test gift name',
  price: '15.23',
  url: 'http://test-gift.name',
  reserved: false,
  deleted: false,
  categoryId: 1,
  giftedUserId: 1,
};

const defaultCategory: Category = {
  id: 1,
  name: 'general',
};

const defaultGiftedUser: GiftedUser = {
  id: 1,
  name: 'default user',
};

describe('GiftEdit tests', () => {
  beforeEach(() => {
    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === '/gifts/13') {
        return Promise.resolve({ data: defaultGift });
      } else if (url === '/categories') {
        return Promise.resolve({ data: [defaultCategory], status: 200 });
      } else if (url === 'giftedusers') {
        return Promise.resolve({ data: [defaultGiftedUser], status: 200 });
      }

      return Promise.resolve({ data: {} });
    });
  });

  test('should show loading when getting edited gift information', async () => {
    render(
      <TestQueryClientProvider>
        <GiftEdit id={13} />
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  test('should fulfill gifts values into input fields', async () => {
    render(
      <TestQueryClientProvider>
        <GiftEdit id={13} />
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('test gift name')).toBeInTheDocument();
      expect(screen.getByDisplayValue('15.23')).toBeInTheDocument();
      expect(
        screen.getByDisplayValue('http://test-gift.name')
      ).toBeInTheDocument();
      expect(screen.getByText('general')).toBeInTheDocument();
      expect(screen.getByText('default user')).toBeInTheDocument();
    });
  });

  test('should call endpoint api with expected data, when save clicked', async () => {
    const mockedAxiosPut = jest.fn();
    jest.spyOn(axiosInstance, 'put').mockImplementation(mockedAxiosPut);

    render(
      <TestQueryClientProvider>
        <GiftEdit id={13} />
      </TestQueryClientProvider>
    );

    fireEvent.click(screen.getByText('save'));

    await waitFor(() => {
      expect(mockedAxiosPut).toHaveBeenCalledWith('/gifts', {
        categoryId: 1,
        deleted: false,
        giftedUserId: 1,
        id: 13,
        name: 'test gift name',
        price: '15.23',
        reserved: false,
        url: 'http://test-gift.name',
      });
    });
  });

  test('should show toast when gift successfully edited', async () => {
    const mockedToast = jest.fn();
    jest.spyOn(toast, 'success').mockImplementation(mockedToast);

    render(
      <TestQueryClientProvider>
        <GiftEdit id={13} />
      </TestQueryClientProvider>
    );

    fireEvent.click(screen.getByText('save'));

    await waitFor(() => {
      expect(mockedToast).toHaveBeenCalledWith('giftSuccessfullyEdited');
    });
  });
});
