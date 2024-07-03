'use client';

import { useEffect, useState } from 'react';

import LoadingPlaceholder, { ILoadingProps } from '../display/LoadingPlaceholder';
import Label from './Label';

export interface ISelectOption {
  value: string;
  content: string;
}

export interface SelectProps extends ILoadingProps {
  id: string;
  name?: string;
  value?: string;
  label: string;
  required?: boolean;
  options: ISelectOption[];
  onBlurHandler?: (event: React.FocusEvent<HTMLSelectElement>) => void | Promise<void>;
  onChangeHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void | Promise<void>;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  name = id,
  value = null,
  required = false,
  isLoading = false,
  options = [],
  onBlurHandler,
  onChangeHandler,
}) => {
  const [_value, _setValue] = useState('');

  useEffect(() => {
    if (value != null) {
      _setValue(value);
    }
  }, [value]);

  const _onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.stopPropagation();
    const newValue = event.target.value;
    _setValue(newValue);

    if (onChangeHandler) onChangeHandler(event);
  };

  const _onBlurHandler = (event: React.FocusEvent<HTMLSelectElement>) => {
    // _setValue(event.target.value);

    if (onBlurHandler) onBlurHandler(event);
  };

  // TODO: en el futuro ponerlo como un hook con "_value", pero no sé por qué en los tests está fallando
  // no se está lanzando el evento onchange de algunos inputs

  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <LoadingPlaceholder isLoading={isLoading} height="h-8">
        <select
          id={id}
          data-testid={id}
          name={name}
          value={_value}
          required={required}
          onBlur={_onBlurHandler}
          onChange={_onChangeHandler}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.content}
            </option>
          ))}
        </select>
      </LoadingPlaceholder>
    </div>
  );
};

export default Select;
