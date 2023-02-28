import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GiftsList } from './GiftsList';

describe('GiftsList tests', () => {
  beforeEach(() => {
    // jest.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
    //   return Promise.resolve({ data: {} });
    // });
  });

  test('should show loading while fetching data from api', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <GiftsList userId={-1} />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
