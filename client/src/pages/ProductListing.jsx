import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card"; // Adjust the import path as necessary

const ProductListing = () => {
  const fakeProducts = [
    {
      name: "Organic Apple Juice",
      price: 4.99,
      quantity: 50,
      description: "Freshly squeezed organic apple juice.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Food and Beverage",
      sustainabilityCertification: "USDA Organic",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c4e",
    },
    {
      name: "Eco-Friendly Sofa",
      price: 299.99,
      quantity: 20,
      description: "Comfortable sofa made with eco-friendly materials.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Furniture",
      sustainabilityCertification: "Green Guard",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c4f",
    },
    {
      name: "Solar Panel Kit",
      price: 499.99,
      quantity: 10,
      description: "Complete solar panel kit for home use.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Green Technology",
      sustainabilityCertification: "Energy Star",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c50",
    },
    {
      name: "Recycled Cotton T-Shirt",
      price: 19.99,
      quantity: 100,
      description: "Comfortable t-shirt made from recycled cotton.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Clothing and Equipment",
      sustainabilityCertification: "Global Recycled Standard",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c51",
    },
    {
      name: "Bamboo Toothbrush",
      price: 3.99,
      quantity: 200,
      description: "Eco-friendly toothbrush made from bamboo.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Home and Garden",
      sustainabilityCertification: "FSC Certified",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c52",
    },
    {
      name: "Organic Almond Milk",
      price: 3.49,
      quantity: 60,
      description: "Delicious and nutritious organic almond milk.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Food and Beverage",
      sustainabilityCertification: "USDA Organic",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c53",
    },
    {
      name: "Reclaimed Wood Coffee Table",
      price: 149.99,
      quantity: 15,
      description: "Stylish coffee table made from reclaimed wood.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Furniture",
      sustainabilityCertification: "FSC Certified",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c54",
    },
    {
      name: "Wind Turbine Generator",
      price: 799.99,
      quantity: 5,
      description: "Efficient wind turbine generator for renewable energy.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Green Technology",
      sustainabilityCertification: "Energy Star",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c55",
    },
    {
      name: "Hemp Backpack",
      price: 39.99,
      quantity: 80,
      description: "Durable and eco-friendly backpack made from hemp.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Clothing and Equipment",
      sustainabilityCertification: "Global Organic Textile Standard",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c56",
    },
    {
      name: "Eco-Friendly Cleaning Supplies",
      price: 24.99,
      quantity: 40,
      description: "Complete set of eco-friendly cleaning supplies.",
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/blank_tote_merch_swag_fashion_print_on_demand.jpg?v=1689965049",
      category: "Home and Garden",
      sustainabilityCertification: "Green Seal",
      createdAt: new Date(),
      createdBy: "60f6c5af45b7a5303c5f3c57",
    },
    // Add more products if needed to reach more than 30 items
  ];

  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = fakeProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(fakeProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="grid grid-cols-2 cursor-pointer max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map((product, index) => (
            <Card
              key={index}
              title={product.name}
              desc={product.description}
              image={product.image}
              price={product.price}
              certificate={product.sustainabilityCertification}
              category={product.category}
            />
          ))}
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
