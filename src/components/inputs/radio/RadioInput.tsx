'use client';

import { ILoadingProps } from '../../display/LoadingPlaceholder';
import RadioInputOption, { IRadioOption } from './RadioInputOption';

export interface RadioInputProps extends ILoadingProps {
  name: string;
  // defaultValue?: string;
  allDisabled?: boolean;
  options: IRadioOption[];
  onChange: (latestValue: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({ name, options, onChange, allDisabled = false, isLoading = false }) => {
  // const [currentValue, setCurrentValue] = useState<string>()

  const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex w-full flex-col">
      {options.map((option) => (
        <RadioInputOption
          key={option.id}
          id={option.id}
          value={option.value}
          label={option.label}
          name={name}
          disabled={allDisabled || option.disabled}
          onChange={onChangeRadio}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default RadioInput;
