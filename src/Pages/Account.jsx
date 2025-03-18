import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Account = () => {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    fetch("https://restupos-server.vercel.app/allOrders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
          calculateTotalAmount(data);
          prepareChartData(data);
        } else {
          console.error("API response is not an array", data);
          setOrders([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]);
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

  const prepareChartData = (orders) => {
    const chartLabels = [];
    const chartValues = [];
    orders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const monthYear = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
      const index = chartLabels.indexOf(monthYear);
      if (index !== -1) {
        chartValues[index] += order.orderList.reduce(
          (sum, item) => sum + parseInt(item.foodPrice),
          0
        );
      } else {
        chartLabels.push(monthYear);
        chartValues.push(
          order.orderList.reduce(
            (sum, item) => sum + parseInt(item.foodPrice),
            0
          )
        );
      }
    });

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "Total Amount Spent Per Month",
          data: chartValues,
          borderColor: "#36a2eb",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          tension: 0.4,
          pointBackgroundColor: "#36a2eb",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#36a2eb",
        },
      ],
    });

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#444",
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => `Tk ${context.raw}`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#444",
          },
        },
        y: {
          grid: {
            color: "#ddd",
          },
          ticks: {
            color: "#444",
          },
        },
      },
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      {/* Account Header */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-extrabold text-center mb-5 text-blue-600">
          Account Overview
        </h1>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold flex items-center">
            <span className="material-icons-outlined mr-2"></span>
            Total Orders: {totalOrders}
          </p>
          <p className="text-lg font-semibold flex items-center">
            <span className="material-icons-outlined mr-2"></span>
            Total Balance: {totalAmount} Tk
          </p>
        </div>
      </div>
      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Spending Over Time
        </h2>
        {chartData.labels && chartData.labels.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p className="text-gray-500 text-center">No data available for chart visualization</p>
        )}
      </div>
    </div>
  );
};

export default Account;
