'use client';

import { getDateValueAsString } from '@/utils/format/DateFormat';
import { useEffect, useState } from 'react';

import LoadingPlaceholder, { ILoadingProps } from '../display/LoadingPlaceholder';
import Label from './Label';

export interface DateFieldProps extends ILoadingProps {
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
}

const DateField: React.FC<DateFieldProps> = ({
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
}) => {
  const [_value, _setValue] = useState<Date>(new Date(Date.now()));

  useEffect(() => {
    if (value != null) {
      _setValue(value);
    }
  }, [value]);

  const _onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.stopPropagation();
    const newValue = event.target.value;
    // console.log('New Value: ' + newValue);
    _setValue(new Date(newValue));

    if (onChangeHandler) onChangeHandler(event);
  };

  const _onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    // _setValue(event.target.value);

    if (onBlurHandler) onBlurHandler(event);
  };

  // TODO: en el futuro ponerlo como un hook con "_value", pero no sé por qué en los tests está fallando
  // no se está lanzando el evento onchange de algunos inputs

  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <LoadingPlaceholder isLoading={isLoading} height="h-8">
        <input
          type="date"
          id={id}
          data-testid={id}
          name={name}
          placeholder={placeholder}
          value={getDateValueAsString(_value)}
          required={required}
          onBlur={_onBlurHandler}
          onChange={_onChangeHandler}
          min={getDateValueAsString(minDate)}
          max={getDateValueAsString(maxDate)}
        />
      </LoadingPlaceholder>
    </div>
  );
};

export default DateField;
