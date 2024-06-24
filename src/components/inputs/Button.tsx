'use client';

import { ButtonProps, ButtonStyle } from '@/types/props/components/inputs/button.props';

function buttonStyles(style: ButtonStyle): string {
  switch (style) {
    case '':
      return 'text-primary-400 hover:bg-primary-50 duration-300';
    case 'primary':
      return 'bg-primary-300 text-black hover:bg-primary-200';
    default:
      return '';
  }
}

const Button: React.FC<ButtonProps> = ({ type, style, text, onClick }) => {
  return (
    <button
      type={type}
      className={`gap-2 rounded-sm px-2 py-1 text-base font-semibold ${buttonStyles(style)}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
