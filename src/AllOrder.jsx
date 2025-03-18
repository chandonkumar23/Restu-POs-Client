/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const AccountSection = () => {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    setLoading(true); // Show loading spinner
    fetch("https://restupos-server.vercel.app/allOrders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
          calculateTotalAmount(data);
        } else {
          console.error("Error: API response is not an array", data);
          setOrders([]);
        }
        setLoading(false); // Hide loading spinner
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]);
        setLoading(false); // Hide loading spinner
      });
  }, []);

  const calculateTotalAmount = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      const orderTotal = order.orderList.reduce(
        (sum, item) => sum + parseInt(item.foodPrice),
        0
      );
      total += orderTotal;
    });

    setTotalAmount(total);
    setTotalOrders(orders.length);
  };

  // Pagination calculations
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // Sort orders by date
  const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  // Change page
  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">All Orders</h1>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-medium mb-4 text-gray-700">Order Summary</h2>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Total Orders:</span>
          <span className="font-bold text-blue-600">{totalOrders}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium text-gray-600">Total Balance:</span>
          <span className="font-bold text-blue-600">{totalAmount} Tk</span>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <>
          {/* Orders List */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sortedOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              currentOrders.map((order, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-md border border-gray-300">
                  <h3 className="font-medium text-xl mb-2 text-gray-700">Order Date: {order.orderDate}</h3>
                  <ul className="space-y-2">
                    {order.orderList.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center text-gray-600">
                        <span>{item.foodName}</span>
                        <span>{item.foodPrice} Tk</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-right font-bold text-gray-700">
                    <span>Total Price: {order.orderList.reduce((sum, item) => sum + parseInt(item.foodPrice), 0)} Tk</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center items-center gap-3">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSection;
