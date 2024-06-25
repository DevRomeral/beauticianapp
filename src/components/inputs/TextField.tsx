'use client';

export type TextFieldType = 'text' | 'email' | 'password';

export interface TextFieldProps {
  id: string;
  name?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: TextFieldType;
  onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void | Promise<void>;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}

const Button: React.FC<TextFieldProps> = ({
  type = 'text',
  label,
  placeholder = '',
  id,
  name = id,
  required = false,
  onBlurHandler,
  onChangeHandler,
}) => {
  return (
    <div className="mb-6 w-full">
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
