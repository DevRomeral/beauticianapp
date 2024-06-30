export interface LoadingPlaceholderProps {
  isLoading: boolean;
  children: React.ReactNode;
  width?: string;
  height?: string;
  tailwindClasses?: string;
}

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({
  isLoading,
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
