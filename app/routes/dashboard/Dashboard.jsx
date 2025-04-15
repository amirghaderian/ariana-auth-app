// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import Button from "../../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await api.delete("/auth/");
    } catch (error) {
      console.warn("Logout request failed, but proceeding anyway.");
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/current_user/");
        setUser(res.data);
      } catch (err) {
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between rounded-r-3xl">
        <div>
          {/* User Info */}
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

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600 transition"
        >
          ↶ Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Logo Top */}
        <div className="h-16 flex items-center justify-start px-6">
          <img src="/logo.PNG" alt="Ariana Labs" className="h-6" />
        </div>

        {/* Main Body Content */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/dashboard-placeholder.png"
            alt="Dashboard content"
            className="w-1/2 opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
