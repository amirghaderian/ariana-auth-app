import { useState } from "react";
import { Link } from "react-router";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import api from "../../services/api";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    if (e.target.name === "username") setUsernameExists(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!form.password.trim()) newErrors.password = "Password is required.";
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    debugger;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Simulate username conflict
    if (form.username === "takenuser") {
      setUsernameExists(true);
      return;
    }

    const formData = new FormData();
    formData.append("first_name", form.firstName);
    formData.append("last_name", form.lastName);
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("confirm_password", form.confirmPassword);

    if (avatar) {
      const fileInput = document.getElementById("fileInput");
      if (fileInput && fileInput.files.length > 0) {
        formData.append("avatar", fileInput.files[0]);
      }
    }

    try {
      const response = await api.post("register/", formData);
      const token = response.data.token;
      console.log("User registered successfully:", response.data);
    } catch (error) {
      const apiErrors = error.response?.data;
      if (apiErrors?.non_field_errors?.includes("Username already exists.")) {
        setUsernameExists(true);
      } else {
        console.error("Registration error:", apiErrors);
      }
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 px-4 overflow-hidden ">
      <div className="max-w-sm w-full bg-white p-6 rounded-xl shadow-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-center mb-6">
          <img src="logo.PNG" alt="Ariana Labs" className="h-10" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Sign Up</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your information to create an account.
        </p>

        {/* Upload placeholder */}
        <div className="flex items-center gap-4 mb-4 border border-gray-200 p-2 rounded-md">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <img src="person.svg" alt="avatar" />
            )}
          </div>
          <label
            htmlFor="fileInput"
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition cursor-pointer"
          >
            Upload +
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="First name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Please enter your first name"
            error={errors.firstName}
          />
          <InputField
            label="Last name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Please enter your last name"
            error={errors.lastName}
          />
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Please enter username"
            error={
              errors.username ||
              (usernameExists && "This username already exists.")
            }
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Please enter password"
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Please re-enter your password"
            error={errors.confirmPassword}
          />
          <Button type="submit">Register</Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-black hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
