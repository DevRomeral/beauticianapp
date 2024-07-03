'use client';

import { useEffect, useState } from 'react';

import LoadingPlaceholder from '../display/LoadingPlaceholder';
import Label from './Label';
import { ITextInputProps } from './TextField';

export interface TextAreaProps extends ITextInputProps<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder = '',
  id,
  name = id,
  value = '',
  required = false,
  isLoading = false,
  onBlurHandler,
  onChangeHandler,
}) => {
  const [_value, _setValue] = useState(value);

  useEffect(() => {
    _setValue(value);
  }, [value]);

  const _onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
    const newValue = event.target.value;
    _setValue(newValue);

    if (onChangeHandler) onChangeHandler(event);
  };

  const _onBlurHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    // _setValue(event.target.value);

    if (onBlurHandler) onBlurHandler(event);
  };

  // TODO: en el futuro ponerlo como un hook con "_value", pero no sé por qué en los tests está fallando
  // no se está lanzando el evento onchange de algunos inputs

  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <LoadingPlaceholder isLoading={isLoading} height="h-8">
        <textarea
          id={id}
          data-testid={id}
          name={name}
          placeholder={placeholder}
          value={_value}
          required={required}
          onBlur={_onBlurHandler}
          onChange={_onChangeHandler}
        />
      </LoadingPlaceholder>
    </div>
  );
};

export default TextArea;
