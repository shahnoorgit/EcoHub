import React, { useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import ProductUploadModal from "./ProductUpload";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <header className=" w-full h-full bg-white px-5 flex flex-col justify-between items-center">
      <div className="z-50">
        <ProductUploadModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className=" w-screen flex px-10 max-sm:p-0 gap-5 max-sm:gap-0 items-center h-[80px]">
        <Link to={"/"} className=" flex justify-center items-center">
          <img
            src="/images/Logo.png"
            width={90}
            height={80}
            alt="logo"
            className=" object-cover"
          />
        </Link>
        <div class="relative w-[80%] mx-5">
          <input
            class="appearance-none border-2 h-12 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-3xl w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-600 focus:border-green-600 focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Search..."
          />

          <div class="absolute left-0 inset-y-0 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className=" flex items-center max-sm:gap-0 ">
          <HiOutlineUser className="h-8 w-8 max-sm:h-5 max-sm:w-5 cursor-pointer text-gray-400 hover:text-gray-500" />
          <IoBagHandleOutline className="h-8 max-sm:h-5 max-sm:w-5 w-8 ml-4 max-sm:ml-1 cursor-pointer text-gray-400 hover:text-gray-500" />
          <button onClick={openModal}>
            <FaCloudUploadAlt className="h-8 max-sm:h-5 max-sm:w-5 w-8 ml-4 max-sm:ml-1 cursor-pointer text-gray-400 hover:text-gray-500" />
          </button>
        </div>
      </div>
      <div className=" flex items-center border-b border-gray-700 justify-center w-screen">
        <ul className=" flex gap-2 items-center mb-5">
          <li className="px-5 font-bold cursor-pointer text-base text-gray-800 hover:text-gray-500">
            Clothing
          </li>
          <li className="px-5 font-bold cursor-pointer text-base text-gray-800 hover:text-gray-500">
            Home Garden
          </li>
          <li className="px-5 font-bold cursor-pointer text-base text-gray-800 hover:text-gray-500">
            Furniture
          </li>
          <li className="px-5 font-bold cursor-pointer text-base text-gray-800 hover:text-gray-500">
            Green Technology
          </li>
          <li className="px-5 font-bold cursor-pointer text-base text-gray-800 hover:text-gray-500">
            Food & Beverage
          </li>
          <li className="px-5 font-bold cursor-pointer text-base text-gray-800 hover:text-gray-500">
            Accessories
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
