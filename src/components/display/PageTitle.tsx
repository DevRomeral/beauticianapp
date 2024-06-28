'use client';

import Button, { ButtonProps } from '../inputs/Button';

export interface PageTitleProps {
  title: string;
  subtitle?: string;
  btnProps?: ButtonProps;
}

// TODO: Crear tests de PageTitle
const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, btnProps }) => {
  return (
    <div className="mb-5">
      <div className="flex flex-row justify-between">
        <h1>{title}</h1>
        {btnProps?.id && (
          <Button
            id={btnProps?.id}
            style={btnProps?.style}
            text={btnProps?.text}
            type={btnProps?.type}
            disabled={btnProps?.disabled}
            onClick={btnProps?.onClick}
            icon={btnProps.icon}
          />
        )}
      </div>
      <h3>{subtitle}</h3>
    </div>
  );
};

export default PageTitle;
