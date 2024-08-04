import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthProvider } from "../context/authContext";
import getUser from "./getUser";

const useSignup = () => {
  const { setUser } = useContext(AuthProvider);
  const [loading, setLoading] = useState(false);
  const { getuser } = getUser();
  const signup = async (registerData) => {
    setLoading(true);
    try {
      // Simulate signup logic
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setLoading(false);
      localStorage.setItem("tokenId", data._id);
      const userData = await getuser(data);
      setUser(userData);
      toast.success(" successfully registered!");
      return data;
    } catch (error) {
      setLoading(false);
      toast.error("Failed to signup, please try again.");
    }
  };
  return { signup, loading };
};

export default useSignup;
