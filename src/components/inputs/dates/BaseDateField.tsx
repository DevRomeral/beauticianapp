'use client';

import { useEffect, useState } from 'react';

import LoadingPlaceholder, { ILoadingProps } from '../../display/LoadingPlaceholder';
import Label from '../Label';

export interface BaseDateFieldProps extends ILoadingProps {
  id: string;
  name?: string;
  value?: Date;
  label: string;
  placeholder?: string;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void | Promise<void>;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  type: 'date' | 'datetime-local';
  formatValue: (value: Date) => string;
}

const BaseDateField: React.FC<BaseDateFieldProps> = ({
  label,
  placeholder = '',
  id,
  name = id,
  value = null,
  required = false,
  isLoading = false,
  minDate = new Date(1900, 0, 1),
  maxDate = new Date(2100, 11, 31),
  onBlurHandler,
  onChangeHandler,
  type,
  formatValue,
}) => {
  const [_value, _setValue] = useState<Date>(new Date(Date.now()));

  useEffect(() => {
    if (value != null) {
      _setValue(value);
    }
  }, [value]);

  const _onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    _setValue(new Date(newValue));
    if (onChangeHandler) onChangeHandler(event);
  };

  const _onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlurHandler) onBlurHandler(event);
  };

  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <LoadingPlaceholder isLoading={isLoading} height="h-8">
        <input
          type={type}
          id={id}
          data-testid={id}
          name={name}
          placeholder={placeholder}
          value={formatValue(_value)}
          required={required}
          onBlur={_onBlurHandler}
          onChange={_onChangeHandler}
          min={formatValue(minDate)}
          max={formatValue(maxDate)}
        />
      </LoadingPlaceholder>
    </div>
  );
};

export default BaseDateField;
