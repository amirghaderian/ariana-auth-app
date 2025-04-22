import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import PostBox from "../../components/PostBox";
import PostList from "../../components/PostList";
import InputField from "../../components/InputField";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMoreSearchResults, setHasMoreSearchResults] = useState(false);
  const handleLogout = async () => {
    try {
      await api.delete("staff/auth/");
    } catch {
      console.warn("Logout request failed.");
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("staff/current_user/");
        setUser(res.data);
      } catch {
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      const fetchSearchResults = async () => {
        try {
          setSearchLoading(true);
          const res = await api.get("/tweet/", {
            params: {
              search: searchTerm,
              ordering: "-created_at",
              page: searchPage,
              count_per_page: 5,
            },
            signal: controller.signal,
          });

          setSearchResults((prev) =>
            searchPage === 1 ? res.data.results : [...prev, ...res.data.results]
          );
          setHasMoreSearchResults(!!res.data.next);
        } catch (err) {
          if (err.name !== "CanceledError") {
            console.error("Search error:", err);
          }
        } finally {
          setSearchLoading(false);
        }
      };

      fetchSearchResults();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchPage, searchTerm]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setHasMoreSearchResults(false);
      return;
    }
    setSearchPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const [userRes, postRes] = await api.get("/tweet/", {
          params: {
            ordering: "-created_at",
            count_per_page: 10,
          },
        });
        setUser(userRes.data);
        setSearchResults(postRes.data.results);
      } catch {
        // handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, []);
  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between rounded-r-3xl">
        <div>
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={user?.avatar || "logo.png"}
              alt="Avatar"
              className="w-20 h-20 rounded-full mb-3 object-cover"
            />
            <h3 className="font-semibold text-gray-800">
              {user?.first_name} {user?.last_name}
            </h3>
            <p className="text-sm text-gray-500">{user?.username}</p>
          </div>
        </div>

        <Button
          onClick={() => setShowLogoutModal(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600 transition"
        >
          ↶ Logout
        </Button>
        {showLogoutModal && (
          <Modal
            title="Log out"
            message="Are you sure you want to sign out of your account?"
            icon="⚠️"
            confirmText="Log out"
            cancelText="Cancel"
            onConfirm={() => {
              setShowLogoutModal(false);
              handleLogout();
            }}
            onCancel={() => setShowLogoutModal(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Bar */}
        <div className="h-16 flex items-center justify-between px-6 shadow-sm bg-white">
          <img src="/logo.PNG" alt="Ariana Labs" className="h-6" />
        </div>
        <div className="flex justify-center items-center mt-4 px-6">
          <div className="w-full">
            <InputField
              placeholder="search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Post Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {searchTerm === "" && <PostBox user={user} />}
          <PostList
            posts={searchTerm !== "" ? searchResults : undefined}
            searchTerm={searchTerm}
            loading={
              searchFocused && searchTerm.trim() !== ""
                ? searchLoading
                : undefined
            }
            onEndReached={() => {
              if (searchTerm && hasMoreSearchResults && !searchLoading) {
                setSearchPage((prev) => prev + 1);
                setSearchLoading(true);
              }
            }}
            hasMore={hasMoreSearchResults}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
