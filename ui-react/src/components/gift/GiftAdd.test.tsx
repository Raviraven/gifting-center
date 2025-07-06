import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { toast } from 'react-toastify';

import { TestQueryClientProvider } from 'tests/TestQueryClientProvider';

import { axiosInstance } from 'api/axios';
import { Category, GiftedUser } from 'api/models';

import { GiftAdd } from './GiftAdd';

const defaultCategory: Category = {
  id: 1,
  name: 'default category',
};

const defaultGiftedUser: GiftedUser = {
  id: 1,
  name: 'default gifted user',
  visibleOnIndexPage: false,
};

describe('GiftAdd tests', () => {
  beforeEach(() => {
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
  });

  test('should call api endpoint when submiting form with valid data', async () => {
    const mockedAxiosPost = jest.fn();
    jest.spyOn(axiosInstance, 'post').mockImplementation(mockedAxiosPost);

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

  test('should show toast success message when gift added', async () => {
    const toastSuccess = jest.fn();
    jest.spyOn(toast, 'success').mockImplementation(toastSuccess);

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

    expect(toastSuccess).toHaveBeenCalledWith('giftSuccessfullyAdded');
  });

  test('should reset form data after submitting the form', async () => {
    render(
      <TestQueryClientProvider>
        <GiftAdd />
      </TestQueryClientProvider>
    );

    // form controls
    const giftNameInput = await screen.findByLabelText('giftName');
    const giftPriceInput = await screen.findByLabelText('giftPrice');
    const giftUrlInput = await screen.findByLabelText('giftUrl');
    const categoryLabel = await screen.findByLabelText('category');
    const giftedUserLabel = await screen.findByLabelText('giftedUser');

    await userEvent.type(giftNameInput, 'test gift');
    await userEvent.clear(giftPriceInput);
    await userEvent.type(giftPriceInput, '120');
    await userEvent.type(giftUrlInput, 'http://test.test');

    await userEvent.click(categoryLabel);
    await userEvent.click(await screen.findByText('another category'));

    await userEvent.click(giftedUserLabel);
    await userEvent.click(screen.getByText('secondary user'));

    await userEvent.click(await screen.findByText('add'));

    expect(giftNameInput.getAttribute('value')).toBe('');
    expect(giftPriceInput.getAttribute('value')).toBe('0');
    expect(giftUrlInput.getAttribute('value')).toBe('');
    expect(categoryLabel).toBeInTheDocument();
    expect(giftedUserLabel).toBeInTheDocument();
  });
});
