/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { FaRegCopy } from "react-icons/fa6";

import CheckOrderCard from "./CheckOrderCard";

const OrderCard = ({ order }) => {
  const { _id, orderList } = order || {};
 

  return (
    <div> 
       <div className=" sm:block bg-blue-500 rounded-lg m-2  ">
        <h1 className="text-white m-2">Total food in this order : <span className="font-bold text-blue-700">{orderList.length}</span></h1>
        <h1 className="text-white m-2 flex items-center gap-2">Order Code : <span className="font-bold text-blue-700">{order._id}</span><FaRegCopy /></h1>  
       </div>
      {orderList.map((orders) => (
        <CheckOrderCard key={_id} orders={orders}></CheckOrderCard>
      ))}
    </div>
  );
};

export default OrderCard;
