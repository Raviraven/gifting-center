import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { TestQueryClientProvider } from '../../tests/TestQueryClientProvider';

import { axiosInstance } from '../../api/axios';

import { GiftedUserAdd } from './GiftedUserAdd';

describe('GiftedUserAdd tests', () => {
  test('should show validation messages', async () => {
    render(
      <TestQueryClientProvider>
        <GiftedUserAdd />
      </TestQueryClientProvider>
    );

    fireEvent.click(screen.getByText('add'));

    await waitFor(() => {
      expect(
        screen.getByText('validationNameFieldRequired')
      ).toBeInTheDocument();
    });
  });

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
});
