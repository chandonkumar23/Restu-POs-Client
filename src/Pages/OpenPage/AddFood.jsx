import Swal from "sweetalert2";

const AddFood = () => {
  const handleAdd = (event) => {
    event.preventDefault();
    const form = event.target;
    const foodName = form.foodName.value;
    const foodPrice = form.foodPrice.value;
    const foodPhoto = form.foodPhoto.value;
    const foodType = form.foodType.value;
    const foodStatus = form.foodStatus.value;
    const foodLavel = form.foodLavel.value;
    console.log(
      foodName,
      foodPrice,
      foodPhoto,
      foodType,
      foodStatus,
      foodLavel
    );
    const newFood = {foodName,foodPrice,foodPhoto,foodType,foodStatus, foodLavel};
    fetch('https://restupos-server-riteex18o-chandon-kumar.vercel.app/addFood',{
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFood)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.insertedId){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfuly added",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }


  return (
    <div>
      <h1 className="text-5xl m-2 font-extrabold text-center">Add Food</h1>
      <div className=" w-[700px] p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleAdd} className="mt-6">
          {/* Username Field */}
          <div className="flex gap-5">
            <div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Food name
                </label>
                <input
                  type="text"
                  id="text"
                  name="foodName"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              {/* Password Field */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Food photo
                  </label>
                </div>
                <input
                  type="text"
                  id="text"
                  placeholder="Type hare photo link"
                  name="foodPhoto"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Food price
                </label>
                <input
                  type="number"
                  id="text"
                  name="foodPrice"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              {/* Password Field */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Status
                  </label>
                </div>
                <input
                  type="text"
                  id="text"
                  name="foodStatus"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Food lavel
                </label>
                <input
                  type="text"
                  id="text"
                  name="foodLavel"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              {/* Password Field */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="text"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Food type
                  </label>
                </div>
                <input
                  type="text"
                  id="text"
                  name="foodType"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
          </div>

          {/* Sign-In Button */}
          <div className="mt-6">
            <button
              type="submit"
              className=" bg-blue-700 w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
