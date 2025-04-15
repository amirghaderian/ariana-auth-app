const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-700 font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
