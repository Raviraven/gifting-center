import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import * as router from 'react-router';

import { TestQueryClientProvider } from 'tests/TestQueryClientProvider';

import { axiosInstance } from 'api/axios';

import { Category } from 'api/models';

import { CategoriesList } from './CategoriesList';

const firstCategory: Category = {
  id: 1,
  name: 'test category',
};

const secondCategory: Category = {
  id: 2,
  name: 'another category',
};

let defaultCategories: Category[] = [firstCategory, secondCategory];

describe('CategoriesList tests', () => {
  beforeEach(() => {
    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === '/categories') {
        return Promise.resolve({ data: defaultCategories });
      }
      return Promise.resolve({ data: {} });
    });
  });

  test('should show loading while fetching categories', async () => {
    render(
      <TestQueryClientProvider>
        <MemoryRouter>
          <CategoriesList />
        </MemoryRouter>
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  test('should show no categories info when no categories in db', async () => {
    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === '/categories') {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({ data: {} });
    });

    render(
      <TestQueryClientProvider>
        <MemoryRouter>
          <CategoriesList />
        </MemoryRouter>
      </TestQueryClientProvider>
    );

    expect(await screen.findByText('noCategories')).toBeInTheDocument();
  });

  test('should list categories from db', async () => {
    render(
      <TestQueryClientProvider>
        <MemoryRouter>
          <CategoriesList />
        </MemoryRouter>
      </TestQueryClientProvider>
    );

    expect(await screen.findByText('test category')).toBeInTheDocument();
    expect(await screen.findByText('another category')).toBeInTheDocument();
  });

  test('should navigate to category edit page when clicked on edit', async () => {
    defaultCategories = [firstCategory];
    const mockedNavigate = jest.fn();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigate);

    render(
      <TestQueryClientProvider>
        <MemoryRouter>
          <CategoriesList />
        </MemoryRouter>
      </TestQueryClientProvider>
    );

    fireEvent.click(await screen.findByText('edit'));

    expect(mockedNavigate).toHaveBeenCalledWith('category-edit/1');
  });
});
