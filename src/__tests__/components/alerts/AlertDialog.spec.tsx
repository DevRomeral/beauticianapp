import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { AlertProvider, useAlert } from '@/contexts/AlertContext';
import { act, fireEvent, renderHook, screen, waitFor } from '@testing-library/react';

import AlertDialog, { AlertConfig } from '@/components/alerts/AlertDialog';

describe('AlertDialog', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const { result } = renderHook(() => useAlert(), {
      wrapper: ({ children }) => (
        <LanguageWrapper>
          <AlertProvider>
            <AlertDialog />
            {children}
          </AlertProvider>
        </LanguageWrapper>
      ),
    });

    const title = 'title';
    const message = 'message';
    const onConfirm = jest.fn();

    act(() => {
      result.current.showConfirm({ title, message, onConfirm });
    });

    await waitFor(() => {
      expect(screen.getByTestId(AlertConfig.alertId)).toBeInTheDocument();
    });

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    const confirmButton = screen.getByTestId(AlertConfig.btnConfirmId) as HTMLButtonElement;

    expect(confirmButton).toBeInTheDocument();

    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
