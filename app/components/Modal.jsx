// components/Modal.jsx
const Modal = ({
  title = "Log out",
  message = "Are you sure you want to sign out of your account?",
  onConfirm,
  onCancel,
  confirmText = "Log out",
  cancelText = "Cancel",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm relative p-6">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          onClick={onCancel}
        >
          ✕
        </button>

        {/* Icon */}
        <div className="text-4xl flex justify-center mb-3">
          <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-black text-xl">
            !
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-gray-900 font-semibold text-lg mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6 text-sm">{message}</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-5 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-[#0A0A23] text-white rounded-md hover:bg-[#1a1a40] cursor-pointer"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
