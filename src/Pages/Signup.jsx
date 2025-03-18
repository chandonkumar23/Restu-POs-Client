import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import UserAxios from "../../routes/UserAxios";
import { getAuth, sendEmailVerification } from "firebase/auth"; // Firebase v9+

const Signup = () => {
  const axiosUser = UserAxios();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [signingError, setSigningError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSignin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.userName.value;
    const lastName = form.lastName.value;
    const phone = form.phoneNumber.value;
    const email = form.email.value;
    const password = form.password.value;
    const storeId = form.storeId.value;

    setSigningError("");

    try {
      let photoURL = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=6a923dda0f0f06e05fe09a793b7644da`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        if (result.success) {
          photoURL = result.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Create the user
      const result = await createUser(email, password);
      const user = result.user;

      // Check if the user was successfully created
      if (!user) {
        throw new Error("User creation failed");
      }

      await updateUserProfile(name, photoURL);

      const userInfo = {
        name,
        lastName,
        phone,
        email,
        photo: photoURL,
        storeId
        
      };

      // Save user info to the database
      const res = await axiosUser.post("/usInfo", userInfo);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Sign Up Success",
          showConfirmButton: false,
          timer: 1500,
        });

        // Send email verification
        const auth = getAuth(); // Get auth instance
        const currentUser = auth.currentUser; // Get the current authenticated user
        if (currentUser) {
          await sendEmailVerification(currentUser); // Send email verification
          Swal.fire({
            position: "top-center",
            icon: "info",
            title: "Verification Email Sent",
            text: "Please check your inbox to verify your email address.",
            showConfirmButton: true,
          });
        } else {
          throw new Error("No authenticated user found after sign-up");
        }
      }

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setSigningError(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col w-full lg:w-2/3 p-8 bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Sign up for RestuPOS.System
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Let’s get you all set up to verify your personal account and create your profile.
          </p>

          <form onSubmit={handleSignin} className="grid gap-6">
            <input
              className="p-3 rounded-md border"
              type="text"
              placeholder="User Name"
              name="userName"
            />
            <input
              className="p-3 rounded-md border"
              type="text"
              placeholder="Last Name"
              name="lastName"
            />
            <input
              className="p-3 rounded-md border"
              type="number"
              placeholder="Phone Number"
              name="phoneNumber"
            />
            <input
              className="p-3 rounded-md border"
              type="number"
              placeholder="Store id"
              name="storeId"
            />
            <input
              className="p-3 rounded-md border"
              type="email"
              placeholder="Email Address"
              name="email"
            />
            <input
              className="p-3 rounded-md border"
              type="number"
              placeholder="Password"
              name="password"
            />
            <div>
              <input
                className="p-3 rounded-md border w-full"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 transition">
              Sign Up
            </button>
          </form>
          {signingError && <p className="text-red-500 mt-4">{signingError}</p>}
        </div>
        <div className="hidden lg:block lg:w-1/3 bg-gray-100 dark:bg-gray-700">
          <img
            src="https://i.ibb.co.com/F4r6Yq9/homepage-hero-copy.webp"
            alt="Signup Promotion"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;
