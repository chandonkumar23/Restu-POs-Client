import { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { LuLogOut } from "react-icons/lu";
import { FaUser, FaCog, FaTable, FaChartLine, FaHome } from "react-icons/fa";
import { BiFoodMenu, BiPurchaseTag } from "react-icons/bi";

import userAdmin from "../userAdmin";

const Sidebar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const [isAdmin] = userAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error));
  };


  const isActiveLink = (link) => pathname.includes(link);
  return (
    <div className="flex overflow-auto lg:flex">
      <aside
        className={`flex flex-col w-64 h-screen px-5 py-2 overflow-y-auto bg-white border-r dark:bg-gray-900 dark:border-gray-700 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "block" : "hidden lg:block"}`}
      >
        <Link to={"OpenPage/profile"}>
          <div className="flex items-center gap-2 border-gray-500 justify-center avatar">
            <div className="w-10 border-2 border-blue-600 rounded-full flex">
              <img className="" src={user?.photoURL} alt="user-profile" />
            </div>
            <h3 className="text-white">{user?.displayName}</h3>
          </div>
        </Link>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <hr />
          <nav className="-mx-3 space-y-6">
            {/* Links for Admin */}
            {isAdmin ? (
              <>
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  Analytics
                </label>
                <Link
                  to="OpenPage/Account"
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/Account") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <FaUser className="mr-2" />
                  <span className="text-sm font-medium">Account</span>
                </Link>
                <Link
                  to="OpenPage/alluser"
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/alluser") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <FaCog className="mr-2" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>
                <Link
                  to="OpenPage/purches"
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/purches") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <BiPurchaseTag className="mr-2" />
                  <span className="text-sm font-medium">Purchase</span>
                </Link>
                <Link
                  to="OpenPage/FoodMenu"
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/FoodMenu") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <BiFoodMenu className="mr-2" />
                  <span className="text-sm font-medium">Food Menu & Order</span>
                </Link>
                <Link
                  to="OpenPage/Order"
                  className={`flex items-center px-3 py-1 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/Order") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <FaTable className="mr-2" />
                  <span className="text-sm font-medium">Check Orders</span>
                </Link>
                <Link
                  to="OpenPage/allOrder"
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/allOrder") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <FaTable className="mr-2" />
                  <span className="text-sm font-medium">Orders Report</span>
                </Link>
                <Link
                  to="OpenPage/purchaseReport"
                  className={`flex items-center px-3 py-1 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/purchaseReport") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <FaChartLine className="mr-2" />
                  <span className="text-sm font-medium">Purchase Report</span>
                </Link>
                <Link
                  to="OpenPage/AddFood"
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/AddFood") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <BiFoodMenu className="mr-2" />
                  <span className="text-sm font-medium">Add Food</span>
                </Link>
                <Link
                  to="OpenPage/Monitoring"
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/Monitoring") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <FaChartLine className="mr-2" />
                  <span className="text-sm font-medium">Monitoring</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="OpenPage/purches"
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/purches") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <BiPurchaseTag className="mr-2" />
                  <span className="text-sm font-medium">Purchase</span>
                </Link>
                <Link
                  to="OpenPage/FoodMenu"
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/FoodMenu") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <BiFoodMenu className="mr-2" />
                  <span className="text-sm font-medium">Food Menu & Order</span>
                </Link>
                <Link
                  to="OpenPage/Order"
                  className={`flex items-center px-3 py-1 transition-colors duration-300 transform rounded-lg ${isActiveLink("OpenPage/Order") ? "bg-white text-black" : "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
                >
                  <FaTable className="mr-2" />
                  <span className="text-sm font-medium">Check Orders</span>
                </Link>
              </>
            )}
            <Link
              to="/"
              className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg  "text-gray-600 dark:text-gray-200"} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700`}
            >
              <FaHome className="mr-2" />
              <span className="text-sm font-medium">Home</span>
            </Link>
          </nav>
        </div>

        <hr />
        {/* Logout/Login Button */}
        {user ? (
          <button
            onClick={handleLogOut}
            className="btn bg-black text-white mt-2 w-full flex items-center justify-center"
          >
            Log Out
            <LuLogOut className="ml-2" />
          </button>
        ) : (
          <Link
            to={"/login"}
            className="w-full text-center mt-2 text-white bg-black py-2 rounded-lg"
          >
            Login
          </Link>
        )}
      </aside>


      <div
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-4 left-4 z-50 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="w-full h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
