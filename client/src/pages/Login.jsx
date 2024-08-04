import React, { useState } from "react";
import useLogin from "../hook/useLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();
  const { loading, login } = useLogin();

  const submitHandler = async (e) => {
    e.preventDefault();
    // Perform login logic here
    const res = await login(formdata);
    if (res.error) {
      return;
    }
    setformdata({ email: "", password: "" });
    nav("/");
    // Reset form fields after submission
  };
  return (
    <div className="min-w-full min-h-screen p-2 flex justify-center items-center bg-gray-500">
      <main className="w-full rounded-md max-w-4xl shadow-md shadow-gray-600 h-full flex">
        <form
          onSubmit={(e) => submitHandler(e)}
          className="w-1/2 max-sm:w-full bg-white p-8 flex justify-center items-center"
        >
          <div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
              value={formdata.email}
              onChange={(e) =>
                setformdata({ ...formdata, email: e.target.value })
              }
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            />
            <input
              value={formdata.password}
              onChange={(e) =>
                setformdata({ ...formdata, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              {loading ? "Loging you in..." : "Login"}
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

export default Login;
