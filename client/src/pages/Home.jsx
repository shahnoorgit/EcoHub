import React from "react";
import Navbar from "../components/Navbar";
import { category } from "../../constants";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className=" bg-white min-w-full">
      <section className=" min-w-full h-[30%] flex justify-center items-center">
        <div className="  w-1/2 flex justify-center p-3 h-[500px] items-center">
          <div className=" flex flex-col gap-3">
            <h1 className=" font-serif font-bold text-4xl text-gray-800">
              Eco-Friendly Products , <br />
              Healthy Earth.
            </h1>
            <p className=" font-semibold text-xl text-gray-700">
              Buy range of Eco-friendly products with ease,
              <br />
              Reduce your carbon footprint and support a sustainable future.
            </p>
            <center>
              <Link
                to={"/products/all"}
                className=" rounded-full mt-5 w-48 cursor-pointer flex justify-center items-center p-3 bg-[#658C4A] h-10"
              >
                <span className="font-semibold text-white">
                  Browse Products
                </span>
              </Link>
            </center>
          </div>
        </div>
        <div className="  w-1/2 flex justify-center p-5 h-[500px] items-center">
          <img
            src="/images/hero.png"
            alt="Eco-friendly Products"
            className="object-cover w-full h-full"
          />
        </div>
      </section>
      <section className=" flex items-center max-sm:flex-col max-sm:w-full gap-1 mt-10 mb-10 justify-between">
        <div className=" p-10 w-[200px] h-[150px]">
          <h1 className="flex font-bold font-serif text-[#658C4A] text-4xl">
            <span>
              Category <br /> for <br /> you
            </span>
          </h1>
        </div>
        {category.map((cat) => (
          <div className="flex border-green-500 rounded-lg border-2 max-sm:w-full max-sm:gap-5 hover:scale-105 transition-all ease-in relative cursor-pointer justify-center items-center">
            <img
              src={cat.image}
              className=" object-contain rounded-lg"
              height={200}
              width={200}
              alt="category"
            />
            <h2 className="absolute font-thin bottom-1 scale-90 left-1 rounded-full border-white border text-xs p-2 bg-gray-800 text-white">
              {cat.category}
            </h2>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
