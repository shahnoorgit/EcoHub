import ProductListing from "./pages/ProductListing";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className=" relative">
      <div className=" min-w-[100%] h-[40px] flex justify-center items-center bg-[#658C4A]">
        <span className=" text-base font-semibold text-gray-100">
          Buy Eco-Friendly products on ECO-Shop!
        </span>
      </div>
      <div className=" sticky">
        <Navbar />
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:category" element={<ProductListing />} />
      </Routes>
    </div>
  );
}

export default App;
