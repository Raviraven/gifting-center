import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { axiosInstance } from '../../api/axios';

import { GiftList } from '../../api/models/gift';
import { TestQueryClientProvider } from '../../tests/TestQueryClientProvider';

import { SingleGift } from './SingleGift';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter>
      <TestQueryClientProvider>{children}</TestQueryClientProvider>
    </MemoryRouter>
  );
};

const defaultGift: GiftList = {
  id: -3,
  name: 'test gift name',
  price: -342.1,
  url: 'http://test-gift.com',
  reserved: false,
  deleted: false,
  categoryId: 0,
  giftedUserId: 0,
};

describe('SingleGift tests', () => {
  test('should show name, price and url', () => {
    render(
      <Wrapper>
        <SingleGift gift={defaultGift} />
      </Wrapper>
    );

    expect(screen.getByText('test gift name')).toBeInTheDocument();
    expect(screen.getByText('linkToTheGift')).toBeInTheDocument();
    expect(screen.getByText('-342.10 zł')).toBeInTheDocument();
  });

  test('should show reserve button', () => {
    render(
      <Wrapper>
        <SingleGift gift={defaultGift} />
      </Wrapper>
    );

    expect(screen.getByText('reserve')).toBeInTheDocument();
  });

  test('should show reserved when gift already reserved', () => {
    render(
      <Wrapper>
        <SingleGift gift={{ ...defaultGift, reserved: true }} />
      </Wrapper>
    );

    expect(screen.getByText('reserved')).toBeInTheDocument();
  });

  test('should call put endpoint when clicked on reserve button', async () => {
    const axiosMocked = jest.fn();
    jest.spyOn(axiosInstance, 'put').mockImplementation(axiosMocked);

    render(
      <Wrapper>
        <SingleGift gift={defaultGift} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('reserve'));

    await waitFor(() => {
      expect(axiosMocked).toHaveBeenCalledWith('/gifts', {
        categoryId: 0,
        deleted: false,
        giftedUserId: 0,
        id: -3,
        name: 'test gift name',
        price: -342.1,
        reserved: true,
        url: 'http://test-gift.com',
      });
    });
  });

  // admin actions
  test('should show edit and delete buttons', () => {
    render(
      <Wrapper>
        <SingleGift gift={defaultGift} adminActions={true} />
      </Wrapper>
    );

    expect(screen.getByText('delete')).toBeInTheDocument();
    expect(screen.getByText('edit')).toBeInTheDocument();
  });

  test('should call endpoint when delete button clicked', async () => {
    const mockedAxios = jest.fn();
    jest.spyOn(axiosInstance, 'delete').mockImplementation(mockedAxios);

    render(
      <Wrapper>
        <SingleGift gift={defaultGift} adminActions={true} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('delete'));
    await waitFor(() => {
      expect(mockedAxios).toHaveBeenCalledWith('/gifts/-3');
    });
  });

  test('should redirect to edit gift when clicked on edit button', () => {
    const editGiftMock = jest.fn();
    render(
      <Wrapper>
        <SingleGift
          gift={defaultGift}
          adminActions={true}
          editGift={editGiftMock}
        />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('edit'));

    expect(editGiftMock).toHaveBeenCalled();
  });
});
