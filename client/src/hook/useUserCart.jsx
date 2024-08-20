import React, { useState } from "react";
import toast from "react-hot-toast";

const useUserCart = () => {
  const [loading, setLoading] = useState(false);
  const getCart = async (userId) => {
    console.log(userId);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/cart/${userId}`);
      const cart = await res.json();
      if (cart.error) {
        return toast.error(cart.error);
      }
      toast.success("Cart fetched successfully!");
      console.log("----art", cart);
      return cart;
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getCart };
};

export default useUserCart;
