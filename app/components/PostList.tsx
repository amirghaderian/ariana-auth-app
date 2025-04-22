import { useEffect, useState, useRef, useCallback } from "react";
import api from "../services/api.js";

const PostList = ({
  posts: externalPosts,
  loading: externalLoading,
  onEndReached,
  searchTerm,
}) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const isExternal = !!externalPosts;
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (isExternal && onEndReached && !loading && hasMore) {
            onEndReached();
          } else if (!isExternal && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, isExternal, onEndReached]
  );
  const handleDelete = async (id) => {
    try {
      await api.delete(`tweet/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        
      });
    } catch (error) {
      console.log("Post failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    if (isExternal) return;
    setLoading(true);
    try {
      const res = await api.get("tweet/", {
        params: {
          page,
          count_per_page: 10,
          ordering: "-created_at",
        },
      });
      setPosts((prev) => [...prev, ...res.data.results]);
      setHasMore(!!res.data.next);
    } catch (error) {
      console.error("خطا در گرفتن پست‌ها", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isExternal) {
      fetchPosts();
    }
  }, [page]);

  const displayPosts = isExternal ? externalPosts : posts;
  const loadingState = isExternal ? externalLoading : loading;

  return (
    <div className="space-y-4">
      {displayPosts?.map((post, index) => {
        const isLast = index === displayPosts.length - 1;
        console.log("isLast", isLast, "post.id", post.id);

        return (
          <div
            key={post.id}
            ref={isLast ? lastPostRef : null}
            className="bg-white rounded-xl shadow-sm p-4 space-y-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar || "logo.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {post.author.first_name} {post.author.last_name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>

              {/* Three-dot menu button */}
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenuId((prev) => (prev === post.id ? null : post.id))
                  }
                  className="text-gray-400 hover:text-black"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z" />
                  </svg>
                </button>

                {openMenuId === post.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H8V5a2 2 0 012-2z"
                        />
                      </svg>
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-700">{post.text}</p>
            <p className="text-xs text-gray-400 text-right">
              {new Date(post.created_at).toLocaleString("fa-IR")}
            </p>
          </div>
        );
      })}
      {loadingState && (
        <p className="text-center text-sm text-gray-400">در حال بارگذاری...</p>
      )}
      {!hasMore && (
        <p className="text-center text-sm text-gray-400">
          پست دیگری وجود ندارد
        </p>
      )}
      {isExternal && !loadingState && !displayPosts.length && (
        <div>
          <img src="E-Commerce 04.png" className="mx-auto" />
          <p className="text-center text-sm text-gray-400">
            No results found for “{searchTerm}”. Try checking your spelling or
            using different keywords.
          </p>
        </div>
      )}
    </div>
  );
};

export default PostList;
