/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import printJS from "print-js"; 
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";

const FoodMenu = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user.email;
  const name = user.displayName;
  const [orderList, setOrderList] = useState([]);
  const foodData = useLoaderData();
  const [isReceiptVisible, setIsReceiptVisible] = useState(true); 
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Helper function to get current Bangladeshi date
  const getBangladeshDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZone: "Asia/Dhaka" };
    return new Date().toLocaleString("en-US", options);
  };

  // Handle order
  const handleOrder = () => {
    const orderDate = getBangladeshDate();
    const orderData = { name, userEmail, orderDate, orderList };

    fetch("https://restupos-server.vercel.app/Order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Order confirmed",
          showConfirmButton: false,
          timer: 1500,
        });
        
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
        });
      });
  };

  // Add item to the receipt
  const handleAddToReceipt = (food) => {
    setOrderList((prev) => [...prev, food]);
  };

  // Clear all items
  const handleClearAll = () => {
    setOrderList([]);
  };

  // Remove specific item
  const handleRemoveItem = (index) => {
    setOrderList((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculate total price
  const totalPrice = orderList.reduce(
    (total, item) => total + parseInt(item.foodPrice),
    0
  );

  // Handle print
  const handlePrint = () => {
    if (orderList.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No items to print",
        text: "Please add some items to the receipt before printing.",
      });
      return;
    }

    setIsReceiptVisible(true);

    const printableContent = document.getElementById("receipt-content");
    if (printableContent) {
      printJS({
        printable: "receipt-content",
        type: "html",
        documentTitle: "RestuPos",
        css: "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css", 
      });

      setIsReceiptVisible(false);
    }
  };

  const toggleReceiptVisibility = () => {
    setIsReceiptVisible((prev) => !prev);
  };

// search food
  const filteredFoodData = foodData.filter((food) =>
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="text" className="flex flex-col md:flex-row h-screen w-full bg-gray-400">
      {/* Left Column - Food Menu */}
      <div className="w-full md:w-1/2 p-4 bg-gray-200 overflow-y-auto">
        <div className="grid justify-center items-center gap-5 mb-5">
          <h1 className="text-xl font-bold text-center">Food Menu</h1>
          <label className="input input-bordered flex items-center gap-2 px-10 bg-white text-black w-full sm:w-auto">
            <input
              type="text"
              className="grow"
              placeholder="Search food"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </label>
        </div>
        {filteredFoodData.map((food) => (
          <div
            key={food._id}
            className="flex items-center justify-between p-3 bg-white shadow-md mb-3 rounded-md"
          >
            <div className="flex items-center">
              <img
                src={food.foodPhoto}
                alt={food.foodName}
                className="w-16 h-16 rounded-md mr-4"
              />
              <div>
                <h2 className="text-lg font-medium">{food.foodName}</h2>
                <p className="text-sm text-gray-600">{food.foodLavel}</p>
                <p className="text-sm text-gray-800">{food.foodPrice} Tk</p>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleAddToReceipt(food)}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Right Column - Order Receipt */}
      <div
        id="receipt-content"
        className="w-full md:w-1/2 p-4 bg-white overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl flex justify-center mx-auto font-bold">
            Order Receipt
          </h1>
          <button
            onClick={toggleReceiptVisibility}
            className="text-gray-500 text-2xl md:hidden"
          >
            {isReceiptVisible ? "↓" : "↑"}
          </button>
        </div>
        {isReceiptVisible && orderList.length === 0 && (
          <p className="text-center text-gray-500">No food in receipt</p>
        )}
        {isReceiptVisible && orderList.length > 0 && (
          <>
            <ul>
              {orderList.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-3 p-2 border-b"
                >
                  <span>{item.foodName}</span>
                  <div className="flex items-center gap-4">
                    <span>{item.foodPrice} Tk</span>
                    <button
                      className="text-red-500 px-4 py-2 rounded-md"
                      onClick={() => handleRemoveItem(index)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 p-3 bg-gray-100 border-t flex justify-between">
              <span className="text-lg font-medium">Total Price:</span>
              <span className="text-lg font-bold">{totalPrice} Tk</span>
            </div>
            <div className="flex gap-5 m-5 justify-end">
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-md"
                onClick={handleClearAll}
                disabled={orderList.length === 0}
              >
                Clear All
              </button>
              <button
                onClick={handleOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Confirm Order
              </button>
              <button
                onClick={handlePrint}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Print
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;
