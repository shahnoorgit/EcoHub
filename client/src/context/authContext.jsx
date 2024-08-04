import React, { createContext, useEffect, useState } from "react";
import getUser from "../hook/getUser";

export const AuthProvider = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const { getuser } = getUser();
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("tokenId");
      console.log(userId);
      if (!userId) {
        setUser(null);
        return;
      }

      const data = await getuser(userId);
      setUser(data);
    };

    fetchUser();
  }, []);
  return (
    <AuthProvider.Provider value={{ user, setUser }}>
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
