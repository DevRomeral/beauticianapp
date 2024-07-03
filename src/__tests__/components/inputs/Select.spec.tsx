import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Select, { ISelectOption } from '@/components/inputs/Select';

describe('Select', () => {
  const id = 'selectId';
  const label = 'label';
  const option1: ISelectOption = { value: '1', content: 'first' };
  const option2: ISelectOption = { value: '2', content: 'second' };
  const options: ISelectOption[] = [option1, option2];

  it('renders correctly', () => {
    render(<Select id={id} label={label} options={options} value={option1.value} />);

    const select = screen.getByTestId(id) as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();

    expect(select.value).toBe(option1.value);
  });

  it('executes callbacks functions', async () => {
    const onChangeHandler = jest.fn();
    const onBlurHandler = jest.fn();

    render(
      <Select
        id={id}
        label={label}
        options={options}
        onChangeHandler={onChangeHandler}
        onBlurHandler={onBlurHandler}
      />,
    );

    const select = screen.getByTestId(id) as HTMLSelectElement;
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: option2.value } });

    await waitFor(() => {
      expect(onChangeHandler).toHaveBeenCalledTimes(1);
    });
    expect(select.value).toBe(option2.value);

    fireEvent.blur(select);

    await waitFor(() => {
      expect(onBlurHandler).toHaveBeenCalledTimes(1);
    });
  });
});
