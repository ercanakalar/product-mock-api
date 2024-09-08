const LoadingSpinner = ({ isLoading }: { isLoading?: boolean }) => {
  if (!isLoading) return null;
  return (
    <div className='absolute w-full h-full flex items-center justify-center mb-4 left-0 top-0 bg-gray-500 bg-opacity-50 text-blue-500'>
      <div className='spinner border-4 border-solid border-gray-300 border-t-blue-500 rounded-full w-6 h-6 animate-spin'></div>
      <span className='ml-2'>Loading tokens...</span>
    </div>
  );
};

export default LoadingSpinner;
