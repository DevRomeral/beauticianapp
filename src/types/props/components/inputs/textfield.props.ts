export type TextFieldType = 'text' | 'email' | 'password';

export interface TextFieldProps {
  type: TextFieldType;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void | Promise<void>;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}
