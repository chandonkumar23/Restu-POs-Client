import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from './Provider/AuthProvider/AuthProvider';

const Purchase = () => {
  const { user } = useContext(AuthContext);
  const users = user.displayName;

  // State to manage Price, Paid, and Due
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(0);
  const [due, setDue] = useState(0);

  // Handle price input change
  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setPrice(value);
    setDue(value - paid); // Calculate the due based on price
  };

  // Handle paid input change
  const handlePaidChange = (e) => {
    const value = parseFloat(e.target.value);
    setPaid(value);
    setDue(price - value); // Calculate the due based on price and paid
  };

  const handlePurches = (event) => {
    event.preventDefault();
    const form = event.target;
    const PurchesName = form.productName.value;
    const Quentity = form.Quentity.value;
    const Invoice = form.Invoice.value;
    const Supplier = form.Supplier.value;
    const Date = form.date.value;

    const PurchesData = {
      PurchesName,
      Quentity,
      Price: price,
      Invoice,
      Supplier,
      Date,
      users,
      Paid: paid,
      Due: due,
    };
    console.log(PurchesData);

    fetch("https://restupos-server.vercel.app/addPurches", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(PurchesData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center my-5">
        Purchase Products
      </h1>
      <div className="w-full max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handlePurches} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="Quentity"
                className="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Quentity
              </label>
              <input
                type="text"
                id="Quentity"
                name="Quentity"
                placeholder="Quentity"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="Price"
                className="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Price
              </label>
              <input
                type="number"
                id="Price"
                name="Price"
                value={price}
                onChange={handlePriceChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="Invoice"
                className="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Invoice
              </label>
              <input
                type="text"
                id="Invoice"
                name="Invoice"
                placeholder="# 00-0000"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="Supplier"
                className="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Supplier
              </label>
              <input
                type="text"
                id="Supplier"
                name="Supplier"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Paid input */}
            <div>
              <label
                htmlFor="Paid"
                className="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Paid
              </label>
              <input
                type="number"
                id="Paid"
                name="Paid"
                value={paid}
                onChange={handlePaidChange}
                className="block w-full px-4 py-2 mt-2 text-green-500 bg-white border rounded-lg dark:bg-gray-800 dark:text-green-500 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Due input */}
            <div>
              <label
                htmlFor="Due"
                className="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Due
              </label>
              <input
                type="number"
                id="Due"
                name="Due"
                value={due}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-red-500 bg-white border rounded-lg dark:bg-gray-800 dark:text-red-500 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Purchase;
