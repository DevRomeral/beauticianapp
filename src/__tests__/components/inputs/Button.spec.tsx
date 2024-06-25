import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Button from '@/components/inputs/Button';

describe('Button', () => {
  it('renders button', () => {
    const id = 'idBtn';
    const text = 'My Button';

    render(<Button id={id} text={text} />);

    expect(screen.getByTestId(id)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('executes callback correctly', async () => {
    const callback = jest.fn();
    const id = 'idBtn';

    render(<Button id={id} text="My Button" onClick={callback} />);

    const button = screen.getByTestId(id);

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
