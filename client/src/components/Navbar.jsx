import React, { useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { IoBagHandleOutline, IoLogInOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import ProductUploadModal from "./ProductUpload";
import { IoMdClose } from "react-icons/io";

const Navbar = ({ auth }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className=" w-full h-full bg-white px-5 flex flex-col justify-between items-center">
      <div className="z-50">
        <ProductUploadModal
          sellerId={auth?._id}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
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
          <div className="flex items-center max-sm:gap-0 max-sm:hidden">
            {auth != null ? (
              <>
                <HiOutlineUser className="h-8 w-8 max-sm:h-5 max-sm:w-5 cursor-pointer text-gray-400 hover:text-gray-500" />
                <IoBagHandleOutline className="h-8 max-sm:h-5 max-sm:w-5 w-8 ml-4 max-sm:ml-1 cursor-pointer text-gray-400 hover:text-gray-500" />
                <button onClick={openModal}>
                  <FaCloudUploadAlt className="h-8 max-sm:h-5 max-sm:w-5 w-8 ml-4 max-sm:ml-1 cursor-pointer text-gray-400 hover:text-gray-500" />
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className=" h-full flex justify-center items-center gap-1 text-xl text-white font-bold p-1 rounded-lg w-full bg-green-500"
              >
                <IoLogInOutline className=" text-xl font-extrabold" />
                <span>Login</span>
              </Link>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="block lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-800 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-screen p-4 flex justify-center items-center border-b border-gray-700">
        <ul
          className={`lg:flex gap-2 justify-center items-center mb-5 lg:mb-0 ${
            isMenuOpen
              ? "fixed inset-0 h-screen bg-gray-900 bg-opacity-50 backdrop-blur-sm flex flex-col justify-start items-center z-10 space-y-2"
              : "hidden"
          }`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 px-4 hidden max-sm:block py-2 text-white bg-red-600 rounded-md"
          >
            <IoMdClose />
          </button>
          <li className="px-5 py-2 font-bold cursor-pointer text-base text-gray-950 max-sm:text-gray-100 hover:text-gray-300">
            Clothing
          </li>
          <li className="px-5 py-2 font-bold cursor-pointer text-base text-gray-950 max-sm:text-gray-100 hover:text-gray-300">
            Home Garden
          </li>
          <li className="px-5 py-2 font-bold cursor-pointer text-base text-gray-950 max-sm:text-gray-100 hover:text-gray-300">
            Furniture
          </li>
          <li className="px-5 py-2 font-bold cursor-pointer text-base text-gray-950 max-sm:text-gray-100 hover:text-gray-300">
            Green Technology
          </li>
          <li className="px-5 py-2 font-bold cursor-pointer text-base text-gray-950 max-sm:text-gray-100 hover:text-gray-300">
            Food & Beverage
          </li>
          <li className="px-5 py-2 font-bold cursor-pointer text-base text-gray-950 max-sm:text-gray-100 hover:text-gray-300">
            Accessories
          </li>
          <Link to={"/login"}>
            <Link
              to={"/login"}
              className=" h-full lg:hidden max-sm:flex flex justify-center items-center gap-1 text-xl text-white font-bold p-1 rounded-lg w-full bg-green-500"
            >
              <IoLogInOutline className=" text-xl font-extrabold" />
              <span>Login</span>
            </Link>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
