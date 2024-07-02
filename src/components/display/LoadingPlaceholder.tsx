export interface ILoadingProps {
  isLoading?: boolean;
}
export interface LoadingPlaceholderProps extends ILoadingProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  tailwindClasses?: string;
}

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({
  isLoading = false,
  width = 'w-full',
  height = 'h-full',
  children,
  tailwindClasses = '',
}) => {
  return isLoading ? (
    <div className={`${height} ${width} z-0 animate-pulse`}>
      <div className={`${tailwindClasses} h-full w-full rounded-sm bg-gray-400`}></div>
    </div>
  ) : (
    children
  );
};

export default LoadingPlaceholder;
