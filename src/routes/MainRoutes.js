import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import AuthLogin from 'pages/authentication/auth-forms/AuthLogin';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - utilities
const AddFranchise = Loadable(lazy(() => import('pages/authentication/auth-forms/AddFranchise')));
const AddProduct = Loadable(lazy(() => import('pages/components-overview/AddProduct')));
const Productreport = Loadable(lazy(() => import('pages/components-overview/ProductReport')));
const Salesreport = Loadable(lazy(() => import('pages/components-overview/SalesReport')));
const Customer_report = Loadable(lazy(() => import('pages/components-overview/CustomerReport')));
const AddSales = Loadable(lazy(() => import('pages/components-overview/AddSales')));
const AddInventory = Loadable(lazy(() => import('pages/components-overview/AddInventory')));
const ChangePassword = Loadable(lazy(() => import('pages/authentication/auth-forms/ChangePassword')));
const Edit_Product = Loadable(lazy(() => import('pages/components-overview/EditProduct')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'changepassword',
      element: <ChangePassword />
    },
    {
      path: 'addfranchise',
      element: <AddFranchise />
    },
    {
      path: 'addproduct',
      element: <AddProduct />
    },
    {
      path: 'addinventory',
      element: <AddInventory />
    },
    {
      path: 'productreport',
      element: <Productreport />
    },
    {
      path: 'addsales',
      element: <AddSales />
    },
    {
      path: 'salesreport',
      element: <Salesreport />
    },
    {
      path: 'customer_report',
      element: <Customer_report />
    },
    {
      path: 'editproduct',
      element: <Edit_Product />
    }
  ]
};

export default MainRoutes;
