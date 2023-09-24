import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { TestQueryClientProvider } from 'tests/TestQueryClientProvider';

import { Category } from 'api/models';

import { CategoryForm } from './CategoryForm';

const defaultCategory: Category = {
  id: 0,
  name: '',
};

describe('CategoryForm tests', () => {
  test('should show category name input', async () => {
    render(
      <TestQueryClientProvider>
        <CategoryForm
          lKeySubmitButton=""
          category={defaultCategory}
          handleSubmit={() => {}}
        />
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('categoryName')).toBeInTheDocument();
    });
  });

  test('should show validation message when no name provided', async () => {
    render(
      <TestQueryClientProvider>
        <CategoryForm
          lKeySubmitButton="submitBtn"
          category={defaultCategory}
          handleSubmit={() => {}}
        />
      </TestQueryClientProvider>
    );

    await userEvent.clear(await screen.findByLabelText('categoryName'));
    fireEvent.click(await screen.findByText('submitBtn'));

    expect(
      await screen.findByText('validationNameFieldRequired')
    ).toBeInTheDocument();
  });
});
