import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import useUserCart from "../hook/useUserCart";

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const { getCart, loading } = useUserCart();

  useEffect(() => {
    getCart(userId).then((cart) => setCartItems(cart?.products || []));
  }, []);

  const handleQuantityChange = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + increment > 0 ? item.quantity + increment : 1,
            }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const [shippingAddress, setShippingAddress] = useState({
    name: "John Doe",
    city: "New York",
    state: "NY",
    country: "USA",
    postalCode: "10001",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  console.log(cartItems);

  const totalItems = cartItems?.reduce(
    (total, item) => total + (item?.quantity || 0),
    0
  );

  const totalPrice = cartItems?.reduce(
    (total, item) =>
      total + (item?.productId?.price || 0) * (item?.quantity || 0),
    0
  );

  return (
    <main className="w-full min-h-[80vh] flex flex-col md:flex-row justify-center items-start bg-white p-4 md:p-8">
      <div className="w-full md:w-2/3 flex flex-col items-start">
        <div className="flex w-full justify-between items-center h-16 mb-4">
          <span className="text-gray-800 text-xl font-bold">Shopping Cart</span>
          <span className="text-gray-800 text-xl font-bold">
            {totalItems} Items
          </span>
        </div>
        <div className="w-full flex-1 flex-col border-2 overflow-auto h-full">
          {cartItems?.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No products added to the cart.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-4 text-left border-r text-sm md:text-base">
                      Product Details
                    </th>
                    <th className="py-3 px-4 text-left border-r text-sm md:text-base">
                      Quantity
                    </th>
                    <th className="py-3 px-4 text-left border-r text-sm md:text-base">
                      Price
                    </th>
                    <th className="py-3 px-4 text-left text-sm md:text-base">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="py-4 px-4 border-r flex flex-col md:flex-row md:items-center">
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="w-16 h-16 object-cover mb-2 md:mb-0 md:mr-4"
                        />
                        <div className="flex flex-col justify-between">
                          <span className="text-sm md:text-base mb-2">
                            {item.productId.name}
                          </span>
                          <button
                            className="text-xs md:text-sm text-red-500 hover:text-red-700"
                            onClick={() => handleRemove(item._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 border-r">
                        <div className="flex items-center">
                          <button
                            className="px-2 py-1 text-xs md:text-sm bg-gray-200 hover:bg-gray-300"
                            onClick={() => handleQuantityChange(item._id, -1)}
                          >
                            -
                          </button>
                          <span className="mx-2 text-sm md:text-base">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2 py-1 text-xs md:text-sm bg-gray-200 hover:bg-gray-300"
                            onClick={() => handleQuantityChange(item._id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 border-r text-sm md:text-base">{`$${item.productId.price.toFixed(
                        2
                      )}`}</td>
                      <td className="py-4 px-4 text-sm md:text-base">{`$${(
                        item.productId.price * item.quantity
                      ).toFixed(2)}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex w-full px-5 items-center h-16 mt-4">
          <IoIosArrowRoundBack className="text-gray-800 text-3xl" />
          <Link
            className="text-gray-800 text-base font-semibold ml-2"
            to={"/products/all"}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center mt-8 md:mt-0">
        <div className="border p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">
            <span className="font-medium">Items Selected:</span> {totalItems}
          </div>
          <div className="mb-4">
            <span className="font-medium">Shipping Address:</span>
            <div className="mt-2">
              {!isEditing ? (
                <div>
                  <p>{shippingAddress.name}</p>
                  <p>
                    {shippingAddress.city}, {shippingAddress.state}
                  </p>
                  <p>
                    {shippingAddress.country}, {shippingAddress.postalCode}
                  </p>
                  <button
                    className="text-blue-500 hover:text-blue-700 mt-2"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Address
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    placeholder="Postal Code"
                    className="w-full p-2 border rounded"
                  />
                  <button
                    className="text-blue-500 hover:text-blue-700 mt-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Save Address
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <span className="font-medium">Total Price:</span>{" "}
            {`$${totalPrice.toFixed(2)}`}
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            Buy Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
