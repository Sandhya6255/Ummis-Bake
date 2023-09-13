import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import Login from 'pages/authentication/Login';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - utilities
const AddFranchise = Loadable(lazy(() => import('pages/authentication/auth-forms/AddFranchise')));
const AddProduct = Loadable(lazy(() => import('pages/components-overview/AddProduct')));
const Productreport = Loadable(lazy(() => import('pages/components-overview/ProductReport')));
const AddInventory = Loadable(lazy(() => import('pages/components-overview/AddInventory')));
const EditInventory = Loadable(lazy(() => import('pages/components-overview/EditInventory')));
const ChangePassword = Loadable(lazy(() => import('pages/authentication/auth-forms/ChangePassword')));
const Edit_Product = Loadable(lazy(() => import('pages/components-overview/EditProduct')));
const Edit_Franchise = Loadable(lazy(() => import('pages/authentication/auth-forms/EditFranchise')));


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
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      // children: [
      //   {
      //     path: 'default',
      //     element: <DashboardDefault />
      //   }
      // ]
      element: <DashboardDefault />
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
      path: 'editfranchise',
      element: <Edit_Franchise />
    },
    {
      path: 'addproduct',
      element: <AddProduct />
    },
    {
      path: 'editproduct',
      element: <Edit_Product />
    },
    {
      path: 'productreport',
      element: <Productreport />
    },
    {
      path: 'addinventory',
      element: <AddInventory />
    },
    {
      path: 'editinventory',
      element: <EditInventory />
    }
  ]
};

export default MainRoutes;
