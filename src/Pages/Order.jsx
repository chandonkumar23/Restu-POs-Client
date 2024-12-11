
import { useLoaderData } from "react-router-dom";
import OrderCard from "./OrderCard";

const Order = () => {
  const orderData = useLoaderData();
  return (
    <div>
      
      <div className=" bg-blue-400 text-center rounded-2xl ">
        <div className="stat">
          <div className="stat-title text-white">Total order</div>
          <div className="stat-value text-white">{orderData.length}</div>
          <div className="stat-desc text-white">21% more than last month</div>
        </div>
      </div>
      <h1 className="text-2xl text-center m-2 font-bold">Order History</h1>
      {orderData.map((order) => (
        <OrderCard key={order._id} order={order}></OrderCard>
      ))}
    </div>
  );
};

export default Order;
