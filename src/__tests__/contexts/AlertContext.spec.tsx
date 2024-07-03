import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { AlertProvider, useAlert } from '@/contexts/AlertContext';
import { act, render, renderHook } from '@testing-library/react';

import AlertDialog from '@/components/alerts/AlertDialog';

describe('AlertContext', () => {
  it('should provide alerts info', async () => {
    render(
      <LanguageWrapper>
        <AlertProvider>
          <AlertDialog />
        </AlertProvider>
      </LanguageWrapper>,
    );

    // Renderiza el hook dentro de un proveedor de contexto con el estado inicial mockeado
    const { result } = renderHook(() => useAlert(), {
      wrapper: ({ children }) => <AlertProvider>{children}</AlertProvider>,
    });

    const title = 'title';
    const message = 'message';

    act(() => {
      result.current.showAlert({ title, message });
    });

    expect(result.current.visible).toBe(true);
    expect(result.current.type).toBe('alert');
    expect(result.current.title).toBe(title);
    expect(result.current.message).toBe(message);

    const onConfirm = jest.fn();
    act(() => {
      result.current.showConfirm({ title, message, onConfirm });
    });

    expect(result.current.visible).toBe(true);
    expect(result.current.type).toBe('confirm');
    expect(result.current.title).toBe(title);
    expect(result.current.message).toBe(message);
    expect(result.current.onConfirm).toBe(onConfirm);

    act(() => {
      result.current.hide();
    });

    expect(result.current.visible).toBe(false);
  });
});
