import React from 'react';
import { useToast } from './ToastContext';

export const ToastDemo: React.FC = () => {
  const { addToast } = useToast();

  const showSuccessToast = () => {
    addToast("Success! Your action was completed successfully.", "success");
  };

  const showErrorToast = () => {
    addToast("Error! Something went wrong.", "error");
  };

  const showWarningToast = () => {
    addToast("Warning! Please check your input.", "warning");
  };

  const showInfoToast = () => {
    addToast("Info: This is an informational message.", "info");
  };

  const showLongToast = () => {
    addToast("This is a longer message that will stay for 8 seconds to demonstrate the custom duration feature.", "info", 8000);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">Toast Demo</h2>
      <div className="space-y-2">
        <button
          onClick={showSuccessToast}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
        >
          Success Toast
        </button>
        <button
          onClick={showErrorToast}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
        >
          Error Toast
        </button>
        <button
          onClick={showWarningToast}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
        >
          Warning Toast
        </button>
        <button
          onClick={showInfoToast}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Info Toast
        </button>
        <button
          onClick={showLongToast}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mr-2"
        >
          Long Duration Toast
        </button>
      </div>
    </div>
  );
}; 