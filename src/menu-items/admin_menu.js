// assets
import {
    AntDesignOutlined,
    UserAddOutlined,
    BgColorsOutlined,
    AppstoreAddOutlined,
    LoadingOutlined,
    StockOutlined
  } from '@ant-design/icons';
  
  // icons
  const icons = {
    BgColorsOutlined,
    UserAddOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    StockOutlined
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
        title: 'Franchise',
        type: 'item',
        url: '/addfranchise',
        icon: icons.UserAddOutlined,
        breadcrumbs: false
      },
      {
        id: 'add-inventory',
        title: 'Inventory',
        type: 'item',
        url: '/addinventory',
        icon: icons.StockOutlined,
        breadcrumbs: false
      }
    ]
  };
  
  export default admin_menu;
  