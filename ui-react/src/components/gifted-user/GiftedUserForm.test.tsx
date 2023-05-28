import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { TestQueryClientProvider } from '../../tests/TestQueryClientProvider';

import { GiftedUserForm } from './GiftedUserForm';

describe('GiftedUserForm tests', () => {
  test('should show gifted user name input', async () => {
    render(
      <TestQueryClientProvider>
        <GiftedUserForm handleSubmit={() => {}} submitButtonLKey="submitBtn" />
      </TestQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('giftedUserName')).toBeInTheDocument();
    });
  });

  test('should show validation messages', async () => {
    render(
      <TestQueryClientProvider>
        <GiftedUserForm handleSubmit={() => {}} submitButtonLKey="submitBtn" />
      </TestQueryClientProvider>
    );

    fireEvent.click(screen.getByText('submitBtn'));

    await waitFor(() => {
      expect(
        screen.getByText('validationNameFieldRequired')
      ).toBeInTheDocument();
    });
  });
});
