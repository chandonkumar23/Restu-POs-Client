// import { Toaster } from "react-hot-toast";


// /* eslint-disable react/prop-types */
// const FoodMenuCard = ({ food }) => {
//   const { foodName, foodPrice, foodPhoto, foodLavel, foodStatus} = food;
//   const order = {foodName,foodPrice}
//   const handleOrder = () =>{
//     fetch('https://restupos-server.vercel.app/Order',{
//         method: 'POST',
//         headers:{
//             'content-type': "application/json"
//         },
//         body: JSON.stringify(order),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       if (data.insertedId)
//         <Toaster position="top-center" reverseOrder={true} />;
//     });
//   }
//   return (
//     <div>
//       <div>
//         <div className="overflow-x-auto">
//           <table className="table">
//             {/* head */}
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Food</th>
//                 <th>price</th>
//                 <th>status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <th>
//                   <label>
//                     <input onClick={handleOrder} type="checkbox" className="checkbox" />
//                   </label>
//                 </th>
//                 <td>
//                   <div className="flex items-center gap-3">
//                     <div className="avatar">
//                       <div className="mask mask-squircle h-12 w-12">
//                         <img
//                           src={foodPhoto}
//                           alt="Avatar Tailwind CSS Component"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="font-bold">{foodName}</div>
//                       <div className="text-sm opacity-50">{foodLavel}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   {foodPrice}TK
//                   <br />
//                 </td>

//                 <th>
//                   <button className="btn btn-ghost btn-xs">{foodStatus}</button>
//                 </th>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodMenuCard;
