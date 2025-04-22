import { useState } from "react";
import api from "../services/api.js";
const PostBox = ({ user }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      await api.post(
        "/tweet/",
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setText("");
    } catch (error) {
      console.log("Post failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-4">
      <img
        src={user?.avatar || "logo.png"}
        alt="Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <textarea
          rows={2}
          className="w-full border border-gray-200 rounded-md p-2 text-sm resize-none focus:outline-none"
          placeholder="What is Happening ?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="text-right mt-2">
          <button
            onClick={handlePost}
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            } text-white px-4 py-1.5 rounded-md text-sm transition`}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
