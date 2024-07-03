import { getDateValueAsString } from '@/utils/format/DateFormat';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DateField from '@/components/inputs/DateField';

describe('DateField', () => {
  const id = 'dateFeildId';
  const label = 'label';

  it('renders correctly', () => {
    const initialValue = new Date(2024, 6, 3);
    const expectedInitialValue = getDateValueAsString(initialValue);
    render(<DateField id={id} label={label} value={initialValue} />);

    const input = screen.getByTestId(id) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(input.value).toBe(expectedInitialValue);
  });

  it('executes callbacks functions', async () => {
    const onChangeHandler = jest.fn();
    const onBlurHandler = jest.fn();

    render(<DateField id={id} label={label} onBlurHandler={onBlurHandler} onChangeHandler={onChangeHandler} />);

    const input = screen.getByTestId(id) as HTMLInputElement;
    expect(input).toBeInTheDocument();

    const newDate = new Date(2020, 2, 8);
    const newDateString = getDateValueAsString(newDate);
    fireEvent.change(input, { target: { value: newDateString } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(onBlurHandler).toHaveBeenCalledTimes(1);
    });

    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(input.value).toBe(newDateString);
  });
});
