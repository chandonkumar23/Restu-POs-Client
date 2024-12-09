import { createBrowserRouter } from "react-router-dom";
import Main from "../src/Layout/Main";
import Login from "../src/Pages/Login";
import Signup from "../src/Pages/Signup";
import Home from "../src/Pages/Home";
import Services from "../src/Pages/services";
import Jobs from "../src/Pages/jobs";
import About from "../src/Pages/about";
import Expriet from "../src/Pages/expriet";
import OpenPage from "../src/Pages/OpenPage";
import AddFood from "../src/Pages/OpenPage/AddFood";
import ConfrimOrder from "../src/Pages/ConfrimOrder";
import FoodMenu from "../src/Pages/FoodMenu";
import Account from "../src/Pages/Account";
import PrivetRoute from "./PrivetRoute";
import Secret from "../src/Secret";
import Upcoming from "../src/Pages/Upcoming";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <PrivetRoute><Home></Home></PrivetRoute>,
      },
      {
        path: "service",
        element: <Services></Services>,
      },
      {
        path: "jobs",
        element: <Jobs></Jobs>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "exprit",
        element: <Expriet></Expriet>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signing",
        element: <Signup></Signup>,
      },
      {
        path : "OpenPage",
        element: <PrivetRoute><OpenPage></OpenPage></PrivetRoute>
      },
      {
        path: 'secret',
        element:<PrivetRoute><Secret></Secret></PrivetRoute>
      }
      
    ],
  },
  {
   path:'OpenPage',
   element:<PrivetRoute><OpenPage></OpenPage></PrivetRoute>,
   children:[
    {
      path:'OpenPage/FoodMenu',
      element:<FoodMenu></FoodMenu>,
      loader: () => fetch('https://restupos-server-riteex18o-chandon-kumar.vercel.app/addFood')
    },
    {
      path: 'OpenPage/AddFood',
      element: <AddFood></AddFood>
    },
    {
      path: 'OpenPage/ConfrimOrder',
      element:<ConfrimOrder></ConfrimOrder>
    },
    {
      path: 'OpenPage/Account',
      element:<Account></Account>
    },
   {
     path: 'OpenPage/upcoming',
     element:<Upcoming></Upcoming>
   }
   ]
   
  }
]);
export default router;
