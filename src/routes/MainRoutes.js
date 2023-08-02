import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - utilities
const AddEmployee = Loadable(lazy(() => import('pages/components-overview/AddEmployee')));
const AddProduct = Loadable(lazy(() => import('pages/components-overview/AddProduct')));
const Productreports = Loadable(lazy(() => import('pages/components-overview/ProductReports')));
const Salesreports = Loadable(lazy(() => import('pages/components-overview/SalesReports')));
const AddSales = Loadable(lazy(() => import('pages/components-overview/AddSales')));


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
      path: 'adduser',
      element: <AddEmployee />
    },
    {
      path: 'addproduct',
      element: <AddProduct />
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
