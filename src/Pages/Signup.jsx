import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import UserAxios from "../../routes/UserAxios";

const Signup = () => {
  const axiosUser = UserAxios();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [signingError, setSigningError] = useState("");
  const handleSignin = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.userName.value;
    const lastName = form.lastName.value;
    const phone = form.phoneNumber.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    console.log(name, lastName, phone, email, password, photo);

    setSigningError("");
    createUser(email, password)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        updateUserProfile(name, photo).then(() => {
          const userInfo = {
            name,
            phone,
            email,
            photo,
          };
          axiosUser.post("/usInfo", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Sign Up Succcess",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        });

        navigate(from, { replace: true });
      })

      .catch((error) => {
        console.log(error);
        setSigningError(error.message);
      });
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className=" m-5 flex justify-center min-h-screen">
        {/* Background Image */}
        <div
          className="hidden bg-cover lg:block lg:w-2/5 rounded-r-2xl rounded-l-lg"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/F4r6Yq9/homepage-hero-copy.webp')",
          }}
        ></div>

        {/* Form Section */}
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Sign up on the RestuPOS.System
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            {/* Account Type Buttons */}
            <div className="mt-6">
              <div className="mt-3 md:flex md:items-center md:-mx-2"></div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSignin}
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
            >
              <input
                className="p-3 rounded-md"
                label="Name"
                type="text"
                placeholder="User Name"
                name="userName"
              />
              <input
                className="p-3 rounded-md"
                label="Last Name"
                type="text"
                placeholder="Last Name"
                name="lastName"
              />
              <input
                className="p-3 rounded-md"
                label="Phone Number"
                type="number"
                placeholder="01xxxxxxxxx"
                name="phoneNumber"
              />
              <input
                className="p-3 rounded-md"
                label="Email Address"
                type="email"
                placeholder="johnsnow@example.com"
                name="email"
              />
              <input
                className="p-3 rounded-md"
                label="Password"
                type="password"
                placeholder="Enter your password"
                name="password"
              />
              <input
                className="p-3 rounded-md"
                label="Password"
                type="text"
                placeholder="Enter your photo link"
                name="photo"
              />

              {/* Submit Button */}
              <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Sign Up</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            {signingError && <p className="text-red-500">{signingError}</p>}
            <div>
              <h1 className="text-center m-10">
                Already have an account{" "}
                <span className="text-blue-500">
                  <Link to={"/login"}>Login</Link>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
