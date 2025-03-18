/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AllProducts = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://restupos-server.vercel.app/addFood");
      if (!response.ok) {
        throw new Error("Failed to fetch food items");
      }
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(
          `https://restupos-server.vercel.app/addFood/${id}`, 
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          Swal.fire("Deleted!", "The food item has been deleted.", "success");
          fetchFoods(); 
        } else {
          throw new Error("Failed to delete food item");
        }
      } catch (error) {
        console.error("Error deleting food item:", error);
        Swal.fire("Error!", "Failed to delete the food item.", "error");
      }
    }
  };

  // Update food item
  const handleUpdate = async (id) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Food Item",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Food Name">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Price">`,
      focusConfirm: false,
      preConfirm: () => {
        const foodName = document.getElementById("swal-input1").value;
        const foodPrice = document.getElementById("swal-input2").value;
        return { foodName, foodPrice };
      },
    });
  
    if (formValues) {
      try {
        const response = await fetch(
          `https://restupos-server.vercel.app/addFood/${id}`, // Ensure this matches your backend route
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              foodName: formValues.foodName,
              foodPrice: formValues.foodPrice,
            }),
          }
        );
  
        if (!response.ok) {
          const errorResponse = await response.json(); // Log the error response
          console.log("Error updating:", errorResponse);
          throw new Error("Failed to update food item");
        }
  
        Swal.fire("Updated!", "The food item has been updated.", "success");
        fetchFoods(); // Refresh the food list
      } catch (error) {
        console.error("Error updating food item:", error);
        Swal.fire("Error!", "Failed to update the food item.", "error");
      }
    }
  };
  

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold text-center mb-6">All Food Items</h1>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b text-sm md:text-base">Food Name</th>
              <th className="px-4 py-2 border-b text-sm md:text-base">Price</th>
              <th className="px-4 py-2 border-b text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-sm md:text-base">{food.foodName}</td>
                <td className="px-4 py-2 border-b text-sm md:text-base">{food.foodPrice} Tk</td>
                <td className="px-4 py-2 border-b text-sm md:text-base">
                  {/* Flexbox for buttons */}
                  <div className="flex flex-col sm:flex-row sm:space-x-2 sm:space-y-0 space-y-2">
                    <button
                      onClick={() => handleUpdate(food._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  
  );
};

export default AllProducts;
