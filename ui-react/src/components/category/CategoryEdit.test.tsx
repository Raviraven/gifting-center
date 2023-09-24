import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { toast } from 'react-toastify';

import { TestQueryClientProvider } from 'tests/TestQueryClientProvider';

import { axiosInstance } from 'api/axios';

import { Category } from 'api/models';

import { CategoryEdit } from './CategoryEdit';

const defaultCategory: Category = {
  id: 13,
  name: 'test category',
};

describe('CategoryEdit tests', () => {
  beforeEach(() => {
    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === '/categories/13') {
        return Promise.resolve({ data: defaultCategory });
      }

      return Promise.resolve({ data: {} });
    });
  });

  test('should show loading', async () => {
    render(
      <TestQueryClientProvider>
        <CategoryEdit id={13} />
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  test('should call edit category endpoint when button clicked', async () => {
    const mockedAxiosPut = jest.fn();
    jest.spyOn(axiosInstance, 'put').mockImplementation(mockedAxiosPut);

    render(
      <TestQueryClientProvider>
        <CategoryEdit id={13} />
      </TestQueryClientProvider>
    );

    await userEvent.type(
      await screen.findByLabelText('categoryName'),
      ' edited'
    );
    fireEvent.click(screen.getByText('save'));

    await waitFor(() => {
      expect(mockedAxiosPut).toHaveBeenCalledWith('/categories', {
        id: 13,
        name: 'test category edited',
      });
    });
  });

  test('should fire additional handle submit method passed when submit clicked', async () => {
    const onSubmitMock = jest.fn();

    render(
      <TestQueryClientProvider>
        <CategoryEdit id={13} onSubmitClick={onSubmitMock} />
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
        <CategoryEdit id={13} />
      </TestQueryClientProvider>
    );

    expect(
      await screen.findByText('wrongDataReceivedFromServer')
    ).toBeInTheDocument();
  });

  test('should show toast message on successfull edit', async () => {
    const mockedToast = jest.fn();
    jest.spyOn(toast, 'success').mockImplementation(mockedToast);

    render(
      <TestQueryClientProvider>
        <CategoryEdit id={13} />
      </TestQueryClientProvider>
    );

    await userEvent.type(
      await screen.findByLabelText('categoryName'),
      ' edited'
    );
    fireEvent.click(screen.getByText('save'));

    await waitFor(() => {
      expect(mockedToast).toHaveBeenCalledWith('categorySuccessfullyEdited');
    });
  });
});
