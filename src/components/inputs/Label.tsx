'use client';

import { FC } from 'react';

export interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const Label: FC<LabelProps> = ({ htmlFor, children }) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};

export default Label;
