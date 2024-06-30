'use client';

import Button, { ButtonProps } from '../inputs/Button';
import LoadingPlaceholder from './LoadingPlaceholder';

export interface PageTitleProps {
  title: string;
  isLoading?: boolean;
  subtitle?: string;
  btnProps?: ButtonProps;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, isLoading = false, subtitle, btnProps }) => {
  return (
    <div className="mb-5 mt-2">
      <div className={`flex flex-row justify-between ${isLoading ? '' : ''}`}>
        <LoadingPlaceholder isLoading={isLoading} height="h-8" width="w-1/2">
          <h1>{title}</h1>
        </LoadingPlaceholder>
        {btnProps && (
          <LoadingPlaceholder isLoading={isLoading} height="h-8" width="w-1/4">
            <Button
              id={btnProps?.id}
              style={btnProps?.style}
              text={btnProps?.text}
              type={btnProps?.type}
              disabled={btnProps?.disabled}
              onClick={btnProps?.onClick}
              icon={btnProps.icon}
            />
          </LoadingPlaceholder>
        )}
      </div>
      <h3>{subtitle}</h3>
    </div>
  );
};

export default PageTitle;
