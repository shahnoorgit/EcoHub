import React from "react";

const Login = () => {
  return (
    <div className="min-w-full min-h-screen p-2 flex justify-center items-center bg-gray-500">
      <main className="w-full rounded-md max-w-4xl shadow-md shadow-gray-600 h-full flex">
        <form className="w-1/2 max-sm:w-full bg-white p-8 flex justify-center items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Login
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
