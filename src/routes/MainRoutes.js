import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import AuthLogin from 'pages/authentication/auth-forms/AuthLogin';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - utilities
const AddFranchise = Loadable(lazy(() => import('pages/authentication/auth-forms/AuthRegister')));
const AddProduct = Loadable(lazy(() => import('pages/components-overview/ProductEntry')));
const Productreports = Loadable(lazy(() => import('pages/components-overview/ProductReports')));
const Salesreports = Loadable(lazy(() => import('pages/components-overview/SalesReports')));
const AddSales = Loadable(lazy(() => import('pages/components-overview/AddSales')));
const AddInventory = Loadable(lazy(() => import('pages/components-overview/AddInventory')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
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
      path: 'adduser',
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
      path: 'productreports',
      element: <Productreports />
    },
    {
      path: 'addsales',
      element: <AddSales />
    },
    {
      path: 'salesreports',
      element: <Salesreports />
    }
  ]
};

export default MainRoutes;
