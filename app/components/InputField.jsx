const InputField = ({
  label,
  type = "text",
  value,
  name,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  error,
  onClear, // جدید برای آیکون ضربدر
}) => {
  return (
    <div>
      {label && (
        <label
          className={`block text-sm mb-1 ${
            error ? "text-red-600" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <img
          src="search.png"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          className={`w-full pl-8 pr-8 py-1 border rounded-md focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-black"
          }`}
        />

        {value && (
          <img
            onClick={onClear}
            src="Close-Button.png"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          />
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
