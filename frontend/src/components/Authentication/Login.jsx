import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function Login({ onSignupClick, closeModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/Login.php",
        {
          email: username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Login Response:", response.data);

      if (response.data.email) {
        login({
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          role: response.data.role,
        });

        if (typeof closeModal === "function") {
          toast.success("Login successful!");
          closeModal();
        }
      } else {
        alert("Login failed: " + (response.data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        alert("Login failed: " + (error.response.data.error || "Server error"));
      } else {
        alert("Login failed: Network or server is unreachable");
      }
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-5 p-7 w-full relative"
    >
      <h2 className="text-[18px] font-semibold text-center">Login</h2>
      <ToastContainer />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Email"
        className="text-[14px] p-2 border border-primary-dark border-opacity-30 rounded-custom-xs"
        required
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="text-[14px] p-2 w-full border border-primary-dark border-opacity-30 rounded-custom-xs"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <RemoveRedEyeOutlinedIcon style={{ fontSize: 20 }} />
          ) : (
            <VisibilityOffOutlinedIcon style={{ fontSize: 20 }} />
          )}
        </button>
      </div>

      <button
        type="submit"
        className="bg-primary-dark hover:bg-primary text-white text-[14px] p-2 rounded transition-colors"
      >
        Login
      </button>
    </form>
  );
}
