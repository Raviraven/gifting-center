import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { TestQueryClientProvider } from '../../tests/TestQueryClientProvider';

import { axiosInstance } from '../../api/axios';
import { Category } from '../../api/models/categories';
import { GiftedUser } from '../../api/models/gifted-user';

import { GiftAdd } from './GiftAdd';

const defaultCategory: Category = {
  id: 1,
  name: 'default category',
};

const defaultGiftedUser: GiftedUser = {
  id: 1,
  name: 'default gifted user',
};

describe('GiftAdd tests', () => {
  test('should call api endpoint when submiting form with valid data', async () => {
    const mockedAxiosPost = jest.fn();
    jest.spyOn(axiosInstance, 'post').mockImplementation(mockedAxiosPost);

    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === '/categories') {
        return Promise.resolve({
          data: [defaultCategory, { id: -234, name: 'another category' }],
        });
      } else if (url === 'giftedusers') {
        return Promise.resolve({
          data: [defaultGiftedUser, { id: 212, name: 'secondary user' }],
          status: 200,
        });
      }
      return Promise.resolve({ data: {} });
    });

    render(
      <TestQueryClientProvider>
        <GiftAdd />
      </TestQueryClientProvider>
    );

    await userEvent.type(await screen.findByLabelText('giftName'), 'test gift');
    await userEvent.clear(await screen.findByLabelText('giftPrice'));
    await userEvent.type(await screen.findByLabelText('giftPrice'), '120');
    await userEvent.type(
      await screen.findByLabelText('giftUrl'),
      'http://test.test'
    );

    await userEvent.click(await screen.findByLabelText('category'));
    await userEvent.click(await screen.findByText('another category'));

    await userEvent.click(await screen.findByLabelText('giftedUser'));
    await userEvent.click(screen.getByText('secondary user'));

    await userEvent.click(await screen.findByText('add'));

    await waitFor(() => {
      expect(mockedAxiosPost).toHaveBeenCalledWith('gifts', {
        categoryId: -234,
        deleted: false,
        giftedUserId: 212,
        id: 0,
        name: 'test gift',
        price: '120',
        reserved: false,
        url: 'http://test.test',
      });
    });
  });
});
