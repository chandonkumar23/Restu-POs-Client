import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { LuLogOut } from "react-icons/lu";
const Sidebar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Succcesfuly logout",
          showConfirmButton: false,
          timer: 1500,
        });
      })

      .catch((error) => console.log(error));
  };
  const navItems = [
    {
      label: "analytics",
      links: [
        {
          to: "OpenPage/upcoming",
          icon: "M16 7v10m-8 0V7m12 0a2 2 0 00-2-2H6a2 2 0 00-2 2m16 0a2 2 0 012 2v8a2 2 0 01-2 2M2 9a2 2 0 012-2m0 10a2 2 0 002 2h8m2 2a2 2 0 002-2m0-10a2 2 0 00-2-2H6",
          name: "Purchase",
        },
        {
          to: "OpenPage/upcoming",
          icon: "M16 7v10m-8 0V7m12 0a2 2 0 00-2-2H6a2 2 0 00-2 2m16 0a2 2 0 012 2v8a2 2 0 01-2 2M2 9a2 2 0 012-2m0 10a2 2 0 002 2h8m2 2a2 2 0 002-2m0-10a2 2 0 00-2-2H6",
          name: "Manage purchase",
        },
        {
          to: "OpenPage/FoodMenu",
          icon: "M16 7v10m-8 0V7m12 0a2 2 0 00-2-2H6a2 2 0 00-2 2m16 0a2 2 0 012 2v8a2 2 0 01-2 2M2 9a2 2 0 012-2m0 10a2 2 0 002 2h8m2 2a2 2 0 002-2m0-10a2 2 0 00-2-2H6",
          name: "Food Menu",
        },
      
        {
          to: "OpenPage/Order",
          icon: "M12 6.253v13M6 8l6-6 6 6",
          name: "Order report",
        },
      ],
    },
    {
      label: "content",
      links: [
        {
          to: "OpenPage/AddFood",
          icon: "M12 4v16m8-8H4",
          name: "Add Food",
        },
        
        {
          to: "OpenPage/Account",
          icon: "M9 12l2 2 4-4m-7 7h4m4 0h1m-9-5H4m0 4h3",
          name: "Account",
        },
      ],
    },
    {
      label: "customization",
      links: [
        {
          to: "/",
          icon: "M5 13l4 4L19 7",
          name: "Home",
        },
        {
          to: "OpenPage/upcoming",
          icon: "M12 8v8m-4-4h8m0-4a9 9 0 11-8 0",
          name: "Settings",
        },
      ],
    },
  ];

  const renderLinks = (links) =>
    links.map((link, index) => (
      <Link
        key={index}
        to={link.to}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
        </svg>
        <span className="mx-2 text-sm font-medium">{link.name}</span>
      </Link>
    ));

  return (
    <div>
      <div className="flex lg:flex gap-20">
        <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-center gap-2 border-gray-500  justify-center avatar ">

           
            <div className="w-10 border-2 border-blue-600 rounded-full flex"> 
              <img className="" src={user?.photoURL} />  
             
           </div>       
           <h3 className="text-white">{user?.displayName}</h3>
            
          </div>
          
          <div className="flex flex-col justify-between flex-1 mt-6">
            <hr />
            <nav className="-mx-3 space-y-6">
              {navItems.map((section, index) => (
                <div key={index} className="space-y-3">
                  <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                    {section.label}
                  </label>
                  {renderLinks(section.links)}
                </div>
              ))}
            </nav>
          </div>
          <hr />
          {user ? (
            <>
              <button onClick={handleLogOut} className="btn bg-black text-white mt-2">
                Log Out<LuLogOut />
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
            </>
          )}
          
        </aside>
        
        <div className="w-full h-full">
          <Outlet />
          
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
