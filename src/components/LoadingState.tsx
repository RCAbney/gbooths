const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
    <div className="mt-4 font-bold text-xl text-indigo-600">Loading...</div>
  </div>
);

export default LoadingState; 