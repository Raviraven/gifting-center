import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { toast } from 'react-toastify';

import { TestQueryClientProvider } from 'tests/TestQueryClientProvider';

import { axiosInstance } from 'api/axios';

import { GiftedUserAdd } from './GiftedUserAdd';

describe('GiftedUserAdd tests', () => {
  test('should call api ednpoint when add button clicked', async () => {
    const mockedAxiosPost = jest.fn();
    jest.spyOn(axiosInstance, 'post').mockImplementation(mockedAxiosPost);

    render(
      <TestQueryClientProvider>
        <GiftedUserAdd />
      </TestQueryClientProvider>
    );

    await userEvent.type(
      screen.getByLabelText('giftedUserName'),
      'test gifted user name'
    );

    fireEvent.click(screen.getByText('add'));

    await waitFor(() => {
      expect(mockedAxiosPost).toHaveBeenCalledWith('giftedusers', {
        name: 'test gifted user name',
      });
    });
  });

  test('should show toast message and reset form after successfull form submit', async () => {
    const mockedToast = jest.fn();
    jest.spyOn(toast, 'success').mockImplementation(mockedToast);

    render(
      <TestQueryClientProvider>
        <GiftedUserAdd />
      </TestQueryClientProvider>
    );

    const giftedUserNameInput = screen.getByLabelText('giftedUserName');

    await userEvent.type(giftedUserNameInput, 'test gifted user name');

    fireEvent.click(screen.getByText('add'));

    await waitFor(() => {
      expect(giftedUserNameInput.getAttribute('value')).toBe('');
      expect(mockedToast).toHaveBeenLastCalledWith(
        'giftedUserSuccessfullyAdded'
      );
    });
  });
});
