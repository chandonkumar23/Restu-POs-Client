/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Attendance from "../Attendes";
import Calender from "../Calender";



const Monitoring = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
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

  // Calculate sales and orders grouped by sellers
  const calculateSellerStats = (orders) => {
    const stats = {};
  
    orders.forEach((order) => {
      const seller = order.userEmail; // Move this here before accessing seller in map
  
      if (!stats[seller]) {
        stats[seller] = { sellerName: order.name, totalSales: 0, totalOrders: 0 };
      }
  
      // Map through orderList to calculate sales and orders
      order.orderList.map((item) => {
        const foodPrice = parseFloat(item.foodPrice) || 0; // Ensure proper handling of foodPrice
        stats[seller].totalSales += foodPrice; // Add to total sales
        stats[seller].totalOrders += 1; // Increment order count
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

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Seller Sales Data</h2>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            <th className="border border-gray-300 px-4 py-2">Seller Name</th>
          
            <th className="border border-gray-300 px-4 py-2">Total Sales</th>
            <th className="border border-gray-300 px-4 py-2">Total Food</th>
          </tr>
        </thead>
        <tbody>
          {data.map((seller, index) => (
            <tr key={index} className="text-gray-700">
              <td className="border border-gray-300 px-4 py-2">{seller.sellerName}</td>
              
              <td className="border border-gray-300 px-4 py-2">{seller.totalSales.toFixed(2)} Tk</td>
              <td className="border border-gray-300 px-4 py-2">{seller.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
     <Attendance></Attendance>
     <Calender></Calender>
    </div>
  );
};

export default Monitoring;
