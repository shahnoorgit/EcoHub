import ProductListing from "./pages/ProductListing";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const pathname = useLocation();
  const isAuth =
    pathname.pathname === "/login" || pathname.pathname === "/signup"
      ? true
      : false;
  console.log(isAuth);
  return (
    <div className=" relative">
      {!isAuth && (
          <div className=" min-w-[100%] h-[40px] flex justify-center items-center bg-[#658C4A]">
            <span className=" text-base font-semibold text-gray-100">
              Buy Eco-Friendly products on ECO-Shop!
            </span>
          </div>
        ) && (
          <div className=" sticky">
            <Navbar />
          </div>
        )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:category" element={<ProductListing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
