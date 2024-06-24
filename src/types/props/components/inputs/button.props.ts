export type ButtonType = 'button' | 'submit';

export type ButtonStyle = '' | 'primary';

export interface ButtonProps {
  type: ButtonType;
  style: ButtonStyle;
  text: string;
  onClick: () => void | Promise<void>;
}
