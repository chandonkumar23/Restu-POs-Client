

import OrderCard from "./OrderCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";

const Order = () => {
  const {user} = useContext(AuthContext)
  const [myOrders,setOrders] = useState([])
  useEffect(() => {
    if (user?.email) {
      fetch(`https://restupos-server.vercel.app/Order?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [user]);

  return (
    <div>
      
      <div className=" bg-blue-500 text-center rounded-2xl ">
        <div className="stat">
          <div className="stat-title text-white">Total sells</div>
          <div className="stat-value text-white">{myOrders.length}</div>
          <div className="stat-desc text-white">21% more than last month</div>
        </div>
      </div>
      {
        myOrders.length === 0 ?(
          <p  className="text-center text-red-600"> You have no orders today.</p>
        ) : (
          <div>
            <h1 className="text-2xl text-center m-2 font-bold">Sells History</h1>
      {myOrders.map((order) => (
        <OrderCard key={order._id} order={order}></OrderCard>
      ))}
          </div>
        )
      }
      
    </div>
  );
};

export default Order;
