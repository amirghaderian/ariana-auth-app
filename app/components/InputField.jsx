const InputField = ({
  label,
  type = "text",
  value,
  name,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div>
      <label
        className={`block text-sm mb-1 ${
          error ? "text-red-600" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-black"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};
export default InputField;
