import React, { useState } from "react";
import useUploadProduct from "../hook/useUploadProduct";
import { useNavigate } from "react-router-dom";

const ProductUploadModal = ({ sellerId, isOpen, onClose }) => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    image: null,
    sustainabilityCertification: "",
    sellerId: "",
  });

  const { loading, upload } = useUploadProduct();

  const categories = [
    "Food and Beverage",
    "Furniture",
    "Green Technology",
    "Clothing and Equipment",
    "Home and Garden",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("quantity", formData.quantity);
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("image", formData.image);
    form.append(
      "sustainabilityCertification",
      formData.sustainabilityCertification
    );
    form.append("sellerId", sellerId);
    // Handle form submission logic here
    const data = await upload(form);
    if (data.ok) {
      nav("/");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md z-50">
      <div className="bg-white min-w-[80%] sm:min-w-[60%] md:min-w-[50%] lg:min-w-[40%] xl:min-w-[30%] p-6 rounded-lg shadow-lg w-full max-w-3xl z-50">
        <h2 className="text-2xl font-bold mb-4">Upload Eco-Friendly Product</h2>
        <form onSubmit={handleSubmit} className="overflow-y-auto h-full">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="sustainabilityCertification"
            >
              Sustainability Certification
            </label>
            <input
              type="text"
              id="sustainabilityCertification"
              name="sustainabilityCertification"
              value={formData.sustainabilityCertification}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 border rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border rounded-lg text-white bg-green-600 hover:bg-green-700"
            >
              {loading ? "Uploading..." : "Upload Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUploadModal;
