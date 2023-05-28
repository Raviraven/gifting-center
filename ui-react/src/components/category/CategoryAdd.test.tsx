import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { toast } from 'react-toastify';

import { TestQueryClientProvider } from '../../tests/TestQueryClientProvider';

import { axiosInstance } from '../../api/axios';

import { CategoryAdd } from './CategoryAdd';

describe('CategoryAdd tests', () => {
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

  test('should reset form data and show toast message after submitting the form', async () => {
    const mockedToast = jest.fn();
    jest.spyOn(toast, 'success').mockImplementation(mockedToast);

    render(
      <TestQueryClientProvider>
        <CategoryAdd />
      </TestQueryClientProvider>
    );

    const categoryNameInput = screen.getByLabelText('categoryName');

    await userEvent.type(categoryNameInput, 'test');
    fireEvent.click(screen.getByText('add'));

    await waitFor(() => {
      expect(categoryNameInput.getAttribute('value')).toBe('');
      expect(mockedToast).toHaveBeenCalledWith('categorySuccessfullyAdded');
    });
  });
});
