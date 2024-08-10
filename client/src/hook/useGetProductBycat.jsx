import React, { useState } from "react";
import toast from "react-hot-toast";

const useGetProductBycat = () => {
  const [loading, setLoading] = useState(false);
  const getProductCategories = async (category) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/product/category/${category}`
      );
      const data = res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return { loading, getProductCategories };
};

export default useGetProductBycat;
