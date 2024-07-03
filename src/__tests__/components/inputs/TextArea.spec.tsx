import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import TextArea from '@/components/inputs/TextArea';

describe('TextArea', () => {
  const id = 'idMyTextField';
  const label = 'Label';

  it('renders correctly', () => {
    render(<TextArea id={id} label={label} />);

    expect(screen.getByTestId(id)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('executes onchange function', async () => {
    const callback = jest.fn();

    render(<TextArea id={id} label={label} onChangeHandler={callback} />);

    const textfield = screen.getByTestId(id);

    expect(textfield).toBeInTheDocument();

    fireEvent.change(textfield, { target: { value: 'value' } });

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it('executes onblur function', async () => {
    const callback = jest.fn();

    render(<TextArea id={id} label={label} onBlurHandler={callback} />);

    const textfield = screen.getByTestId(id);

    expect(textfield).toBeInTheDocument();

    fireEvent.focus(textfield);
    fireEvent.focusOut(textfield);

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
