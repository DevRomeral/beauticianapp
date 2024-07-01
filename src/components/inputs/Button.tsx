'use client';

import ButtonIcon, { ButtonIconsId } from '../icons/ButtonIcon';

export type ButtonType = 'button' | 'submit';

export type ButtonStyle = '' | 'primary' | 'danger' | 'success';

export interface ButtonProps {
  id?: string;
  icon?: ButtonIconsId;
  type?: ButtonType;
  style?: ButtonStyle;
  text: string;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
}

function buttonStyles(style: ButtonStyle): string {
  switch (style) {
    case '':
      return 'text-primary-400 hover:bg-primary-50';
    case 'primary':
      return 'bg-primary-300 text-black hover:bg-primary-200';
    case 'danger':
      return 'bg-red-500 hover:bg-red:200 text-white';
    case 'success':
      return 'bg-success-300 hover:bg-success-200 text-black';
    default:
      return '';
  }
}

const Button: React.FC<ButtonProps> = ({
  id,
  icon = '',
  type = 'button',
  style = '',
  text = '',
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`flex flex-row items-center gap-1 rounded-sm px-2 py-1 text-base font-semibold uppercase duration-300 disabled:bg-gray-200 disabled:text-gray-600 ${buttonStyles(style)}`}
      onClick={onClick}
      id={id}
      data-testid={id}
      disabled={disabled}
    >
      {icon && <ButtonIcon id={icon} />}
      {text}
    </button>
  );
};

export default Button;
