import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function DebugInfo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-0 border border-green-300 bg-green-100 px-2 py-1 text-green-800">
      <h5 className="flex items-center gap-2 font-bold">
        <ExclamationTriangleIcon className="h-5 w-5" /> Debug Info
      </h5>
      {children}
    </div>
  );
}
