import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import Login from 'pages/authentication/Login';

// render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - utilities
const Salesreport = Loadable(lazy(() => import('pages/components-overview/SalesReport')));
const Customer_report = Loadable(lazy(() => import('pages/components-overview/CustomerReport')));
const AddSales = Loadable(lazy(() => import('pages/components-overview/AddSales')));
const SalesDashboard = Loadable(lazy(() => import('pages/components-overview/Salesdashboard')));
const EditSales= Loadable(lazy(() => import('pages/components-overview/EditSales')));
const ChangePassword = Loadable(lazy(() => import('pages/authentication/auth-forms/ChangePassword')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Login />
    },
    {
      path: 'dashboard',
      element: <SalesDashboard />
    },
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <SalesDashboard />
    //     }
    //   ]
    // },
    {
      path: 'changepassword',
      element: <ChangePassword />
    },
    {
      path: 'sales',
      element: <SalesDashboard />
    },
    {
      path: 'addsales',
      element: <AddSales />
    },
    {
      path: 'editsales',
      element: <EditSales />
    },
    {
      path: 'salesreport',
      element: <Salesreport />
    },
    {
      path: 'customer_report',
      element: <Customer_report />
    },
  ]
};

export default MainRoutes;
