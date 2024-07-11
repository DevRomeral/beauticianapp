'use client';

import LoadingPlaceholder, { ILoadingProps } from '../display/LoadingPlaceholder';
import ButtonIcon, { ButtonIconsId } from '../icons/ButtonIcon';

export type ButtonType = 'button' | 'submit';

export type ButtonStyle = '' | 'primary' | 'danger' | 'success';

export interface ButtonProps extends ILoadingProps {
  id?: string;
  icon?: ButtonIconsId;
  type?: ButtonType;
  style?: ButtonStyle;
  text: string;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
}

const Button: React.FC<ButtonProps> = ({
  id,
  icon = '',
  type = 'button',
  style = '',
  text = '',
  disabled = false,
  isLoading = false,
  onClick,
}) => {
  return (
    <LoadingPlaceholder isLoading={isLoading} width="w-40" height="h-8">
      <button type={type} className={style} onClick={onClick} id={id} data-testid={id} disabled={disabled}>
        {icon && <ButtonIcon id={icon} />}
        {text}
      </button>
    </LoadingPlaceholder>
  );
};

export default Button;
