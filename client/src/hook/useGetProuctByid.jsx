import React, { useState } from "react";

const useGetProuctByid = () => {
  const [loading, setLoading] = useState(false);
  const getProductByid = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/product/${id}`);
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return false;
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };
  return { getProductByid, loading };
};

export default useGetProuctByid;
