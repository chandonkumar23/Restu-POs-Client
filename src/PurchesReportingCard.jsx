/* eslint-disable react/prop-types */
import { useState } from "react";

const PurchesReportingCard = ({ items }) => {
  const { PurchesName, Quentity, Price, Invoice, Supplier, Date, Paid, Due } = items || {};

  const [isPaid, setIsPaid] = useState(Due === 0); 

  // Handle Paid/Unpaid button toggle
  const handlePaidToggle = () => {
    setIsPaid(!isPaid);
  };

  return (
    <div className="w-full overflow-x-auto shadow-lg rounded-lg bg-white mb-6">
      <table className="w-full table-auto border-separate border-spacing-0">
        {/* Table Header */}
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
          <tr>
            <th className="px-6 py-3 text-left">
              <input type="checkbox" className="checkbox rounded-md border-gray-300" />
            </th>
            <th className="px-6 py-3 text-left">Purchase Name</th>
            <th className="px-6 py-3 text-left">Product Info</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Paid</th>
            <th className="px-6 py-3 text-left">Due</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr className="border-b hover:bg-gray-50 transition-all duration-200">
            <td className="px-6 py-3">
              <input type="checkbox" className="checkbox rounded-md border-gray-300" />
            </td>
            <td className="px-6 py-3">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-lg text-gray-800">
                  {PurchesName} (<span className="text-sm text-gray-500">{Quentity}</span>)
                </div>
                <div className="text-sm text-gray-500">{Invoice}</div>
              </div>
            </td>
            <td className="px-6 py-3">
              <div>
                <h2 className="font-semibold text-gray-800">{Date}</h2>
                <h3 className="text-sm text-gray-500">{Supplier}</h3>
              </div>
            </td>
            <td className="px-6 py-3 font-semibold text-lg text-gray-800">{Price} Tk</td>
            <td className="px-6 py-3 font-semibold text-lg text-green-400">{Paid} Tk</td>
            <td className="px-6 py-3 font-semibold text-lg text-red-500">{Due} Tk</td>
            <td className="px-6 py-3 text-center">
              <button
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 
                ${isPaid ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} 
                text-white shadow-md`}
                onClick={handlePaidToggle}
              >
                {isPaid ? "Paid" : "Unpaid"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PurchesReportingCard;
