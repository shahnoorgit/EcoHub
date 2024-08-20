import React, { useState } from "react";
import toast from "react-hot-toast";

const useAddToCard = () => {
  const [loading, setLoading] = useState(false);
  const addCart = async (id, userId, quantity = 1) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/cart/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id, userId, quantity }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      return data.message;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, addCart };
};

export default useAddToCard;
