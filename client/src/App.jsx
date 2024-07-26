import { useState } from "react";
import ProductListing from "./pages/ProductListing";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <div className=" min-w-[100%] h-[40px] flex justify-center items-center bg-[#658C4A]">
          <span className=" text-base font-semibold text-gray-100">
            Buy Eco-Friendly products on ECO-Shop!
          </span>
        </div>
        <Navbar />
        <Home />
      </div>
    </>
  );
}

export default App;
