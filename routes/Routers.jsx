import { createBrowserRouter } from "react-router-dom";
import Main from "../src/Layout/Main";
import Login from "../src/Pages/Login";
import Signup from "../src/Pages/Signup";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
          path:'login',
          element:<Login></Login>
        },
        {
          path:'signing',
          element:<Signup></Signup>
        }
      ]
    },
   
  ]);
export default router;
