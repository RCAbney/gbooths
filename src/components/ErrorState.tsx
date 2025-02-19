type ErrorStateProps = {
  message: string;
};

const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="text-red-600 text-xl font-bold mb-4">
      Something went wrong
    </div>
    <div className="text-gray-600">
      {message}
    </div>
    <button 
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Try Again
    </button>
  </div>
);

export default ErrorState; 