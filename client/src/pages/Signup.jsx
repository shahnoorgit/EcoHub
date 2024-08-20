import React, { useState } from "react";
import toast from "react-hot-toast";
import useSignup from "../hook/useSignup";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const nav = useNavigate();

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Add your own logic to handle form submission here
    const ok = await signup(formData);
    if (!ok) {
      toast.error(data.error);
      return;
    }

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    nav("/");
  };
  return (
    <div className="min-w-full min-h-screen p-2 flex justify-center items-center bg-gray-500">
      <main className="w-[80%] rounded-md max-w-4xl shadow-md shadow-gray-600 h-full flex">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-1/2 max-sm:w-full bg-white p-8 flex justify-center items-center"
        >
          <div>
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            />
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            />
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            />
            <input
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              {loading ? "Signing in" : "Sign in"}
            </button>
          </div>
        </form>
        <div className="w-1/2 max-sm:hidden">
          <img
            src="./images/leaf.jpg"
            alt="leaf"
            className="w-full h-full object-cover"
          />
        </div>
      </main>
    </div>
  );
};

export default Signup;
