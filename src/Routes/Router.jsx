import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home/Home/Home";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/Meals/MealDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import MyProfile from "../pages/Dashboard/MyProfile";
import MyOrders from "../pages/Dashboard/MyOrders";
import MyReviews from "../pages/Dashboard/MyReviews";
import FavoriteMeals from "../pages/Dashboard/FavoriteMeals";
import CreateMeal from "../pages/Dashboard/Chef/CreateMeal";
import MyMeals from "../pages/Dashboard/Chef/MyMeals";
import OrderRequests from "../pages/Dashboard/Chef/OrderRequests";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageRequests from "../pages/Dashboard/Admin/ManageRequests";
import PlatformStatistics from "../pages/Dashboard/Admin/PlatformStatistics";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import UserDashboardLayout from "../Layout/UserDashboardLayout";
import OrderPage from "../pages/Order/OrderPage";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "meals", element: <Meals /> },
      { path: "meal/:id", element: <MealDetails /> },
      { path: "order/:id", element: <OrderPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },


   
      {
        path: "dashboard/*",
        element: (
          <PrivateRoute allowedRoles={["user","chef","admin"]}>
            <UserDashboardLayout />
          </PrivateRoute>
        ),
        children: [
         
          { path: "profile", element: <MyProfile /> },
          { path: "orders", element: <MyOrders /> },
          { path: "reviews", element: <MyReviews /> },
          { path: "favorites", element: <FavoriteMeals /> },
          { path: "payment-success", element: <PaymentSuccess /> },

        
          { path: "chef/my-profile", element: <MyProfile /> },
          { path: "chef/create-meal", element: <CreateMeal /> },
          { path: "chef/my-meals", element: <MyMeals /> },
          { path: "chef/order-requests", element: <OrderRequests /> },

        
          { path: "admin/profile", element: <AdminProfile /> },
          { path: "admin/manage-users", element: <ManageUsers /> },
          { path: "admin/manage-requests", element: <ManageRequests /> },
          { path: "admin/statistics", element: <PlatformStatistics /> },
        ],
      },
    ],
  },
]);
