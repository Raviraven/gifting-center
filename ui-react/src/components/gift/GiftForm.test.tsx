import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import { axiosInstance } from 'api/axios';
import { Category, GiftedUser } from 'api/models';
import { TestQueryClientProvider } from 'tests/TestQueryClientProvider';

import { GiftForm } from './GiftForm';

const defaultCategory: Category = {
  id: 1,
  name: 'default category',
};

const defaultGiftedUser: GiftedUser = {
  id: 1,
  name: 'default gifted user',
};

describe('GiftForm tests', () => {
  beforeEach(() => {
    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === '/categories') {
        return Promise.resolve({ data: [defaultCategory] });
      } else if (url === 'giftedusers') {
        return Promise.resolve({ data: [defaultGiftedUser], status: 200 });
      }
      return Promise.resolve({ data: {} });
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should show loading', async () => {
    render(
      <TestQueryClientProvider>
        <GiftForm handleSubmit={() => {}} />
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  test('should show error message when fetching data failed', async () => {
    jest
      .spyOn(console, 'error')
      .mockImplementation(
        (error: { data: { message: string }; status: number } | string) => {
          if (
            (error as { data: { message: string }; status: number })?.status ===
            403
          ) {
            return;
          }

          // eslint-disable-next-line no-console
          console.error(error);
          return;
        }
      );

    jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
      if (url === '/categories') {
        return Promise.reject({
          data: { message: 'categories not found' },
          status: 403,
        });
      } else if (url === 'giftedusers') {
        return Promise.reject({
          data: { message: 'gifted users not found' },
          status: 403,
        });
      }

      return Promise.reject({ data: {} });
    });

    render(
      <TestQueryClientProvider>
        <GiftForm handleSubmit={() => {}} />
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('cannotFetchCategories')).toBeInTheDocument();
      expect(screen.getByText('cannotFetchGiftedUsers')).toBeInTheDocument();
    });
  });

  test('should show expected form fields', async () => {
    render(
      <TestQueryClientProvider>
        <GiftForm handleSubmit={() => {}} />
      </TestQueryClientProvider>
    );

    expect(await screen.findByLabelText('giftName')).toBeInTheDocument();
    expect(await screen.findByLabelText('giftPrice')).toBeInTheDocument();
    expect(await screen.findByLabelText('giftUrl')).toBeInTheDocument();
    expect(await screen.findByLabelText('category')).toBeInTheDocument();
    expect(await screen.findByLabelText('giftedUser')).toBeInTheDocument();
  });

  test('should show validation messages when clicked add button', async () => {
    render(
      <TestQueryClientProvider>
        <GiftForm handleSubmit={() => {}} />
      </TestQueryClientProvider>
    );

    fireEvent.click(await screen.findByText('add'));

    expect(
      await screen.findByText('validationNameFieldRequired')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('validationPriceMustBeHigherThanZero')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('validationUrlFieldRequired')
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        'validationCategoryIdFieldMustMatchOneOfCategoriesId'
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        'validationGiftedUserIdFieldMustMatchOneOfGiftedUsersId'
      )
    ).toBeInTheDocument();
  });
});
