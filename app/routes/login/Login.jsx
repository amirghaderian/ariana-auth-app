import { useState } from "react";
import { Link } from "react-router";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required.";
    if (!password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login with:", { username, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-center mb-6">
          <img
            src="logo.PNG"
            alt="Ariana Labs"
            className="h-10 cursor-pointer"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Login</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your username and password to login to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Please enter your username"
            error={errors.username}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please enter your password"
            error={errors.password}
          />

          <Button type="submit">Login</Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
