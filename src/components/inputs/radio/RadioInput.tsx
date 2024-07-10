'use client';

import { useEffect, useState } from 'react';

import { ILoadingProps } from '../../display/LoadingPlaceholder';
import RadioInputOption, { IRadioOption } from './RadioInputOption';

export interface RadioInputProps extends ILoadingProps {
  name: string;
  defaultValue?: string;
  allDisabled?: boolean;
  options: IRadioOption[];
  onChange: (latestValue: string) => void;
}

// TODO: hacer tests de este input
const RadioInput: React.FC<RadioInputProps> = ({
  name,
  options,
  onChange,
  allDisabled = false,
  isLoading = false,
  defaultValue = null,
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue != null) setCurrentValue(defaultValue);
  }, [defaultValue]);

  const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setCurrentValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex w-full flex-col">
      {options.map((option) => (
        <RadioInputOption
          key={option.id}
          id={option.id}
          value={option.value}
          label={option.label}
          currentValue={currentValue}
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
