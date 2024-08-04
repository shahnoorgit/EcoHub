import { useContext, useState } from "react";
import { AuthProvider } from "../context/authContext";
import getUser from "./getUser";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthProvider);
  const login = async (formdata) => {
    setLoading(true);
    const { getuser } = getUser();
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      const userData = await getuser(data);
      setUser(userData);
      setLoading(false);
      localStorage.setItem("tokenId", data._id);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
