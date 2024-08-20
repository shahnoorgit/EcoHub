import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useGetProducts from "../hook/useGetProducts";
import Spinner from "../components/Spinner";
import Card from "../components/Card"; // Adjust the import path as necessary
import useGetProductBycat from "../hook/useGetProductBycat";

const ProductListing = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { getProducts } = useGetProducts();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { getProductCategories } = useGetProductBycat();
  const getProductInclient = async () => {
    return await getProducts();
  };
  useEffect(() => {
    setCurrentPage(1);
    const fetchProducts = async () => {
      try {
        if (category === "all") {
          const products = await getProductInclient();
          setProducts(products.products);
        } else if (
          category === "Food and Beverage" ||
          category === "Furniture" ||
          category === "Green Technology" ||
          category === "Clothing and Equipment" ||
          category === "Home and Garden"
        ) {
          const products = await getProductCategories(category);
          setProducts(products.products);
        } else {
          navigate("/"); // Correct usage of useNavigate hook
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, navigate]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  const paginate = (pageNumber) => {
    console.log(" hii");
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top when a new page is selected (optional)
  };

  return (
    <main className="w-full bg-gray-200 h-full max-sm:p-0 py-5 min-h-screen">
      <section className="mx-auto w-[99%] min-h-full bg-white p-5">
        <div className="flex justify-between items-center w-full pb-5 border-b">
          <span className="font-semibold text-xs text-gray-900">
            Showing results for {category}
          </span>
          <div className="flex gap-2 items-center">
            <button className="bg-[#658C4A] p-2 rounded-xl text-white font-semibold text-sm">
              Sort
            </button>
            <button className="bg-[#658C4A] p-2 rounded-xl text-white font-semibold text-sm">
              Filter
            </button>
          </div>
        </div>
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-2 cursor-pointer max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentProducts.map((product, index) => (
                <Link to={`/product/${product._id}`}>
                  <Card
                    key={index}
                    title={product.name}
                    desc={product.description}
                    image={product.image}
                    price={product.price}
                    certificate={product.sustainabilityCertification}
                    category={product.category}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === number
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductListing;
