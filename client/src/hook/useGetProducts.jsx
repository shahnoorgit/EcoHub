import { useState } from "react";
import toast from "react-hot-toast";

const useGetProducts = () => {
  const [loading, setLoading] = useState();
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/product");
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      return data;
    } catch (error) {
      console.log("Error fetching products", error);
      setLoading(false);
      toast.error("No products found");
    } finally {
      setLoading(false);
    }
  };
  return { loading, getProducts };
};

export default useGetProducts;
