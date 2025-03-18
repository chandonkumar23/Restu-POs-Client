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
import FoodMenu from "../src/Pages/FoodMenu";
import Account from "../src/Pages/Account";
import PrivetRoute from "./PrivetRoute";
import Secret from "../src/Secret";
import ErrorPage from "../src/Pages/ErrorPage";
import Order from "../src/Pages/Order";
import Alluser from "../src/Pages/Alluser";
import Monitoring from "../src/Pages/Monitoring";
import Profile from "../src/Profile";
import Purchase from "../src/Purchase";
import PurchesReporting from "../src/PurchesReporting";
import AllOrder from "../src/AllOrder";
import AllProducts from "../src/Pages/AllProducts";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement:<ErrorPage></ErrorPage>,
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
      loader: () => fetch('https://restupos-server.vercel.app/addFood')
    },
    {
      path: 'OpenPage/AddFood',
      element: <AddFood></AddFood>
    },
    {
      path: 'OpenPage/Monitoring',
      element: <Monitoring></Monitoring>
    },
    {
      path: 'OpenPage/Order',
      element:<Order></Order>,
      
    },
    {
      path: 'OpenPage/allOrder',
      element:<AllOrder></AllOrder>,
      
    },
    {
      path: 'OpenPage/Account',
      element:<Account></Account>,
    
    },
   {
     path: 'OpenPage/purches',
     element:<Purchase></Purchase>
   },
   {
     path: 'OpenPage/purchaseReport',
     element:<PurchesReporting></PurchesReporting>
   },
   {
    path: 'OpenPage/AllUser',
    element:<Alluser></Alluser>,
   },
   {
    path: 'OpenPage/profile',
    element:<Profile></Profile>,
   },
   {
    path: 'OpenPage/allProducts',
    element:<AllProducts></AllProducts>,
   },
   ]
   
  }
]);
export default router;
