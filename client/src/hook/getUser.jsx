import React from "react";

const getUser = () => {
  const getuser = async (userId) => {
    const res = await fetch("http://localhost:8000/api/auth/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    return data;
  };
  return { getuser };
};

export default getUser;
