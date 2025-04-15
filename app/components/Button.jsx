const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
