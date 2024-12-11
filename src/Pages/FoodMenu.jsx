/* eslint-disable no-unused-vars */
import React, { useState,useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";

const FoodMenu = () => {
  const [orderList, setOrderList] = useState([]);

  const foodData = useLoaderData();
  const printRef = useRef();
  //handlePrint
  const handlePrint = useReactToPrint({
    content: ()=> printRef.current,
  });

 
  //handle order
  const handleOrder = () =>{
    const orderData = {orderList}
    fetch('https://restupos-server.vercel.app/Order',{
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data =>{
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Order confrimed",
        showConfirmButton: false,
        timer: 1500
      });
    })

  }
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

  return (
    <div className="flex h-screen w-[1000px] bg-gray-400 ">
      {/* Left Column - Food Menu */}
      <div className="w-1/2 p-4 bg-gray-200 overflow-y-auto">
        <div className="flex justify-center items-center gap-5 mb-5">
        <h1 className="text-xl font-bold ">Food Menu</h1>
        <label className="input input-bordered flex items-center gap-2 py-2 bg-white text-black">
  <input type="text" className="grow" placeholder="Search" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
        </div>
        {foodData.map((food) => (
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
      <div ref={printRef} className="w-1/2 p-4 bg-white overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Order Receipt</h1>
          <div className="flex gap-5"></div>
        </div>
        {orderList.length === 0 ? (
          <p className="text-gray-600">No items in the receipt</p>
        ) : (
          <>
            <ul>
              {orderList.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-3 p-2 border-b"
                >
                  <span>{item.foodName}</span>
                  <div className="flex items-center gap-4">
                    <span>{item.foodPrice}Tk</span>
                    <button
                      className="text-red-500 font-bold"
                      onClick={() => handleRemoveItem(index)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div  className="mt-4 p-3 bg-gray-100 border-t flex justify-between">
              <span className="text-lg font-medium">Total Price:</span>
              <span className="text-lg font-bold"> {totalPrice} Tk</span>
            </div>
            <div className="flex gap-5 m-5 justify-end">
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-md"
                onClick={handleClearAll}
                disabled={orderList.length === 0}
              >
                Clear All
              </button>
              <button onClick={handleOrder} className="bg-blue-600 text-white px-5 py-2 rounded-md">
                Confrim order
              </button>
              <button onClick={handlePrint} className="bg-blue-500 text-white px-5 py-2 rounded-md">
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
