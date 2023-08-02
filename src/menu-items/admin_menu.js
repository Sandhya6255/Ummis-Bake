// assets
import {
    AntDesignOutlined,
    UserAddOutlined,
    BgColorsOutlined,
    AppstoreAddOutlined,
    LoadingOutlined
  } from '@ant-design/icons';
  
  // icons
  const icons = {
    BgColorsOutlined,
    UserAddOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
  };
  
  // ==============================|| MENU ITEMS - UTILITIES ||============================== //
  
  const admin_menu = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
      {
        id: 'add-product',
        title: 'Products',
        type: 'item',
        url: '/addproduct',
        icon: icons.AppstoreAddOutlined,
        breadcrumbs: false
      },
      {
        id: 'add-employee',
        title: 'Employees',
        type: 'item',
        url: '/adduser',
        icon: icons.UserAddOutlined,
        breadcrumbs: false
      },
      {
        id: 'product-reports',
        title: 'Product Report',
        type: 'item',
        url: '/productreports',
        icon: icons.AppstoreAddOutlined,
        breadcrumbs: false
      },
    ]
  };
  
  export default admin_menu;
  