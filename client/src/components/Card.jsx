import React from "react";

const Card = ({ title, desc, image, certificate, category, price }) => {
  return (
    <div className="max-w-sm  rounded-lg border-green-500 border-2 overflow-hidden shadow-lg bg-white m-4 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4 flex flex-col h-48">
        <h2 className="text-2xl font-semibold text-green-800">{title}</h2>
        <p className="text-gray-600 mt-2 flex-grow overflow-hidden overflow-ellipsis">
          {desc}
        </p>
        <div className="flex items-center mt-4">
          <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
            {category}
          </span>
          <span className="ml-2 inline-block bg-green-100 text-green-700 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
            {certificate}
          </span>
        </div>
        <div className="mt-auto flex justify-between items-center pt-4">
          <span className="text-xl font-bold text-green-800">${price}</span>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
