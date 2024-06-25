'use client';

export type ButtonType = 'button' | 'submit';

export type ButtonStyle = '' | 'primary' | 'danger';

export interface ButtonProps {
  id?: string;
  type?: ButtonType;
  style?: ButtonStyle;
  text: string;
  onClick?: () => void | Promise<void>;
}

function buttonStyles(style: ButtonStyle): string {
  switch (style) {
    case '':
      return 'text-primary-400 hover:bg-primary-50';
    case 'primary':
      return 'bg-primary-300 text-black hover:bg-primary-200';
    case 'danger':
      return 'bg-red-500 text-white';
    default:
      return '';
  }
}

const Button: React.FC<ButtonProps> = ({ id, type = 'button', style = '', text = '', onClick }) => {
  return (
    <button
      type={type}
      className={`gap-2 rounded-sm px-2 py-1 text-base font-semibold uppercase duration-300 ${buttonStyles(style)}`}
      onClick={onClick}
      id={id}
      data-testid={id}
    >
      {text}
    </button>
  );
};

export default Button;
