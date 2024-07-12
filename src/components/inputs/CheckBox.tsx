'use client';

import React, { useEffect, useState } from 'react';

import LoadingPlaceholder, { ILoadingProps, LoadingPlaceholderConfig } from '../display/LoadingPlaceholder';

export interface CheckBoxProps extends ILoadingProps {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
  name: string;
  currentValue?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | null;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  name,
  value,
  disabled = false,
  isLoading = false,
  currentValue = false,
  label,
  onChange,
}) => {
  const [_checked, _setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (currentValue != null) _setChecked(currentValue);
  }, [currentValue]);

  const _onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.stopPropagation();
    const newValue = event.target.checked;
    _setChecked(newValue);

    if (onChange) onChange(event);
  };

  return (
    <div className="flex items-center gap-2 px-2 py-1">
      {isLoading && <div className={`h-5 w-5 animate-pulse rounded-full ${LoadingPlaceholderConfig.color}`}></div>}
      <LoadingPlaceholder isLoading={isLoading} width="w-40" height="h-3">
        <input
          type="checkbox"
          name={name}
          id={id}
          value={value}
          disabled={disabled}
          onChange={_onChangeHandler}
          checked={_checked}
          className="input-check-hidden"
        />
        <label htmlFor={id} className="custom-check" />
        <label htmlFor={id}>{label}</label>
      </LoadingPlaceholder>
    </div>
  );
};

export default CheckBox;
