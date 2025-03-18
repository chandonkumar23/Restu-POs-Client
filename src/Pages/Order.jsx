import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";

const Order = () => {
  const { user } = useContext(AuthContext);
  const [myOrders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      console.log("Fetching orders for:", user.email); // Debugging

      fetch(`https://restupos-server.vercel.app/Order?email=${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("API Response:", data); // Debugging

          if (!Array.isArray(data)) {
            console.error("Invalid data format received:", data);
            setOrders([]); // Set an empty array to avoid crashes
            setLoading(false);
            return;
          }

          setOrders(data);

          let total = 0;
          data.forEach((order) => {
            if (order.orderList) {
              order.orderList.forEach((item) => {
                const foodPrice = parseFloat(item.foodPrice) || 0;
                total += foodPrice;
              });
            }
          });

          setTotalPrice(total);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-500 to-indigo-600 rounded-3xl p-8 text-white shadow-lg mb-8">
        <h1 className="text-3xl font-extrabold mb-4 text-center">Your Orders</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-semibold">
              Total Orders: <span className="text-3xl font-bold">{myOrders.length}</span>
            </h2>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              Total Price: <span className="text-3xl font-bold">{totalPrice.toFixed(2)} Tk</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Orders Table Section */}
      {myOrders.length === 0 ? (
        <p className="text-center text-lg text-red-600">You have no orders today.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="table-auto w-full border-separate border-spacing-0">
            {/* Table Head */}
            <thead className="bg-indigo-600 text-white rounded-t-lg">
              <tr>
                <th className="p-4 text-left">Order Code</th>
                <th className="p-4 text-left">Total Items</th>
                <th className="p-4 text-left">Order Total</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {myOrders.map((order) => {
                const totalOrderPrice = order.orderList?.reduce(
                  (sum, item) => sum + (parseFloat(item.foodPrice) || 0),
                  0
                ) || 0;
                return (
                  <tr key={order._id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="p-4 border-t border-b border-gray-200">{order._id}</td>
                    <td className="p-4 border-t border-b border-gray-200 text-center">{order.orderList?.length || 0}</td>
                    <td className="p-4 border-t border-b border-gray-200">{totalOrderPrice.toFixed(2)} Tk</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
