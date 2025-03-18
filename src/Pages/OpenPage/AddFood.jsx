import { useState } from "react";
import Swal from "sweetalert2";

const AddFood = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=b3ca9f4f49ca02829747b656b56e1596`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        setUploading(false);
        return result.data.url; 
      } else {
        setUploading(false);
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setUploading(false);
      return null;
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const form = event.target;
    const foodName = form.foodName.value;
    const foodPrice = form.foodPrice.value;
    const foodType = form.foodType.value;
    const foodStatus = form.foodStatus.value;
    const foodLavel = form.foodLavel.value;

    try {

      const foodPhoto = await handleImageUpload();
      if (!foodPhoto) {
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: "Please try uploading the image again.",
        });
        return;
      }

      const newFood = {
        foodName,
        foodPrice,
        foodPhoto,
        foodType,
        foodStatus,
        foodLavel,
      };

      const response = await fetch("https://restupos-server.vercel.app/addFood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFood),
      });

      const data = await response.json();
      if (data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully added",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset(); 
        setImageFile(null); 
      }
    } catch (error) {
      console.error("Error adding food:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add food. Please try again.",
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl m-2 font-extrabold text-center">
        Add Food
      </h1>
      <div className="w-full sm:w-[600px] md:w-[700px] p-6 m-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleAdd} className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Food Name */}
            <div>
              <label htmlFor="foodName" className="block text-sm text-gray-800 dark:text-gray-200">
                Food name
              </label>
              <input
                type="text"
                id="foodName"
                name="foodName"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
            </div>

            {/* Food Photo */}
            <div>
              <label htmlFor="foodPhoto" className="block text-sm text-gray-800 dark:text-gray-200">
                Food photo
              </label>
              <input
                type="file"
                id="foodPhoto"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {uploading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}
            </div>

            {/* Other Fields */}
            <div>
              <label htmlFor="foodPrice" className="block text-sm text-gray-800 dark:text-gray-200">
                Food price
              </label>
              <input
                type="number"
                id="foodPrice"
                name="foodPrice"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="foodStatus" className="block text-sm text-gray-800 dark:text-gray-200">
                Status
              </label>
              <input
                type="text"
                id="foodStatus"
                name="foodStatus"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="foodLavel" className="block text-sm text-gray-800 dark:text-gray-200">
                Food level
              </label>
              <input
                type="text"
                id="foodLavel"
                name="foodLavel"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="foodType" className="block text-sm text-gray-800 dark:text-gray-200">
                Food type
              </label>
              <input
                type="text"
                id="foodType"
                name="foodType"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-700 w-full px-6 py-2.5 text-sm font-medium text-white rounded-lg hover:bg-blue-600"
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
