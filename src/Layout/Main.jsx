import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar";

const Main = () => {
  return (
 
    <div>
           <Navbar></Navbar>
           <Outlet></Outlet>
     

     

      {/* Footer */}
    </div>
  );
};

export default Main;
