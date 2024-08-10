import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <div className="w-64 h-3 bg-green-200 rounded-full overflow-hidden">
        <div className="w-full h-full bg-green-500 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
      <p className="mt-4 text-green-700 font-semibold">
        Loading eco-friendly products...
      </p>
    </div>
  );
};

export default Spinner;
