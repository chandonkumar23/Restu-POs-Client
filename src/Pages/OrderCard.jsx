/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import CheckOrderCard from "./CheckOrderCard";

const OrderCard = ({ order }) => {
  const { _id, orderList } = order || {};
  console.log(_id, orderList);

  return (
    <div>
        
       <div className="bg-blue-400 rounded-lg m-2 flex ">
        <h1 className="text-white m-2">Total order: {orderList.length}</h1>
        <h1 className="text-white m-2">Order Code: {order._id}</h1>
        
       </div>
      {orderList.map((orders) => (
        <CheckOrderCard key={_id} orders={orders}></CheckOrderCard>
      ))}
    </div>
  );
};

export default OrderCard;
