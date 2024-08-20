import ProductListing from "./pages/ProductListing";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/authContext";
import { useContext } from "react";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Product from "./pages/Product";

function App() {
  const { user } = useContext(AuthProvider);
  console.log("----", user);

  const pathname = useLocation();
  const authRoute =
    pathname.pathname === "/login" || pathname.pathname === "/register"
      ? true
      : false;
  return (
    <div>
      {!authRoute && (
          <div className=" min-w-[100%] h-[40px] flex justify-center items-center bg-[#658C4A]">
            <span className=" text-base font-semibold text-gray-100">
              Buy Eco-Friendly products on ECO-Shop!
            </span>
          </div>
        ) && (
          <div className=" sticky">
            <Navbar auth={user} />
          </div>
        )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:category" element={<ProductListing />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route
          exact
          path="/products/cart"
          element={<Cart userId={user?._id} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
