import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { TestQueryClientProvider } from '../../tests/TestQueryClientProvider';

import { axiosInstance } from '../../api/axios';

import { CategoryAdd } from './CategoryAdd';

describe('CategoryAdd tests', () => {
  test('should show category name input', () => {
    render(
      <TestQueryClientProvider>
        <CategoryAdd />
      </TestQueryClientProvider>
    );

    expect(screen.getByLabelText('categoryName')).toBeInTheDocument();
  });

  test('should call add category endpoint when button clicked', async () => {
    const mockedAxiosPost = jest.fn();
    jest.spyOn(axiosInstance, 'post').mockImplementation(mockedAxiosPost);

    render(
      <TestQueryClientProvider>
        <CategoryAdd />
      </TestQueryClientProvider>
    );

    await userEvent.type(screen.getByLabelText('categoryName'), 'test');
    fireEvent.click(screen.getByText('add'));

    await waitFor(() => {
      expect(mockedAxiosPost).toHaveBeenCalledWith('/categories', {
        id: 0,
        name: 'test',
      });
    });
  });

  test('should show validation message when no name provided', async () => {
    render(
      <TestQueryClientProvider>
        <CategoryAdd />
      </TestQueryClientProvider>
    );

    fireEvent.click(screen.getByText('add'));

    expect(
      await screen.findByText('validationNameFieldRequired')
    ).toBeInTheDocument();
  });
});
