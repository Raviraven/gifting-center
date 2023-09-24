import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { toast } from 'react-toastify';

import { TestQueryClientProvider } from 'tests/TestQueryClientProvider';

import { axiosInstance } from 'api/axios';
import { GiftedUser } from 'api/models';

import { GiftedUserEdit } from './GiftedUserEdit';

const defaultGiftedUser: GiftedUser = {
  id: 5,
  name: 'test name',
};

describe('GiftedUserEdit tests', () => {
  beforeEach(() => {
    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === 'giftedusers/5') {
        return Promise.resolve({ data: defaultGiftedUser });
      }

      return Promise.resolve({ data: {} });
    });
  });

  test('should show loading', async () => {
    render(
      <TestQueryClientProvider>
        <GiftedUserEdit id={5} onSubmitClick={() => {}} />
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  test('should call edit gifted user endpoint when button clicked', async () => {
    const mockedAxiosPut = jest
      .fn()
      .mockReturnValue(
        Promise.resolve({ data: { id: 5, name: 'test name edited' } })
      );
    jest.spyOn(axiosInstance, 'put').mockImplementation(mockedAxiosPut);

    render(
      <TestQueryClientProvider>
        <GiftedUserEdit id={5} onSubmitClick={() => {}} />
      </TestQueryClientProvider>
    );

    await userEvent.type(
      await screen.findByLabelText('giftedUserName'),
      ' edited'
    );
    fireEvent.click(screen.getByText('save'));

    await waitFor(() => {
      expect(mockedAxiosPut).toHaveBeenCalledWith('giftedusers/5', {
        id: 5,
        name: 'test name edited',
      });
    });
  });

  test('should fire additional handle submit method passed when submit clicked', async () => {
    const onSubmitMock = jest.fn();
    jest
      .spyOn(axiosInstance, 'put')
      .mockReturnValue(Promise.resolve({ data: defaultGiftedUser }));

    render(
      <TestQueryClientProvider>
        <GiftedUserEdit id={5} onSubmitClick={onSubmitMock} />
      </TestQueryClientProvider>
    );

    fireEvent.click(screen.getByText('save'));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  test('should show bad data received', async () => {
    jest
      .spyOn(axiosInstance, 'get')
      .mockReturnValue(Promise.resolve({ data: null }));

    render(
      <TestQueryClientProvider>
        <GiftedUserEdit id={5} onSubmitClick={() => {}} />
      </TestQueryClientProvider>
    );

    expect(
      await screen.findByText('wrongDataReceivedFromServer')
    ).toBeInTheDocument();
  });

  test('should show toast when successfully edited', async () => {
    const mockedToast = jest.fn();
    jest.spyOn(toast, 'success').mockImplementation(mockedToast);
    const mockedAxiosPut = jest
      .fn()
      .mockReturnValue(
        Promise.resolve({ data: { id: 5, name: 'test name edited' } })
      );
    jest.spyOn(axiosInstance, 'put').mockImplementation(mockedAxiosPut);

    render(
      <TestQueryClientProvider>
        <GiftedUserEdit id={5} onSubmitClick={() => {}} />
      </TestQueryClientProvider>
    );

    await userEvent.type(
      await screen.findByLabelText('giftedUserName'),
      ' edited'
    );
    fireEvent.click(screen.getByText('save'));

    await waitFor(() => {
      expect(mockedToast).toHaveBeenCalledWith('giftedUserSuccessfullyEdited');
    });
  });
});
