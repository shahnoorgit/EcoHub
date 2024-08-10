import React, { useState } from "react";
import toast from "react-hot-toast";

const useUploadProduct = () => {
  const [loading, setLoading] = useState(false);
  const upload = async (form) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/product", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setLoading(false);
      toast.success("Product uploaded successfully");
      return "ok";
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log(error);
    }
  };
  return { upload, loading };
};

export default useUploadProduct;
