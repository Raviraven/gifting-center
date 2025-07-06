import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('../../api/hooks', () => ({
  useGiftedUsers: jest.fn(),
}));

jest.mock('./UserGifts', () => ({
  UserGifts: ({ userId }: { userId: number }) => (
    <div data-testid={`user-gifts-${userId}`}>Gifts for user {userId}</div>
  ),
}));

import { useGiftedUsers } from '../../api/hooks';

import { UserGiftsContainer } from './UserGiftsContainer';

describe('UserGiftsContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing when there are no visibleGiftedUsers', () => {
    (useGiftedUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });
    render(<UserGiftsContainer />);
    // No tabs or gifts should be rendered
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
    expect(screen.queryByTestId(/user-gifts-/)).not.toBeInTheDocument();
  });

  test('renders one visible gifted user and their gifts', () => {
    (useGiftedUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [
        { id: 1, name: 'Alice', visibleOnIndexPage: true },
        { id: 2, name: 'Bob', visibleOnIndexPage: false },
      ],
    });
    render(<UserGiftsContainer />);
    // Only Alice's tab should be present
    expect(screen.getByRole('tab', { name: 'Alice' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Bob' })).not.toBeInTheDocument();
    // Alice's gifts should be shown
    expect(screen.getByTestId('user-gifts-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-gifts-1')).toHaveTextContent(
      'Gifts for user 1'
    );
  });

  test('renders multiple visible gifted users and switches gifts on tab change', () => {
    (useGiftedUsers as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [
        { id: 1, name: 'Alice', visibleOnIndexPage: true },
        { id: 2, name: 'Bob', visibleOnIndexPage: true },
      ],
    });
    render(<UserGiftsContainer />);
    // Both tabs should be present
    expect(screen.getByRole('tab', { name: 'Alice' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Bob' })).toBeInTheDocument();
    // Alice's gifts should be shown by default
    expect(screen.getByTestId('user-gifts-1')).toBeInTheDocument();
    expect(screen.queryByTestId('user-gifts-2')).not.toBeInTheDocument();
    // Switch to Bob's tab
    fireEvent.click(screen.getByRole('tab', { name: 'Bob' }));
    // Now Bob's gifts should be shown
    expect(screen.getByTestId('user-gifts-2')).toBeInTheDocument();
    expect(screen.queryByTestId('user-gifts-1')).not.toBeInTheDocument();
  });
});
