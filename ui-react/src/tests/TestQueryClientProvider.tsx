import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const defaultQueryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     retry: false,
  //   },
  // },
});

export const TestQueryClientProvider = ({
  children,
  queryClient = defaultQueryClient,
}: {
  children: ReactNode;
  queryClient?: QueryClient;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
