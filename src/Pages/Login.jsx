import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const{signin} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const handleLogin = (event)=>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email,password);
    signin(email, password)
   .then(result => {
    const user = result.user;
    console.log(user);
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Login Succcess",
      showConfirmButton: false,
      timer: 1500
    });
    navigate(from, {replace: true});
   })
   .catch(error => console.log(error));
    
  }
  return (
    <div className="m-20 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      {/* Background Image */}

      {/* Content Section */}
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-center lg:text-2xl 2xl:text-2xl">
              <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
              RestuPOS.
              </span>
              <span className="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
                  System
              </span>
            </h1>

        {/* Welcome Message */}
        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>

        {/* Google Sign-In */}
        

        {/* Divider */}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <a
            href="#"
            className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            Login with email password
          </a>
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
        </div>

        {/* Email Input */}
       <form onSubmit={handleLogin} action="">
       <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="LoggingEmailAddress"
          >
            Email Address
          </label>
          <input
            id="LoggingEmailAddress"
            type="email"
            name="email"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="loggingPassword"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
            >
              Forget Password?
            </a>
          </div>
          <input
            id="loggingPassword"
            type="password"
            name="password"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Sign In Button */}
        <div className="mt-6">
          <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Sign in
          </button>
        </div>
       </form>

        {/* Sign Up Option */}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <a
            href="#"
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            <Link to={"/signing"}> or sign up</Link>
          </a>
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
      <div
        className="hidden bg-cover lg:block lg:w-1/2 opacity-90"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/8Y0GzwZ/img4-69ad242593.webp')",
        }}
      ></div>
    </div>
  );
};

export default Login;
