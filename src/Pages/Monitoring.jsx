/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Calender from "../Calender";

const Monitoring = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // You can change this number as per your requirement

  useEffect(() => {
    axios
      .get("https://restupos-server.vercel.app/allOrder")
      .then((response) => {
        const rawData = response.data;
        const sellerStats = calculateSellerStats(rawData);
        setData(sellerStats);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const calculateSellerStats = (orders) => {
    const stats = {};
  
    orders.forEach((order) => {
      const seller = order.userEmail; 
  
      if (!stats[seller]) {
        stats[seller] = { sellerName: order.name, totalSales: 0, totalOrders: 0 };
      }
  
      order.orderList.map((item) => {
        const foodPrice = parseFloat(item.foodPrice) || 0;
        stats[seller].totalSales += foodPrice;
        stats[seller].totalOrders += 1;
      });
    });
  
    return Object.values(stats);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading data...</p>;
  }

  if (!data.length) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Seller Sales Data:</h2>
  
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Seller Name</th>
              <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Total Sales</th>
              <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Total Food</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((seller, index) => (
              <tr key={index} className="text-gray-700">
                <td className="border border-gray-300 px-4 py-2">{seller.sellerName}</td>
                <td className="border border-gray-300 px-4 py-2">{seller.totalSales.toFixed(2)} Tk</td>
                <td className="border border-gray-300 px-4 py-2">{seller.totalOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-l-lg"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="mt-6">
        <hr />
        <br />
        <Calender />
      </div>
    </div>
  );
};

export default Monitoring;
