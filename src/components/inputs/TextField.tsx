'use client';

import { TextFieldProps } from '@/types/props/components/inputs/textfield.props';

const Button: React.FC<TextFieldProps> = ({
  type,
  label,
  placeholder,
  id,
  name,
  required,
  onBlurHandler,
  onChangeHandler,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Button;
