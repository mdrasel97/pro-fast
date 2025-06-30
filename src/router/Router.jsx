import { createBrowserRouter } from "react-router";
import RootLayOut from "../rootLayOut/RootLayOut";
import Home from "../pages/home/Home";
import AuthLayOut from "../rootLayOut/AuthLayOut";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Coverage from "../pages/coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import AddParcel from "../pages/pricing/addParcel/AddParcel";
import DashboardLayOut from "../rootLayOut/DashboardLayOut";
import MyParcels from "../pages/dashboard/MyParcels";
import Payment from "../pages/dashboard/Payment";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import TrackParcel from "../pages/dashboard/TrackParcel";
import BeARider from "../pages/dashboard/BeARider";
import PendingRiders from "../pages/dashboard/PendingRiders";
import ActiveRiders from "../pages/dashboard/ActiveRiders";
import ManageAdmins from "../pages/dashboard/ManageAdmins";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("./serviceCenter.json"),
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
        loader: () => fetch("./serviceCenter.json"),
      },
      {
        path: "pricing",
        element: (
          <PrivateRoute>
            <AddParcel></AddParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("./serviceCenter.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayOut,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayOut></DashboardLayOut>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/myParcels",
        Component: MyParcels,
      },
      {
        path: "/dashboard/addParcel",
      },
      {
        path: "/dashboard/payment/:parcelId",
        Component: Payment,
      },
      {
        path: "/dashboard/paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "/dashboard/track",
        Component: TrackParcel,
      },
      {
        path: "/dashboard/pendingRiders",
        Component: PendingRiders,
      },
      {
        path: "/dashboard/activeRiders",
        Component: ActiveRiders,
      },
      {
        path: "/dashboard/manageAdmins",
        Component: ManageAdmins,
      },
    ],
  },
]);
