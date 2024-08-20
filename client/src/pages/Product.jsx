import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetProuctByid from "../hook/useGetProuctByid";
import toast from "react-hot-toast";
import { AuthProvider } from "../context/authContext";
import useAddToCard from "../hook/useAddToCard";

const Product = () => {
  const [btnMessage, setBtnMessage] = useState(" Add to Cart");
  const { getProductByid, loading: ProductLoading } = useGetProuctByid();
  const { loading, addCart } = useAddToCard();
  const [product, setProduct] = useState("");
  const { user } = useContext(AuthProvider);
  const { id } = useParams();
  useEffect(() => {
    const fetchdata = async () => {
      const fetchedProduct = await getProductByid(id);
      if (!fetchedProduct) return toast.error("Product not found");
      setProduct(fetchedProduct);
    };
    fetchdata();
  }, []);
  const imgUrl = String(product.product?.image);

  const addToCart = async (id) => {
    setBtnMessage("Adding to Cart");
    try {
      if (!user._id) {
        toast.error("You must be logged in to add products to cart");
        return;
      }
      if (!id) {
        toast.error("Product ID is missing");
        return;
      }

      const data = await addCart(id, user._id);
      console.log(data);
      if (data) {
        toast.success("Product added to cart");
        setBtnMessage("Added to cart !");
        return data;
      }

      if (!data) {
        toast.error(" error adding product");
        setBtnMessage(" Add to Cart");
        return;
      }
    } catch (error) {
      setBtnMessage(" Add to Cart");
      console.log(error);
    }
  };
  console.log(product);
  return (
    <main className="w-full max-sm:flex-col h-screen flex bg-gray-200">
      <div className="w-1/2 h-full max-sm:w-full flex p-5 max-sm:p-1 justify-center items-center bg-white">
        <img
          src={`http://localhost:8000/images/${imgUrl.slice(4)}`}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-1/2 max-sm:w-full max-sm:text-xl h-full p-10 max-sm:p-2 flex flex-col justify-start items-start bg-gray-200">
        <span className=" text-3xl font-bold  ">{product?.product?.name}</span>
        <p className=" max-sm:mt-5 text-xl max-sm:text-lg font-md mt-10">
          {product?.product?.description}
        </p>
        <div className=" flex flex-col justify-start items-start gap-1">
          <p className=" max-sm:mt-5 text-2xl font-bold mt-10">
            ${product?.product?.price}
          </p>
          <p className=" text-lg max-sm:text-base font-semibold">
            {product?.product?.quantity} units left
          </p>
        </div>
        <p className=" max-sm:p-1 max-sm:mt-1 text-xl  text-gray-900 bg-green-500 p-2 rounded-lg max-sm:text-lg font-semibold mt-10">
          {product?.product?.category}
        </p>
        <div className="p-3 max-sm:p-1  max-sm:mt-1 rounded-lg mt-5 bg-slate-500">
          <p className=" text-lg font-medium">
            <span>Certified By</span>
          </p>
          <p className=" text-base font-normal">
            {product?.product?.sustainabilityCertification}
          </p>
        </div>
        <div className="w-full max-sm:mt-1 justify-center items-center mt-10">
          <button
            onClick={() => addToCart(id)}
            className="max-sm:w-full text-2xl max-sm:mt-0 max-sm:p-5 max-sm:text-base p-10 w-full max-sm:h-10  rounded-lg bg-blue-500 text-white font-semibold mt-10"
          >
            {btnMessage}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Product;
